


import { getPageMetadata } from "@/config/metadata";
import AuditReportClient from "./auditReportClient";

// This runs on the server
export const generateMetadata = () => {
  return getPageMetadata('Audit Report');
};

export default function SalesReport(){
    return(
        <><AuditReportClient/></>
    )
}