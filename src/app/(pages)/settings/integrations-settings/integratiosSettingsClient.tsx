"use client";

import dynamic from "next/dynamic";


const IntegrationSettingsComponent = dynamic(
  () => import("@/components/pages/settings/integrationsSettings/integrationSettings"),
  { 
    ssr: false,
    loading: () => <p>Loading Setting...</p>
  }
);

export default function IntegratiosSettingsClient(){
    return(
        <><IntegrationSettingsComponent/></>
    )
}