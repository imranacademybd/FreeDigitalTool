"use client";

import { axiosClient } from "@/lib/apiClient";


export const refreshContacts = async () => {
    const res = await axiosClient.get("/api/admin/getContacts");
    const contacts = res?.data?.contacts || [];
  return contacts;
};
