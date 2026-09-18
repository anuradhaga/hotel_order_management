"use client";

import dynamic from "next/dynamic";

const ReservationsComponent = dynamic(
  () => import("@/components/pages/main-module/reservations/reservations"),
  { 
    ssr: false,
    loading: () => <p>Loading dashboard...</p>
  }
);
export default function ReservationsClient(){
    return(
        <><ReservationsComponent/></>
    )
}