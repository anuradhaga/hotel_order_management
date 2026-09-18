"use client";

import dynamic from "next/dynamic";


const PaymentsComponent = dynamic(
  () => import("@/components/pages/operations/payments/payments"),
  { 
    ssr: false,
    loading: () => <p>Loading Payments...</p>
  }
);

export default function PaymentsClient(){
    return(
        <><PaymentsComponent /></>
    )
}