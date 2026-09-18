"use client";

import dynamic from "next/dynamic";

const RegisterComponent = dynamic(
  () => import("@/components/authentication/register/register"),
  { 
    ssr: false,
    loading: () => <p>Loading dashboard...</p>
  }
);
export default function RegisterClient(){
    return(
        <><RegisterComponent/></>
    )
}