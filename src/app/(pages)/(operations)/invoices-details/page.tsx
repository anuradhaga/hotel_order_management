import { getPageMetadata } from "@/config/metadata";
import InvoicesDetailsClient from "./invoicesDetailsClient";

// This runs on the server
export const generateMetadata = () => {
  return getPageMetadata('Invoices Details');
};
export default function InvoicesDetails(){
    return(
        <><InvoicesDetailsClient/></>
    )
}