


import { getPageMetadata } from "@/config/metadata";
import UsersClient from "./usersClient";

// This runs on the server
export const generateMetadata = () => {
  return getPageMetadata('Users');
};

export default function Users(){
    return(
        <><UsersClient/></>
    )
}