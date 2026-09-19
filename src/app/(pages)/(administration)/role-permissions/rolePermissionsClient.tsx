"use client";

import dynamic from "next/dynamic";


const RolesPermissionsComponent = dynamic(
  () => import("@/components/pages/administration/permissions/rolePermissions"),
  { 
    ssr: false,
    loading: () => <p className="p-4 text-muted">Loading permissions...</p>
  }
);

export default function RolesPermissionsClient(){
    return(
        <><RolesPermissionsComponent/></>
    )
}