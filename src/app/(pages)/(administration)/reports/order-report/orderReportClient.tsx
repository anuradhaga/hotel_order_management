"use client";


import dynamic from "next/dynamic";


const OrderReportComponent = dynamic(
  () => import("@/components/pages/administration/reports/orderReport/orderReport"),
  { 
    ssr: false,
    loading: () => <p>Loading Report...</p>
  }
);

export default function OrderReportClient(){
    return(
        <><OrderReportComponent/></>
    )
}