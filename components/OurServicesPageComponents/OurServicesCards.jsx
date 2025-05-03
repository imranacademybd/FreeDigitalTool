import { ArrowLeftRight, PhoneCall, ShoppingCart } from "lucide-react";
import { FaGoogle, FaWordpress } from "react-icons/fa";
import { RiAdvertisementFill } from "react-icons/ri";
import OurServicesSingleCard from "./OurServicesSingleCard";
import { GrChapterNext } from "react-icons/gr";

const OurServicesCards = () => {
  const services = [
    {
      icon: <RiAdvertisementFill />,
      title: "Banner Ads Placements",
      description: "Put your banner ad on our website in 8 different places.",
      className: "md:col-span-2",
    },
    {
      icon: (
        <PhoneCall className="text-8xl" />
      ),
      title: "Guest Posting",
      description: "Share your blog post with our audience.",

      className: "md:col-span-2",
    },
    {
      icon: <FaGoogle />,
      title: "On Page SEO",
      description:
        "Optimize website’s pages to help them rank higher in search engines.",
      className: "md:col-span-2",
    },
    {
      icon: <FaGoogle />,
      title: "Off Page SEO",
      description:
        "Social media Local SEO Backlink analysis Improve page speed.",
      className: "md:col-span-3 justify-self-center align-self-center",
    },
    {
      icon: <ShoppingCart />,
      title: "Performance Marketing",
      description: "Facebook ads, Google Ads.",
      className: "md:col-span-3 justify-self-center align-self-center",
    },
    {
      icon: <FaWordpress />,
      title: "WordPress Installation",
      description:
        "Install WordPress on unmanaged hosting. Plus point domain and install SSL.",
      className: "md:col-span-2 justify-self-center align-self-center",
    },
    {
      icon: <GrChapterNext />,
      title: "Speed Up WordPress",
      description: "Make your WordPress site load faster than ever before.",
      className: "md:col-span-2 justify-self-center align-self-center",
    },
    {
      icon: <ArrowLeftRight />,
      title: "Website Migration",
      description: "Migrate your website with minimum to zero downtime.",
      className: "md:col-span-2 justify-self-center align-self-center",
    },
  ];
  return (
    <section className="p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 gap-y-20 my-10 justify-items-center justify-center items-center">
      {services.map((service, index) => (
        <OurServicesSingleCard key={index} service={service} />
      ))}
    </section>
  );
};

export default OurServicesCards;
