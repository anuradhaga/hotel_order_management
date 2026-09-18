"use client";

import dynamic from "next/dynamic";


const DeliverySettingsComponent = dynamic(
  () => import("@/components/pages/settings/deliverySettings/deliverySettings"),
  { 
    ssr: false,
    loading: () => <p>Loading Setting...</p>
  }
);

export default function DeliverySettingsClient(){
    return(
        <><DeliverySettingsComponent/></>
    )
}