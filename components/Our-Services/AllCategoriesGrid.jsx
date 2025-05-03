import Link from "next/link";
import React from "react";
import { FaTemperatureHigh } from "react-icons/fa";
import { Button } from "../ui/button";

const AllCategoriesGrid = ({ categories }) => {
  return (
    <section className="container mx-auto px-4 py-12 space-y-16 font-roboto my-10">
      {categories.map((category) => (
        <div
          key={category.slug}
          className="mb-12 border shadow-md rounded-lg p-6 bg-white "
        >
          <div className="flex justify-center items-center mb-10">
            <Link href={`/categories/${category.slug}`}>
              <h2 className="text-4xl font-bold font-inter text-center text-seo-first-color underline decoration-seo-light-green ">
                {category.name}
              </h2>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {category.tools.slice(0, 12).map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="bg-white p-4 rounded-lg  shadow-[0_2px_10px_rgba(0,0,0,0.3)] border hover:shadow-[0_1px_10px_rgba(0,0,0,0.6)] transition-all duration-300 ease-in-out"
              >
                <div className="font-medium text-seo-forth-color flex justify-center items-center gap-10 py-4">
                  {" "}
                  <span className="">
                    {" "}
                    <FaTemperatureHigh />{" "}
                  </span>{" "}
                  {tool.name}
                </div>
              </Link>
            ))}
          </div>
          {category.tools.length > 12 && (
            <div className="flex justify-center items-center mt-4">
              <Link href={`/categories/${category.slug}`} className=" ">
                <Button className="text-seo-forth-color text-lg bg-white shadow-lg py-5 hover:bg-seo-light-green hover:text-white  flex justify-center items-center ">
                  See All Tools in {category.name}
                </Button>
              </Link>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default AllCategoriesGrid;
