"use client";

import dynamic from "next/dynamic";


const PrintSettingsComponents = dynamic(
  () => import("@/components/pages/settings/printSettings/printSettings"),
  { 
    ssr: false,
    loading: () => <p>Loading Setting...</p>
  }
);

export default function PrintSettingsClient(){
    return(
        <><PrintSettingsComponents/></>
    )
}