import { getPageMetadata } from "@/config/metadata";
import CustomerClient from "./customerClient";
// This runs on the server
export const generateMetadata = () => {
  return getPageMetadata("Customer");
};

export default function Customer() {
  return (
    <>
      <CustomerClient />
    </>
  );
}
