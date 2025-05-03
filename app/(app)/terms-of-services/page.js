export const dynamic = "force-dynamic";
export const metadata = {
  title: {
    default: "Terms and Conditions",
    card: "summary_large_image",
  },
};

const TermsPage = () => {
  return (
    <div className="container mx-auto px-6 py-12">
      {/* Header */}
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-seo-first-color mb-4">
          Terms and Conditions
        </h1>
        <p className="text-sm text-seo-third-color">
          Last updated: April 21, 2025
        </p>
      </header>

      {/* Introduction */}
      <section className="mb-8 text-seo-second-color">
        <p>
          Please read these terms and conditions carefully before using our
          Service.
        </p>
      </section>

      {/* Definitions */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-seo-third-color mb-4">
          Interpretation &amp; Definitions
        </h2>
        <h3 className="text-xl font-medium text-seo-forth-color mb-2">
          Interpretation
        </h3>
        <p className="mb-4 text-seo-second-color leading-relaxed">
          Capitalized terms have specific meanings defined under these
          conditions. Definitions apply both in singular and plural forms.
        </p>
        <h3 className="text-xl font-medium text-seo-forth-color mb-2">
          Definitions
        </h3>
        <ul className="list-disc pl-6 space-y-2 text-seo-second-color">
          {[
            {
              term: "Affiliate",
              desc: "Entity controlling, controlled by, or under common control.",
            },
            { term: "Company", desc: "Refers to FreeDigitalTools." },
            { term: "Country", desc: "Bangladesh." },
            {
              term: "Device",
              desc: "Any device accessing the Service (computer, tablet, phone).",
            },
            { term: "Service", desc: "The FreeDigitalTools website." },
            {
              term: "Terms",
              desc: "These Terms and Conditions governing Service use.",
            },
            {
              term: "Third-party Social Media Service",
              desc: "External sites used for login or sharing.",
            },
            { term: "You", desc: "User of the Service, individual or entity." },
          ].map((item) => (
            <li key={item.term}>
              <strong>{item.term}:</strong> {item.desc}
            </li>
          ))}
        </ul>
      </section>

      {/* Acknowledgment */}
      <section className="mb-8 text-seo-second-color">
        <h2 className="text-2xl font-semibold text-seo-third-color mb-4">
          Acknowledgment
        </h2>
        <p className="leading-relaxed">
          By accessing or using our Service, you agree to be bound by these
          Terms. If you disagree, please do not use the Service. You confirm
          that you are at least 18 years old.
        </p>
        <p className="mt-4 leading-relaxed">
          Your use is also governed by our{" "}
          <a
            href="/privacy-policy"
            className="text-seo-first-color hover:underline"
          >
            Privacy Policy
          </a>
          .
        </p>
      </section>

      {/* Access & Termination */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-seo-third-color mb-4">
          Access &amp; Termination
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-seo-second-color">
          <li>
            We may suspend or terminate your access without notice if you breach
            these Terms.
          </li>
          <li>All rights cease upon termination.</li>
        </ul>
      </section>

      {/* Liability */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-seo-third-color mb-4">
          Limitation of Liability
        </h2>
        <p className="text-seo-second-color leading-relaxed">
          To the maximum extent permitted by law, our total liability is limited
          to $100 or the amount you paid, whichever is greater. We are not
          liable for indirect or consequential damages.
        </p>
      </section>

      {/* Disclaimer */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-seo-third-color mb-4">
          Disclaimer
        </h2>
        <p className="text-seo-second-color leading-relaxed">
          Our Service is provided &ldquo;AS IS&ldquo; and &ldquo;AS
          AVAILABLE&ldquo; without warranties of any kind. We do not guarantee
          uninterrupted, error-free, or secure operation.
        </p>
      </section>

      {/* Governing Law & Disputes */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-seo-third-color mb-4">
          Governing Law &amp; Dispute Resolution
        </h2>
        <p className="text-seo-second-color leading-relaxed">
          These Terms are governed by Bangladeshi law. Any disputes will first
          be attempted to be resolved informally by contacting us.
        </p>
      </section>

      {/* Contact */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-seo-third-color mb-4">
          Contact Us
        </h2>
        <p className="text-seo-second-color">
          Have questions? Email us at{" "}
          <a
            href="mailto:admin@freedigitaltool.com"
            className="text-seo-first-color hover:underline"
          >
            admin@freedigitaltool.com
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default TermsPage;
