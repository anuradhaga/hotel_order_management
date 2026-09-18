"use client";

import dynamic from "next/dynamic";


const TableComponent = dynamic(
  () => import("@/components/pages/operations/tables/table"),
  { 
    ssr: false,
    loading: () => <p>Loading table...</p>
  }
);

export default function TableClient(){
    return(
        <><TableComponent/></>
    )
}