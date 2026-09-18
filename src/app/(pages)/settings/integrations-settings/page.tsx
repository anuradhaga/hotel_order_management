import { getPageMetadata } from "@/config/metadata";
import IntegratiosSettingsClient from "./integratiosSettingsClient";

// This runs on the server
export const generateMetadata = () => {
  return getPageMetadata("Integrations Settings");
};

export default function IntegrationsSettings() {
  return (
    <>
      <IntegratiosSettingsClient />
    </>
  );
}
