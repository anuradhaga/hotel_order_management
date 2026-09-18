"use client";
import dynamic from "next/dynamic";

const OrdersComponent = dynamic(
  () => import("@/components/pages/main-module/orders/orders"),
  { 
    ssr: false,
    loading: () => <p>Loading dashboard...</p>
  }
);
export default function OrdersClient(){
    return(
        <><OrdersComponent/></>
    )
}