import { getPageMetadata } from "@/config/metadata";
import TaxSettingsClient from "./paymentSettingsClient";
// This runs on the server
export const generateMetadata = () => {
  return getPageMetadata("Payment Settings");
};

export default function TaxSettings() {
  return (
    <>
      <TaxSettingsClient />
    </>
  );
}
