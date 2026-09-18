"use client";
import dynamic from "next/dynamic";
const ForgotPasswordComponent = dynamic(
  () => import("@/components/authentication/forgot-password/forgotPassword"),
  { 
    ssr: false,
    loading: () => <p>Loading dashboard...</p>
  }
);
export default function ForgotPasswordClient(){
    return(
        <><ForgotPasswordComponent/></>
    )
}