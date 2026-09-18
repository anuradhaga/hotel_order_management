"use client";

import { useEffect, type ReactNode } from "react";

interface BodyBgWhiteProps {
  children: ReactNode;
}

export default function BodyBgWhite({ children }: BodyBgWhiteProps) {
  useEffect(() => {
    if (typeof document === "undefined" || !document.body) return;

    document.body.classList?.add("bg-white");

    return () => {
      if (typeof document !== "undefined" && document.body) {
        document.body.classList?.remove("bg-white");
      }
    };
  }, []);

  return <>{children}</>;
}


