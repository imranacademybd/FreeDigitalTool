export const dynamic = "force-dynamic";
import AdDataTable from "@/components/AdvertisementsForms/adDataTable/adDataTable";
import { refreshAds } from "@/components/Refresh-Functions/advertisementsRefreshFunction";
import { adColumns } from "@/components/ReusableTable/AdvertisementColumn/AdColumn";

import { DataTable } from "@/components/ReusableTable/data-table";
import { Button } from "@/components/ui/button";
import { payments } from "@/data/payments";
import { deleteAdvertisement } from "@/lib/actions/advertisements/adDelete";
import { axiosClient } from "@/lib/apiClient";

import Link from "next/link";
import React from "react";
import { toast } from "sonner";

const ManageAdvertisements = async () => {
  const res = await axiosClient.get("/api/admin/advertisements");
  const allAd = res?.data;

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between my-10">
        <h2 className="text-2xl font-semibold">Manage All Advertisements</h2>
        <Link href={"/dashboard/advertisements/create-advertisement"}>
          <Button className="/dashboard/advertisements/create-advertisement">
            Create New Advertise
          </Button>
        </Link>
      </div>
      <AdDataTable allAd={allAd} />
    </div>
  );
};

export default ManageAdvertisements;
