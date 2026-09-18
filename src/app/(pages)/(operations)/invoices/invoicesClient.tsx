"use client";

import dynamic from "next/dynamic";


const InvoicesComponent = dynamic(
  () => import("@/components/pages/operations/invoices/invoices"),
  { 
    ssr: false,
    loading: () => <p>Loading invoices...</p>
  }
);

export default function InvoicesClient(){
    return(
        <><InvoicesComponent /></>
    )
}