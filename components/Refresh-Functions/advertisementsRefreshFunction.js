"use client";

import { axiosClient } from "@/lib/apiClient";

export const refreshAds = async () => {
  const res = await axiosClient.get("/api/admin/advertisements");
  const allAd = res?.data || [];
  return allAd;
};
