"use client";
import dynamic from "next/dynamic";

const EmailVerificationComponent = dynamic(
  () => import("@/components/authentication/email-verification/emailVerification"),
  { 
    ssr: false,
    loading: () => <p>Loading dashboard...</p>
  }
);
export default function EmailVerificationClient(){
    return(
        <><EmailVerificationComponent/></>
    )
}