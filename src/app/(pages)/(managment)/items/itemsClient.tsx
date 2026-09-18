"use client";

import dynamic from "next/dynamic";


const ItemsComponent = dynamic(
  () => import("@/components/pages/management/items/items"),
  { 
    ssr: false,
    loading: () => <p>Loading items...</p>
  }
);

export default function ItemsClient(){
    return(
        <><ItemsComponent/></>
    )
}