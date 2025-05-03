"use client";

import { refreshAds } from "@/components/Refresh-Functions/advertisementsRefreshFunction";
import { adColumns } from "@/components/ReusableTable/AdvertisementColumn/AdColumn";
import { DataTable } from "@/components/ReusableTable/data-table";
import { deleteAdvertisement } from "@/lib/actions/advertisements/adDelete";
import { useState } from "react";
import { toast } from "sonner";


const AdDataTable = ({allAd}) => {
    const [adData, setAdData] = useState(allAd || []);
  return (
    <DataTable
      columns={adColumns}
      initialData={adData}
      filterInputPlaceholder={"Search Pages by Title"}
      filterInputColumn={"title"}
      firstSearchInputPlaceholder={"name"}
      secondSearchInputPlaceholder={"title"}
      thirdSearchInputPlaceholder={"and types"}
      filterSelectColumn={"type"}
      refreshDataInComponent={refreshAds}
      meta={{
        entityType: "advertisement",
        handleSingleDelete: async (id) => {
          const result = await deleteAdvertisement(id);
          if (result.status === "SUCCESS") {
            setAdData((prev) => prev.filter((ad) => ad._id !== id));
            refreshAds();
            toast.success(result.message);
          }
        },
      }}
    />
  );
}

export default AdDataTable
