"use client";

import dynamic from "next/dynamic";


const RolesPermissionsComponent = dynamic(
  () => import("@/components/pages/administration/permissions/rolePermissions"),
  { 
    ssr: false,
    loading: () => <p>Loading users...</p>
  }
);

export default function RolesPermissionsClient(){
    return(
        <><RolesPermissionsComponent/></>
    )
}