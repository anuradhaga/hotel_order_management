import { getPageMetadata } from "@/config/metadata";
import TableClient from "./tableClient";
// This runs on the server
export const generateMetadata = () => {
  return getPageMetadata("Table");
};

export default function Table() {
  return (
    <>
      <TableClient />
    </>
  );
}
