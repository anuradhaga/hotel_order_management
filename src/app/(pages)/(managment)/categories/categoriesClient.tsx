"use client";

import dynamic from "next/dynamic";


const CategoriesComponent = dynamic(
  () => import("@/components/pages/management/categories/categories"),
  { 
    ssr: false,
    loading: () => <p>Loading categories...</p>
  }
);

export default function CategoriesClient(){
    return(
        <><CategoriesComponent/></>
    )
}