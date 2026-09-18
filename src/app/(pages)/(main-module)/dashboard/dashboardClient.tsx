"use client";
import dynamic from "next/dynamic";


const DashboardComponent = dynamic(
  () => import("@/components/pages/main-module/dashboard/dashboard"),
  { 
    ssr: false,
    loading: () => <p>Loading dashboard...</p>
  }
);

export default function DashboardClient(){
    return(
        <><DashboardComponent/></>
    )
}