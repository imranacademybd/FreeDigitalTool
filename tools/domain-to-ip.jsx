import { useState } from "react";
import useLoading from "@/hooks/useLoading"; // Assuming you have a loading hook

const DomainToIp = ({ tool }) => {
  const [domain, setDomain] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const { loading, startLoading, stopLoading } = useLoading();

  const validateDomain = (domain) => {
    const fqdnRegex = /^(?=.{1,253}$)(([a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,63})$/;
    return fqdnRegex.test(domain);
  };

  const extractHostname = (url) => {
    try {
      const cleanedUrl = url.replace(/^(https?:\/\/)?/, "");
      return cleanedUrl.split("/")[0];
    } catch (e) {
      return url;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!domain || !validateDomain(domain)) {
      setError("Please enter a valid domain name");
      return;
    }

    startLoading();
    try {
      const response = await fetch("/api/tools/domain-to-ip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain: extractHostname(domain) }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to fetch IP");

      setResults({ domain, content: data });
    } catch (err) {
      setError(err.message);
    } finally {
      stopLoading();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="mb-4">
          <label
            htmlFor="domain"
            className="block mb-2 font-medium text-foreground"
          >
            Domain Name
          </label>
          <input
            type="text"
            id="domain"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="w-full p-2.5 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
            placeholder="example.com"
          />
          {error && <p className="text-destructive mt-1 text-sm">{error}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[var(--seo-light-green)] text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-[#45e000] disabled:bg-muted disabled:text-muted-foreground transition-colors shadow4xl"
        >
          {loading ? "Converting..." : "Convert Domain"}
        </button>
      </form>

      {results && (
        <div className="mt-8 max-w-2xl mx-auto bg-card border border-border rounded-lg p-6 shadow4xl">
          <h2 className="text-xl font-semibold mb-4 text-foreground">
            Results for{" "}
            <span className="text-[var(--seo-light-green)]">
              {results.domain}
            </span>
          </h2>
          <pre className="bg-muted/20 p-4 rounded-md text-sm text-muted-foreground border border-border">
            {JSON.stringify(results.content, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default DomainToIp;
