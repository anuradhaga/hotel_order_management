"use client";
import dynamic from "next/dynamic";
const ResetPasswordComponent = dynamic(
  () => import("@/components/authentication/reset-password/resetPassword"),
  { 
    ssr: false,
    loading: () => <p>Loading dashboard...</p>
  }
);
export default function ResetPasswordClient(){
    return(
        <><ResetPasswordComponent/></>
    )
}