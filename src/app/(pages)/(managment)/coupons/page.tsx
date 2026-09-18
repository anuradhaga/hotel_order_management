import { getPageMetadata } from "@/config/metadata";
import CouponsClient from "./couponsClient";
// This runs on the server
export const generateMetadata = () => {
  return getPageMetadata("Coupons");
};

export default function Coupons() {
  return (
    <>
      <CouponsClient />
    </>
  );
}
