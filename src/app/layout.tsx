import type { Metadata } from "next";
import BootstrapJs from "@/core/common/bootstrap-js/bootstrapjs";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "@/style/icon/lucide/lucide.css";
import "../app/globals.scss";
import { ReduxProvider } from "@/redux/providers";
import { AuthProvider } from "@/components/authentication/auth-context/authContext";

export const metadata: Metadata = {
  title: "Dashboard | POS Food - Bootstrap 5 Admin Dashboard",
  description:
    "Dreams POS is a powerful Bootstrap based Inventory Management Admin Template designed for businesses, offering seamless invoicing, project tracking, and estimates.",
  keywords:
    "inventory management, admin dashboard, bootstrap template, invoicing, estimates, business management, responsive admin, POS system",
  authors: [{ name: "Dreams Technologies" }],
  icons: {
    icon: "favicon.png",
    apple: "apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ReduxProvider>
          <AuthProvider>{children}</AuthProvider>
        </ReduxProvider>
        <BootstrapJs />
      </body>
    </html>
  );
}
