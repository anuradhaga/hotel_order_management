"use client";

import dynamic from "next/dynamic";


const CouponsComponent = dynamic(
  () => import("@/components/pages/management/coupons/coupons"),
  { 
    ssr: false,
    loading: () => <p>Loading coupons...</p>
  }
);

export default function CouponsClient(){
    return(
        <><CouponsComponent/></>
    )
}