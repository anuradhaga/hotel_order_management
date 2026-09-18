"use client";

import dynamic from "next/dynamic";


const EarningReportComponent = dynamic(
  () => import("@/components/pages/administration/reports/earningReport/earningReport"),
  { 
    ssr: false,
    loading: () => <p>Loading Report...</p>
  }
);

export default function EarningReportClient(){
    return(
        <><EarningReportComponent/></>
    )
}