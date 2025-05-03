import React from "react";
import OurServicesCurrentStats from "./OurServicesCurrentStats";
import OurServicesCards from "./OurServicesCards";
import { ChevronDown } from "lucide-react";
import { FaDiscord, FaFacebook, FaInstagram, FaLinkedin, FaPinterest, FaTelegram } from "react-icons/fa";
import Link from "next/link";

const OurServicesPage = () => {
  const socialLinks = [
    {
      icon: <FaFacebook />,
      link: "https://google.com",
    },
    {
      icon: <FaInstagram />,
      link: "https://google.com",
    },
    {
      icon: <FaPinterest />,
      link: "https://google.com",
    },
    {
      icon: <FaLinkedin />,
      link: "https://google.com",
    },
    {
      icon: <FaDiscord />,
      link: "https://google.com",
    },

    {
      icon: <FaTelegram />,
      link: "https://google.com",
    },
    {
      icon: <FaFacebook />,
      link: "https://google.com",
    },
  ]
  return (
    <section className="p-4 my-10 container mx-auto min-h-screen space-y-6">
      <h1 className="w-full text-center text-4xl font-bold my-10 ">
        {" "}
        Free Digital Tools{" "}
      </h1>
      <h1 className="text-4xl font-bold xl:ml-5 my-5">
        Free Digital Tools Current Stats:
      </h1>
      <OurServicesCurrentStats />
      <div className="px-5 text-xl my-10">
        <div className="bg-seo-des-color-first flex justify-center items-center p-4 text-white">
          <p className="py-3">
            Here’s Free Digital Tools services. A list of services our expert
            team can do for you quickly and accurately at a low price.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-x-4 justify-center items-center px-5">
        <div className="w-full h-1 bg-seo-des-color-first" />
        <h1 className="text-4xl font-bold text-center flex-1/2">
          Free Digital <br /> Tools
        </h1>
        <div className="w-full h-1 bg-seo-des-color-first" />
      </div>

      {/* services cards */}
      <OurServicesCards />

      <div className="flex flex-col md:flex-row gap-x-4 justify-center items-center px-5">
        <div className="w-full h-1 bg-seo-des-color-first" />
        <h1 className="text-9xl font-bold text-center">
          <ChevronDown className="my-10  " />
        </h1>
        <div className="w-full h-1 bg-seo-des-color-first" />
      </div>

      <div className="px-5">
        <div className="bg-seo-des-color-first flex justify-center items-center p-4 text-white">
          <p className="py-3 text-center w-9/12 text-xl">
            Free Digital Tools gets real traffic and the users are enjoying the
            services we provide. That’s why the engagement time on our site is
            more than the average.
          </p>
        </div>
      </div>

      {/* why free digital tool */}
      <div className="my-10 space-y-6">
        <h1 className="text-4xl font-bold "> Why Free Digital Tools? </h1>
        <p className="text-seo-des-color-first my-10 text-lg">
          We know how things work, that’s why:
        </p>
        <ol className="list-decimal list-inside space-y-6 my-8 text-seo-des-color-first text-lg ">
          <li>
            Google instant index new Free Digital Tools pages. it takes less
            than 6 hours for pages to be crawled and served by Google.
          </li>
          <li>
            Our website constantly gets a traffic boost each Google algorithm
            update.
          </li>
          <li>
            We execute our tasks with the expertise and precision expected of
            seasoned professionals in the field.
          </li>
        </ol>
      </div>
      {/* contact section */}
      <div className="my-10">
        <h1 className="text-4xl font-bold "> How to Contact Us? </h1>
        <ul className="list-disc list-inside space-y-6 my-8 text-seo-des-color-first text-lg ">
          <li>
            You can send us a message at:{" "}
            <Link href="mailto:support@freeDigitalTools.tools">
              support@freeDigitalTools.tools
            </Link>
            .
          </li>
          <li>
            {" "}
            You can also contact us through our{" "}
            <Link href="https://www.facebook.com/freeDigitalTools">
              Facebook page
            </Link>
            .
          </li>
        </ul>

        <div className="flex justify-center items-center flex-wrap gap-y-4 w-full ">
          {socialLinks.map((link, index) => (
            <div
              key={index}
              className="border  flex justify-center items-center p-4 flex-auto"
            >
              <Link href={link.link} target="_blank">
                {link.icon}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurServicesPage;
