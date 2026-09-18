import type { ReactNode } from "react";
import BodyBgWhite from "@/components/common/body-bg-white";

export default function AuthenticationLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <BodyBgWhite>{children}</BodyBgWhite>;
}


