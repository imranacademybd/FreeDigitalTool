"use client";
import axios from "axios";

export const refreshPlans = async () => {
  const res = await axios("http://localhost:3000/api/plans");
  const ad = res?.data || [];
  return ad;
};
