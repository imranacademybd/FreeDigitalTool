export const dynamic = "force-dynamic";
import Link from "next/link";
import React from "react";
export const metadata = {
  title: {
    default: "About Us",
    card: "summary_large_image",
  },
};
const AboutPage = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-semibold text-center text-seo-first-color mb-6">
        Welcome to FreeDigitalTools
      </h1>
      <p className="text-lg text-center text-seo-second-color mb-8 max-w-3xl mx-auto">
        Your one-stop platform for free online tools that simplify digital life.
        Access over 500 high-quality, browser-based tools—no downloads, no
        sign-ups, and no limits.
      </p>

      {/* Mission Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-seo-third-color mb-4">
          Our Mission
        </h2>
        <p className="text-base text-seo-second-color leading-relaxed">
          To make high-quality digital tools accessible to everyone, everywhere,
          at zero cost. We believe technology should empower, not restrict.
          That’s why our tools are:
        </p>
        <ul className="list-disc pl-6 mt-4 space-y-2 text-seo-second-color">
          <li>Easy to use</li>
          <li>Free to access</li>
          <li>Built for speed</li>
          <li>Safe and private</li>
        </ul>
      </section>

      {/* What We Offer */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-seo-third-color mb-4">
          What You’ll Find
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-seo-second-color">
          {[
            {
              title: "SEO Tools",
              items: [
                "Keyword research",
                "Meta tag analyzer",
                "Backlink checker",
                "Domain authority checker",
              ],
            },
            {
              title: "YouTube Tools",
              items: [
                "Title generator",
                "Thumbnail downloader",
                "Tag extractor",
                "Keyword ideas",
              ],
            },
            {
              title: "Social Media Tools",
              items: [
                "Hashtag generators",
                "Bio ideas",
                "Post schedulers",
                "Engagement analyzers",
              ],
            },
            {
              title: "Text & Content",
              items: [
                "Plagiarism checker",
                "Grammar fixer",
                "Article rewriter",
                "Text summarizer",
              ],
            },
            {
              title: "PDF Tools",
              items: [
                "PDF to Word",
                "Merge PDFs",
                "Compress PDFs",
                "Rotate pages",
              ],
            },
            {
              title: "Image Tools",
              items: ["Resize", "Compress", "Convert images"],
            },
            {
              title: "Online Calculators",
              items: ["Math", "BMI", "Loan", "Age calculators"],
            },
            {
              title: "Converters",
              items: [
                "Binary converter",
                "Unit converter",
                "Currency converter",
              ],
            },
            {
              title: "Web Dev Tools",
              items: ["Minifiers", "JSON formatter", "Lorem ipsum generator"],
            },
          ].map((cat) => (
            <div
              key={cat.title}
              className="p-6 border border-border rounded-lg shadow4xl"
            >
              <h3 className="text-xl font-semibold mb-3 text-seo-forth-color">
                {cat.title}
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-seo-second-color">
                {cat.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Why We're Different */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold text-seo-third-color mb-4">
          Why We’re Different
        </h2>
        <ul className="list-disc pl-6 space-y-3 text-seo-second-color">
          <li>⚡ Faster loading times with minimal redirects.</li>
          <li>🎯 Fewer ads for a smooth, uncluttered experience.</li>
          <li>📱 Fully mobile-responsive on any device.</li>
          <li>🔐 We don’t store or share your data—privacy guaranteed.</li>
          <li>🆕 Tools added regularly based on your feedback.</li>
        </ul>
      </section>

      {/* Get Involved */}
      <section className="text-center">
        <h2 className="text-2xl font-semibold text-seo-third-color mb-4">
          Join Us
        </h2>
        <p className="text-base text-seo-second-color mb-6 max-w-2xl mx-auto">
          FreeDigitalTools is constantly evolving. Have suggestions or need a
          specific tool? Reach out to us at{" "}
          <a
            href="mailto:admin@freedigitaltool.com"
            className="text-seo-first-color hover:underline"
          >
            admin@freedigitaltool.com
          </a>
          .
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-seo-first-color text-white rounded-xl font-medium hover:bg-opacity-90 transition"
        >
          Start Exploring Tools
        </Link>
      </section>
    </div>
  );
};

export default AboutPage;
