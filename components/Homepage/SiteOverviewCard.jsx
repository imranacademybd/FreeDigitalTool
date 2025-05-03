"use client";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaReddit,
  FaWhatsapp,
} from "react-icons/fa";
import {
  FacebookShareButton,
  LinkedinShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

const SiteOverviewCard = () => {
  const shareUrl = "https://seostudio.tools/";
  const title = "Check out this awesome SEO tool!";
  return (
    <section className="my-14 font-roboto p-4">
      <div className="container mx-auto">
        <div className="shadow-sm rounded-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-white p-8">
            <h1 className="text-seo-third-color text-3xl font-playfair leading-snug">
              Free <span className="text-seo-light-green">SEO</span> &{" "}
              <span className="text-seo-light-green">Web Management</span> Tools
              to Boost Your Online Success!
            </h1>
            <p className="text-seo-third-color mt-2 ">
              Access a complete range of free SEO, keyword, and web management
              tools to optimize your site and enhance your online presence.
            </p>
          </div>

          {/* Body Section */}
          <div className="p-6 bg-white space-y-10">
            <p className="text-seo-des-color-first">
              freedigitaltool.com offers a wide range of free online tools
              designed to help you improve your website's SEO and performance.
              From keyword research and backlink analysis to plagiarism
              detection and grammar checks, these tools are easy to use and
              perfect for optimizing your content and boosting your online
              visibility. Whether you're a digital marketer, blogger, or small
              business owner, freedigitaltool.com provides essential resources
              to enhance your site’s rankings, monitor performance, and stay
              ahead in the competitive online world — all without cost.
            </p>
            <div className="w-full flex justify-center my-4 mb-10">
              <div className="w-20 h-1 bg-gray-300"></div>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center gap-4  max-w-sm p-4 mx-auto ">
              <FacebookShareButton url={shareUrl} quote={title}>
                <FaFacebookF className="text-blue-500 hover:text-blue-700 text-2xl cursor-pointer" />
              </FacebookShareButton>

              <TwitterShareButton url={shareUrl} title={title}>
                <FaTwitter className="text-blue-400 hover:text-blue-600 text-2xl cursor-pointer" />
              </TwitterShareButton>

              <LinkedinShareButton url={shareUrl} title={title}>
                <FaLinkedinIn className="text-blue-700 hover:text-blue-900 text-2xl cursor-pointer" />
              </LinkedinShareButton>

              <RedditShareButton url={shareUrl} title={title}>
                <FaReddit className="text-red-500 hover:text-red-700 text-2xl cursor-pointer" />
              </RedditShareButton>

              <WhatsappShareButton url={shareUrl} title={title}>
                <FaWhatsapp className="text-green-500 hover:text-green-700 text-2xl cursor-pointer" />
              </WhatsappShareButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SiteOverviewCard;
