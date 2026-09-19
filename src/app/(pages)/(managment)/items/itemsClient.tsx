"use client";

import ItemsComponent from "@/components/pages/management/items/items";

interface ItemsClientProps {
  initialData?: {
    items: any[];
    categories: any[];
    totalCount: number;
    totalPages: number;
    page: number;
    pageSize: number;
  };
}

export default function ItemsClient({ initialData }: ItemsClientProps) {
  return (
    <>
      <ItemsComponent initialData={initialData} />
    </>
  );
}