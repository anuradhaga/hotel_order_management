import { getPageMetadata } from "@/config/metadata";
import ReservationsClient from "./reservationsClient";
// This runs on the server
export const generateMetadata = () => {
  return getPageMetadata('Reservations');
};
export default function Reservations(){
    return(
        <><ReservationsClient/></>
    )
}