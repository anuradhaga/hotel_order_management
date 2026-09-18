


import { getPageMetadata } from "@/config/metadata";
import RolesPermissionsClient from "./rolePermissionsClient";

// This runs on the server
export const generateMetadata = () => {
  return getPageMetadata('role-permissions');
};

export default function Users(){
    return(
        <><RolesPermissionsClient/></>
    )
}