import { getPageMetadata } from "@/config/metadata";
import KitchenClient from "./kitchenClient";
// This runs on the server
export const generateMetadata = () => {
  return getPageMetadata('Kitchen');
};
export default function Kitchen(){
    return(
        <><KitchenClient/></>
    )
}