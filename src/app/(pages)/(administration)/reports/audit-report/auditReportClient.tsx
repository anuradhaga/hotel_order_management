"use client";


import dynamic from "next/dynamic";


const AuditReportComponent = dynamic(
  () => import("@/components/pages/administration/reports/auditReport/auditReport"),
  { 
    ssr: false,
    loading: () => <p>Loading Report...</p>
  }
);

export default function AuditReportClient(){
    return(
        <><AuditReportComponent/></>
    )
}