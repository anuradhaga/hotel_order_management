"use client";

import dynamic from "next/dynamic";


const NotificationsSettingsComponent = dynamic(
  () => import("@/components/pages/settings/notificationsSettings/notificationsSettings"),
  { 
    ssr: false,
    loading: () => <p>Loading Setting...</p>
  }
);

export default function NotificationsSettingsClient(){
    return(
        <><NotificationsSettingsComponent/></>
    )
}