
"use client";

import dynamic from "next/dynamic";

const LoginComponent = dynamic(
  () => import("@/components/authentication/login/login"),
  { 
    ssr: false,
    loading: () => <p>Loading login form...</p>
  }
);

export default function LoginClient() {
  return <LoginComponent />;
}