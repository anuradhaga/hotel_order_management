"use client";

import dynamic from "next/dynamic";


const PaymentSettingsComponents = dynamic(
  () => import("@/components/pages/settings/paymentSettings/paymentSettings"),
  { 
    ssr: false,
    loading: () => <p>Loading Setting...</p>
  }
);

export default function PaymentSettingsClient(){
    return(
        <><PaymentSettingsComponents/></>
    )
}