"use client";


import dynamic from "next/dynamic";


const SalesReportComponent = dynamic(
  () => import("@/components/pages/administration/reports/salesReport/salesReport"),
  { 
    ssr: false,
    loading: () => <p>Loading Report...</p>
  }
);

export default function SalesReportClient(){
    return(
        <><SalesReportComponent/></>
    )
}