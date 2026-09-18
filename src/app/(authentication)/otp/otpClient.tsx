"use client";
import dynamic from "next/dynamic";
const OTPComponent = dynamic(
  () => import("@/components/authentication/otp/otp"),
  { 
    ssr: false,
    loading: () => <p>Loading dashboard...</p>
  }
);
export default function OtpClient(){
    return(
        <><OTPComponent/></>
    )
}