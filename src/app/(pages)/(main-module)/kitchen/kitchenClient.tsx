"use client";
import dynamic from "next/dynamic";
const KitchenComponent = dynamic(
  () => import("@/components/pages/main-module/kitchen/gdhKitchen"),
  { 
    ssr: false,
    loading: () => <div className="p-5 text-center text-white bg-dark">Loading Kitchen Display System...</div>
  }
);
export default function KitchenClient() {
  return (
    <>
      <KitchenComponent />
    </>
  );
}
