"use client";

import dynamic from "next/dynamic";


const CustomerComponent = dynamic(
  () => import("@/components/pages/operations/customers/customer"),
  { 
    ssr: false,
    loading: () => <p>Loading customer...</p>
  }
);

export default function CustomerClient(){
    return(
        <><CustomerComponent/></>
    )
}