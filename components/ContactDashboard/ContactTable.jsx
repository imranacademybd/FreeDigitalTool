"use client";
import  { useState } from "react";
import { DataTable } from "../ReusableTable/data-table";
import { contactsColumns } from "../ReusableTable/ContactUs/contactUsColumn";
import { refreshContacts } from "../Refresh-Functions/contactRefreshFunction";
import { deleteContact } from "@/lib/actions/ContactUs/contactAction";
import { toast } from "sonner";


const ContactTable = ({contacts}) => {

  const [contactsData, setContactsData] = useState(contacts || []);
  return (
    <div className="md:col-span-2 space-y-6">
      <DataTable
        columns={contactsColumns}
        initialData={contactsData}
        filterInputPlaceholder={"name"}
        filterInputColumn={"name"}
        
       
        firstSearchInputPlaceholder={"Filter by name"}
        secondSearchInputPlaceholder={"or email..."}
       
        // filterSelectColumn={"category"}
        // filterSelectLabel="Filter by Category"
        // filterSelectPlaceholder="All categories"
        refreshDataInComponent={refreshContacts}
        meta={{
          entityType: "contacts",
          handleSingleDelete: async (id) => {
            // Implement single category delete
            const result = await deleteContact(id);
            if (result?.status === "SUCCESS") {
              setContactsData((prev) => prev.filter((contact) => contact._id !== id));
              await refreshContacts();
              toast.success(result.message);
            }
          },
        }}
      />
    </div>
  );
};

export default ContactTable;
