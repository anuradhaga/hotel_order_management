import { getPageMetadata } from "@/config/metadata";
import TaxSettingsClient from "./DeliverySettingsClient";
// This runs on the server
export const generateMetadata = () => {
  return getPageMetadata("Delivery Settings");
};

export default function TaxSettings() {
  return (
    <>
      <TaxSettingsClient />
    </>
  );
}
