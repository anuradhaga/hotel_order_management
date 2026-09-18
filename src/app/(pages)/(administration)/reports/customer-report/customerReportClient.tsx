"use client";


import dynamic from "next/dynamic";


const CustomerReportComponent = dynamic(
  () => import("@/components/pages/administration/reports/customerReport/customerReport"),
  { 
    ssr: false,
    loading: () => <p>Loading Report...</p>
  }
);

export default function CustomerReportClient(){
    return(
        <><CustomerReportComponent/></>
    )
}