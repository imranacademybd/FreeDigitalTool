"use client";

import { columns } from "@/components/ReusableTable/column";
import { DataTable } from "@/components/ReusableTable/data-table";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function HomePageToolsManagement() {
  const [homepageTools, setHomepageTools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/admin/tools")
      .then((res) => {
        const tools = res.data || [];
        setHomepageTools(tools.filter((t) => t.homepage));
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center">Loading…</div>;
  }
  if (!homepageTools.length) {
    return (
      <div className="flex justify-center items-center">
        No homepage tools found
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between my-10">
        <h2 className="text-2xl font-semibold">Manage Homepage Tools</h2>
        <Link href="/dashboard/tools/tools-categories">
          <Button>Create New Tools Category</Button>
        </Link>
      </div>
      <DataTable
        columns={columns}
        initialData={homepageTools}
        firstSearchInputPlaceholder="name"
        secondSearchInputPlaceholder="views"
        filterInputColumn="name"
      />
    </div>
  );
}
