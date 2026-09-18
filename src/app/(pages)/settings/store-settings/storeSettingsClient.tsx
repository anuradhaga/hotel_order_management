"use client";

import dynamic from "next/dynamic";


const StoreSettingsComponents = dynamic(
  () => import("@/components/pages/settings/storeSettings/storeSettings"),
  { 
    ssr: false,
    loading: () => <p>Loading Setting...</p>
  }
);

export default function StoreSettingsClient(){
    return(
        <><StoreSettingsComponents/></>
    )
}