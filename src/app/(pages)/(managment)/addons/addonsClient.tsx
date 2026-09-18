"use client";

import dynamic from "next/dynamic";


const AddonsComponent = dynamic(
  () => import("@/components/pages/management/addons/addons"),
  { 
    ssr: false,
    loading: () => <p>Loading addons...</p>
  }
);

export default function AddonsClient(){
    return(
        <><AddonsComponent /></>
    )
}