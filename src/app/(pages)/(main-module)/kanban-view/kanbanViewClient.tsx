"use client";

import dynamic from "next/dynamic";

const KanbanViewComponent = dynamic(
  () => import("@/components/pages/main-module/orders/kanbanView"),
  { 
    ssr: false,
    loading: () => <p>Loading dashboard...</p>
  }
);
export default function KanbanViewClient(){
    return(
        <><KanbanViewComponent/></>
    )
}