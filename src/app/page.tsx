import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getDashboardForRole } from "@/utils/roleRoutes";

export default async function RootPage() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("gdh_user")?.value;

  let user: any = null;
  if (userCookie) {
    try {
      user = JSON.parse(decodeURIComponent(userCookie));
    } catch {
      try {
        user = JSON.parse(userCookie);
      } catch {
        user = null;
      }
    }
  }

  if (user && (user.user_id || user.username)) {
    const destination = getDashboardForRole(user.role_code);
    redirect(destination);
  } else {
    redirect("/login");
  }
}
