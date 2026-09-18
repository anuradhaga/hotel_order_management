import { getPageMetadata } from "@/config/metadata";
import PosClient from "./posClient";
// This runs on the server
export const generateMetadata = () => {
  return getPageMetadata('Pos');
};
export default function Pos(){
    return(
        <><PosClient/></>
    )
}