import { getPageMetadata } from "@/config/metadata";
import ItemsClient from "./itemsClient";
import { getItemsServerData } from "@/lib/items";

export const generateMetadata = () => {
  return getPageMetadata("Items");
};

// Force dynamic so SSR always fetches fresh database records
export const dynamic = "force-dynamic";

interface ItemsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Items({ searchParams }: ItemsPageProps) {
  const resolvedSearchParams = (await searchParams) || {};
  const page = Math.max(1, Number(resolvedSearchParams.page) || 1);
  const pageSize = Math.max(1, Number(resolvedSearchParams.pageSize) || 20);
  const search =
    typeof resolvedSearchParams.search === "string"
      ? resolvedSearchParams.search
      : undefined;
  const category_id =
    typeof resolvedSearchParams.category_id === "string"
      ? resolvedSearchParams.category_id
      : undefined;
  const status =
    typeof resolvedSearchParams.status === "string"
      ? resolvedSearchParams.status
      : undefined;
  const is_vegetarian =
    typeof resolvedSearchParams.is_vegetarian === "string"
      ? resolvedSearchParams.is_vegetarian
      : undefined;
  const sortBy =
    typeof resolvedSearchParams.sortBy === "string"
      ? resolvedSearchParams.sortBy
      : "id_asc";

  let initialData: any = {
    items: [],
    categories: [],
    totalCount: 0,
    totalPages: 1,
    page,
    pageSize,
  };

  try {
    initialData = await getItemsServerData({
      page,
      pageSize,
      search,
      category_id,
      status,
      is_vegetarian,
      sortBy,
    });
  } catch (error) {
    console.error("Error loading items on server:", error);
  }

  return (
    <>
      <ItemsClient initialData={initialData} />
    </>
  );
}
