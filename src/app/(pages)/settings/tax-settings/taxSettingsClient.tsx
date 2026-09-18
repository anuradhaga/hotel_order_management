"use client";

import dynamic from "next/dynamic";


const TaxSettingsComponents = dynamic(
  () => import("@/components/pages/settings/taxSettings/taxSetting"),
  { 
    ssr: false,
    loading: () => <p>Loading Setting...</p>
  }
);

export default function TaxSettingsClient(){
    return(
        <><TaxSettingsComponents/></>
    )
}