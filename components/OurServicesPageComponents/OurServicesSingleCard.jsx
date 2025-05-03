import React from "react";

const OurServicesSingleCard = ({ service }) => {
    const { icon, title, description, className } = service;
  return (
    <div
      className={` ${className} h-52 w-full xl:max-w-[440px] flex flex-col justify-center items-center gap-y-6 p-4 shadow-2xl hover:shadow-lg transition-shadow duration-300`}
    >
      <i className="text-4xl font-bold"> {icon ?? null} </i>
      <h1 className="text-4xl font-bold">{title}</h1>
      <p className="text-seo-des-color-first">{description}</p>
    </div>
  );
};

export default OurServicesSingleCard;
