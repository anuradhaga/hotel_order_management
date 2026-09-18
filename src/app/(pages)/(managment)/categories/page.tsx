import { getPageMetadata } from "@/config/metadata";
import CategoriesClient from "./categoriesClient";
// This runs on the server
export const generateMetadata = () => {
  return getPageMetadata("Categories");
};

export default function Categories() {
  return (
    <>
      <CategoriesClient />
    </>
  );
}
