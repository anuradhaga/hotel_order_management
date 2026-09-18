"use client";

import dynamic from "next/dynamic";


const UsersComponent = dynamic(
  () => import("@/components/pages/administration/users/users"),
  { 
    ssr: false,
    loading: () => <p>Loading users...</p>
  }
);

export default function UsersClient(){
    return(
        <><UsersComponent/></>
    )
}