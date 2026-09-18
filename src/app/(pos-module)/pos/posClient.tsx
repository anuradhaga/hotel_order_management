"use client";

import dynamic from "next/dynamic";

const PosComponent = dynamic(
  () => import("@/components/pages/main-module/pos/gdhPos"),
  { 
    ssr: false,
    loading: () => <div className="p-5 text-center">Loading Grand Dilara POS...</div>
  }
);
export default function PosClient(){
    return(
        <><PosComponent/></>
    )
}