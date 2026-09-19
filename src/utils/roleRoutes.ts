export const PUBLIC_ROUTES = [
  "/login",
  "/register",
  "/forgot-password",
  "/reset-password",
  "/otp",
  "/email-verification",
];

export const PUBLIC_ROUTE_PREFIXES = [
  "/track", // Guest live order tracking (e.g. /track/[token])
  "/api/auth",
  "/api/tracking",
];

/**
 * Returns the primary dashboard / workspace URL corresponding to a staff user's role.
 *
 * Mappings:
 * - ADMIN, OWNER, MANAGER, SUPERVISOR, SYSTEM OPERATOR -> /dashboard
 * - WAITER, STEWARD -> /pos
 * - CASHIER -> /pos
 * - CHEF, KITCHEN -> /kitchen
 * - EXPEDITER -> /kitchen
 * - ACCOUNTANT -> /invoices
 * - Default -> /dashboard
 */
export function getDashboardForRole(roleCode?: string | null): string {
  if (!roleCode) return "/dashboard";

  const normalized = roleCode.trim().toUpperCase();

  switch (normalized) {
    case "CHEF":
    case "KITCHEN":
      return "/kitchen";

    case "WAITER":
    case "STEWARD":
      return "/pos";

    case "CASHIER":
      return "/pos";

    case "EXPEDITER":
      return "/kitchen";

    case "ACCOUNTANT":
      return "/invoices";

    case "ADMIN":
    case "OWNER":
    case "MANAGER":
    case "SUPERVISOR":
    case "SYSTEM OPERATOR":
    default:
      return "/dashboard";
  }
}

/**
 * Checks whether a given pathname matches any public route or prefix.
 */
export function isPublicPath(pathname: string): boolean {
  if (PUBLIC_ROUTES.includes(pathname)) {
    return true;
  }
  return PUBLIC_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}
