import React from "react";

const OurServicesStatsCards = ({ stats }) => {
  const { icon, title, value, className } = stats;
  console.log(stats);
  
  return (
    <div
      className={` ${className} h-52 w-full xl:max-w-[440px] flex flex-col justify-center items-center gap-y-6 p-4 shadow-2xl hover:shadow-lg transition-shadow duration-300`}
      
    >
      <i className="text-4xl font-bold"> {icon ?? null} </i>
      <h1 className="text-4xl font-bold">{value}</h1>
      <p className="text-seo-des-color-first">{title}</p>
    </div>
  );
};

export default OurServicesStatsCards;
