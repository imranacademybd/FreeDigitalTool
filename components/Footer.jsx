import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="mt-14 ">
      <div className="container mx-auto p-10">
        {/* Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-10">
          {/* Branding Section - Full width on mobile, 1 column on md/lg */}
          <div className="lg:col-span-1">
            <Link
              href={"/"}
              className="md:px-3 text-xl h-auto  bg-none border-none bg-white border-white"
            >
              <img
                src={"/free-dg-tools-more-resized.png"}
                alt="free digital tools"
                className=" w-40"
              />
            </Link>
            <p className="text-base">
              SeoStudio provides over 170 free tools for SEO experts, YouTubers,
              webmasters, students, and writers. These tools cover keyword
              research, backlink tracking, content optimization, and more to
              enhance your digital strategies and online presence.
            </p>
          </div>

          {/* Tools Column - Always appears first in grid order */}
          <div className="md:col-span-1 lg:col-span-1">
            <h6 className="text-lg font-semibold mb-4">Tools</h6>
            <div className="grid gap-2">
              {[
                "Text Tools",
                "YouTube Tools",
                "SEO Tools",
                "Domain & IP Tools",
                "Website Management Tools",
                "Web Development Tools",
                "Image Editing Tools",
                "Online Calculators",
                "Unit Converter Tools",
                "Binary Converter Tools",
                "Miscellaneous Tools",
              ].map((item) => (
                <a key={item} className="hover:text-primary transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Blog Column */}
          <div className="md:col-span-1 lg:col-span-1">
            <h6 className="text-lg font-semibold mb-4">Blog</h6>
            <div className="grid gap-2">
              {["Best Software", "SEO", "Web", "Dev", "YouTube"].map((item) => (
                <a key={item} className="hover:text-primary transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Company Column */}
          <div className="md:col-span-1 lg:col-span-1">
            <h6 className="text-lg font-semibold mb-4">Company</h6>
            <div className="grid gap-2">
              {[
                "About Us",
                "Privacy Policy",
                "Disclaimer",
                "Terms of Services",
                "Report",
                "Contact Us",
              ].map((item) => (
                <a key={item} className="hover:text-primary transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center border-t pt-6">
          <p className="text-sm">
            Copyrights © 2024. All Rights Reserved by <strong>SEOSTUDIO</strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
