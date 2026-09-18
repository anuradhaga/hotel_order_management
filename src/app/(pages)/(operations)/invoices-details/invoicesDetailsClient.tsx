"use client";

import dynamic from "next/dynamic";

const InvoiceDetailsComponent = dynamic(
  () => import("@/components/pages/operations/invoices/invoiceDetails"),
  { 
    ssr: false,
    loading: () => <p>Loading dashboard...</p>
  }
);
export default function InvoicesDetailsClient(){
return(
    <><InvoiceDetailsComponent/></>
)
}