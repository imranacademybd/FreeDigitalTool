import { Button } from "../ui/button";

export default function HeroSection() {
  return (
    // <section
    //   style={{
    //     backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.05)),url('./seo-studio-banner.jpeg')",
    //     backgroundRepeat: "no-repeat",
    //     backgroundSize: "cover",
    //   }}
    //   className=" bg-gradient-to-b from-blue-50 to-white py-20 min-h-[90vh] flex justify-center items-center text-seo-primary font-roboto"
    // >
    //   <div className="container mx-auto px-4 text-center">
    //     <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">
    //       All-in-One Online Toolkit
    //     </h1>
    //     <p className="text-xl text-gray-800 mb-8">
    //       Free online tools for developers, designers, and marketers
    //     </p>

    //     {/* Search Bar */}
    //     <div className="max-w-2xl mx-auto">
    //       <div className="relative">
    //         <input
    //           type="text"
    //           placeholder="Search for tools..."
    //           className="w-full px-6 py-4 rounded-lg border border-seo-primary text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
    //         />
    //         <button className="absolute right-3 top-3 bg-seo-primary text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors">
    //           Search
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </section>

    <section
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url('./banner.webp')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className=" relative   bg-gradient-to-r from-[#5B913B] to-[#77B254] text-seo-third-color py-16 px-6 min-h-[550px] flex flex-col justify-center items-center xl:items-start  font-roboto"
    >
      <div className=" container mx-auto text-center flex flex-col justify-center items-center xl:justify-start xl:items-start  gap-6 xl:ml-40 ">
        <h1 className="text-5xl text-seo-first-color font-extrabold mb-6">
          Unlock Powerful SEO Tools
        </h1>
        <p className="text-xl mb-8 text-[#D99D81]">
          Explore our range of SEO tools designed to boost your website's
          performance.
        </p>
        <Button className="bg-white text-[#5B913B] py-3 px-8 text-lg rounded-lg transition hover:bg-[#77B254] hover:text-white">
          Explore Tools
        </Button>
      </div>
    </section>
  );
}
