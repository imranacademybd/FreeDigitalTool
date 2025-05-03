export const dynamic = "force-dynamic";
import ContactTable from "@/components/ContactDashboard/ContactTable";
import { axiosClient } from "@/lib/apiClient";


import React from "react";

const ManageAllContactPage = async () => {
  const res = await axiosClient.get("/api/admin/getContacts");
  const contacts = res?.data?.contacts || [];

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between my-10">
        <h2 className="text-2xl font-semibold">Manage All Contact</h2>
      </div>
      <ContactTable contacts={contacts} />
    </div>
  );
};

export default ManageAllContactPage;
