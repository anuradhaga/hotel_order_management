import { getPageMetadata } from "@/config/metadata";
import ItemsClient from "./itemsClient";
// This runs on the server
export const generateMetadata = () => {
  return getPageMetadata("Items");
};

export default function Items() {
  return (
    <>
      <ItemsClient />
    </>
  );
}
