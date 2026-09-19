"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { getDashboardForRole, isPublicPath } from "@/utils/roleRoutes";

/* =======================
   Types
======================= */
export interface User {
  user_id?: number;
  username?: string;
  full_name?: string;
  role_code?: string;
  outlet_id?: number;
  outlet_name?: string;
  phone?: string;
  email?: string;
  password?: string;
}

interface AuthContextType {
  user: User | null;
  isInitialized: boolean;
  login: (identifier: string, password: string) => Promise<{ ok: boolean; msg?: string; user?: User }>;
  register: (email: string, password: string) => { ok: boolean };
  logout: () => void;
}

/* =======================
   Context
======================= */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/* =======================
   Provider
======================= */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  /* =======================
     Load user on mount (Client only)
  ======================= */
  useEffect(() => {
    let loadedUser: User | null = null;
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      try {
        loadedUser = JSON.parse(storedUser);
      } catch (e) {
        console.error("Failed to parse stored auth user:", e);
      }
    }

    // Fallback check: read from cookie if localStorage is empty
    if (!loadedUser && typeof document !== "undefined") {
      const match = document.cookie.match(new RegExp("(^| )gdh_user=([^;]+)"));
      if (match && match[2]) {
        try {
          loadedUser = JSON.parse(decodeURIComponent(match[2]));
          if (loadedUser) {
            localStorage.setItem("authUser", JSON.stringify(loadedUser));
          }
        } catch (e) {
          console.error("Failed to parse user cookie:", e);
        }
      }
    }

    if (loadedUser) {
      setUser(loadedUser);
    }
    setIsInitialized(true);
  }, []);

  /* =======================
     Client-side Route Guard
  ======================= */
  useEffect(() => {
    if (!isInitialized || !pathname) return;

    const isPublic = isPublicPath(pathname);

    // Unauthenticated trying to access protected route
    if (!user && !isPublic) {
      const redirectUrl = `/login?redirect=${encodeURIComponent(pathname)}`;
      router.replace(redirectUrl);
    }

    // Authenticated trying to access login page
    if (user && pathname === "/login") {
      const dest = getDashboardForRole(user.role_code);
      router.replace(dest);
    }
  }, [isInitialized, user, pathname, router]);

  /* =======================
     Login via MySQL Database
  ======================= */
  const login = async (identifier: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: identifier.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (!data.success) {
        return { ok: false, msg: data.error || "Invalid credentials." };
      }

      const loggedUser: User = {
        ...data.user,
        email: data.user.email || `${data.user.username}@hoteldilara.com`,
      };

      setUser(loggedUser);
      localStorage.setItem("authUser", JSON.stringify(loggedUser));

      // Client-side cookie sync
      document.cookie = `gdh_user=${encodeURIComponent(
        JSON.stringify(loggedUser)
      )}; path=/; max-age=604800; SameSite=Lax`;

      return { ok: true, user: loggedUser, msg: data.message };
    } catch (err: any) {
      console.error("Login request failed:", err);
      return {
        ok: false,
        msg: "Connection error. Please check your network or server status.",
      };
    }
  };

  /* =======================
     Register
  ======================= */
  const register = (email: string, password: string) => {
    const newUser: User = { email, password };
    localStorage.setItem("authUserDB", JSON.stringify(newUser));
    return { ok: true };
  };

  /* =======================
     Logout
  ======================= */
  const logout = () => {
    setUser(null);
    localStorage.removeItem("authUser");
    document.cookie = "gdh_user=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax;";
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isInitialized,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* =======================
   Hook
======================= */
function assertContext(ctx: AuthContextType | undefined): asserts ctx is AuthContextType {
  if (ctx === undefined) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
}

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  assertContext(ctx);
  return ctx;
};
