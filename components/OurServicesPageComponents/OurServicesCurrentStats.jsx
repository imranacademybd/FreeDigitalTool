import { Activity, Briefcase, UsersRound } from "lucide-react";
import React from "react";
import { FaUsers } from "react-icons/fa";
import { PiCursorFill } from "react-icons/pi";
import OurServicesStatsCards from "./OurServicesStatsCards";

const OurServicesCurrentStats = () => {
  const statCards = [
    {
      icon: <Briefcase />,
      title: "Free Online Tools",
      value: "200+",
      className: "md:col-span-2",
    },
    {
      icon: <Activity />,
      title: "Times Tool Used",
      value: "9.0M+",
      className: "md:col-span-2",
    },
    {
      icon: <FaUsers />,
      title: "Daily Users",
      value: "15K+",
      className: "md:col-span-2",
    },
    {
      icon: <UsersRound />,
      title: "Page View/Month",
      value: "1M+",
      className: "md:col-span-3 justify-self-center align-self-center",
    },
    {
      icon: <PiCursorFill />,
      title: "Search Clicks/Month",
      value: "400K+",
      className: "md:col-span-3 justify-self-center align-self-center",
    },
  ];
  return (
    <div className="p-4 border border-black grid grid-cols-1  md:grid-cols-6 gap-6 justify-center justify-items-center  items-center">
      {statCards.map((statCard, index) => (
        <OurServicesStatsCards key={index} stats={statCard} />
      ))}
    </div>
  );
};

export default OurServicesCurrentStats;
