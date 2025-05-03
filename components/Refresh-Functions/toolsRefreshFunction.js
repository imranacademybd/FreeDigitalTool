"use client";
import axios from "axios";

export const refreshDataTools = async () => {
    const res = await axios("http://localhost:3000/api/admin/tools");
    const tools = res?.data || []
    return tools;
  };