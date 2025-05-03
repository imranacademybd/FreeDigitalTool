// tools/seo-checker.jsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  AlertCircle,
  Info,
  Timer,
  Gauge,
  FileText,
  Clipboard,
  Download,
  ImageIcon,
} from "lucide-react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";

const SEOChecker = () => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const analyzeSEO = async (e) => {
    e.preventDefault();
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Enhanced mock data
    setResults({
      score: 82,
      checks: {
        ssl: true,
        mobileFriendly: true,
        metaTitle: {
          exists: true,
          content: "Best SEO Tools Online | Free Website Analysis Toolkit",
          length: 58,
        },
        metaDescription: {
          exists: true,
          content:
            "Analyze your website SEO performance with our free toolkit. Check rankings, speed, and optimization factors instantly.",
          length: 156,
        },
        headings: {
          h1: ["SEO Analysis Tool"],
          h2: ["Key Metrics", "Content Quality", "Technical SEO"],
          h3: ["Mobile Performance", "Page Speed", "Security"],
        },
        images: {
          total: 14,
          withAlt: 12,
          withoutAlt: ["image-1.jpg", "banner.png"],
          examples: [
            { src: "image-1.jpg", alt: "" },
            { src: "banner.png", alt: "Website banner" },
          ],
        },
        keywords: {
          primary: "SEO Tools",
          density: 2.4,
          distribution: ["SEO", "Analysis", "Website", "Free", "Tools"],
        },
        speed: {
          loadTime: 2.4,
          recommendations: [
            "Enable compression",
            "Optimize images",
            "Minify CSS",
          ],
        },
        socialMeta: {
          ogTags: true,
          twitterCards: false,
        },
        security: {
          https: true,
          headers: ["X-Content-Type-Options", "X-Frame-Options"],
        },
      },
    });

    setLoading(false);
  };

  const copyReport = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(results, null, 2));
      alert("Report copied to clipboard!");
    } catch (err) {
      alert("Failed to copy report");
    }
  };

  const radarData = [
    { factor: "Performance", value: 85 },
    { factor: "Accessibility", value: 75 },
    { factor: "Best Practices", value: 90 },
    { factor: "SEO", value: 82 },
    { factor: "Security", value: 88 },
  ];

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Website SEO Analyzer</CardTitle>
            <p className="text-muted-foreground mt-2">
              Complete website SEO audit and optimization suggestions
            </p>
          </div>
          {results && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={copyReport}>
                <Clipboard className="w-4 h-4 mr-2" />
                Copy Report
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                PDF Export
              </Button>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={analyzeSEO} className="flex gap-2">
          <Input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="flex-1"
            required
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Analyzing..." : "Check SEO"}
          </Button>
        </form>

        {results && (
          <div className="space-y-8">
            {/* Overall Score Section */}
            <div className="grid gap-8 md:grid-cols-2">
              <div className="p-6 bg-card rounded-xl border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Gauge className="w-5 h-5" />
                  Overall SEO Score
                </h3>
                <Progress value={results.score} className="h-3" />
                <div className="mt-4 text-4xl font-bold text-primary">
                  {results.score}/100
                </div>
              </div>

              <div className="p-6 bg-card rounded-xl border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Timer className="w-5 h-5" />
                  Performance
                </h3>
                <RadarChart
                  outerRadius={90}
                  width={300}
                  height={200}
                  data={radarData}
                >
                  <PolarGrid />
                  <PolarAngleAxis dataKey="factor" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    dataKey="value"
                    stroke="#2563eb"
                    fill="#2563eb"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </div>
            </div>

            {/* Detailed Sections */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <SEOCheckItem
                title="SSL Security"
                passed={results.checks.ssl}
                icon={<CheckCircle2 className="w-5 h-5" />}
              >
                <div className="space-y-2">
                  <p className="text-sm">
                    Protocol: {results.checks.ssl ? "HTTPS" : "HTTP"}
                  </p>
                  <p className="text-sm">
                    Security Headers:{" "}
                    {results.checks.security.headers.join(", ")}
                  </p>
                </div>
              </SEOCheckItem>

              <SEOCheckItem
                title="Meta Tags"
                passed={
                  results.checks.metaTitle.exists &&
                  results.checks.metaDescription.exists
                }
                icon={<FileText className="w-5 h-5" />}
              >
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">Title</h4>
                    <p className="text-sm text-muted-foreground">
                      {results.checks.metaTitle.content}
                    </p>
                    <p className="text-sm mt-1">
                      {results.checks.metaTitle.length} characters
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Description</h4>
                    <p className="text-sm text-muted-foreground">
                      {results.checks.metaDescription.content}
                    </p>
                    <p className="text-sm mt-1">
                      {results.checks.metaDescription.length} characters
                    </p>
                  </div>
                </div>
              </SEOCheckItem>

              <SEOCheckItem
                title="Content Quality"
                passed={results.checks.keywords.density <= 3}
                icon={<FileText className="w-5 h-5" />}
              >
                <div className="space-y-2">
                  <p className="text-sm">
                    Primary Keyword: {results.checks.keywords.primary}
                  </p>
                  <p className="text-sm">
                    Keyword Density: {results.checks.keywords.density}%
                  </p>
                  <p className="text-sm">
                    Keywords Found:{" "}
                    {results.checks.keywords.distribution.join(", ")}
                  </p>
                </div>
              </SEOCheckItem>

              <SEOCheckItem
                title="Heading Structure"
                passed={results.checks.headings.h1.length === 1}
                icon={<FileText className="w-5 h-5" />}
              >
                <div className="space-y-2">
                  <h4 className="font-medium">
                    H1 Tags ({results.checks.headings.h1.length})
                  </h4>
                  <ul className="text-sm list-disc pl-4">
                    {results.checks.headings.h1.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              </SEOCheckItem>

              <SEOCheckItem
                title="Images Optimization"
                passed={results.checks.images.withoutAlt.length === 0}
                icon={<ImageIcon className="w-5 h-5" />}
              >
                <div className="space-y-2">
                  <p className="text-sm">
                    Total Images: {results.checks.images.total}
                  </p>
                  <p className="text-sm">
                    Missing Alt Tags: {results.checks.images.withoutAlt.length}
                  </p>
                  {results.checks.images.withoutAlt.length > 0 && (
                    <div className="text-sm text-red-500">
                      Missing alt attributes for:{" "}
                      {results.checks.images.withoutAlt.join(", ")}
                    </div>
                  )}
                </div>
              </SEOCheckItem>

              <SEOCheckItem
                title="Page Speed"
                passed={results.checks.speed.loadTime < 3}
                icon={<Timer className="w-5 h-5" />}
              >
                <div className="space-y-2">
                  <p className="text-sm">
                    Load Time: {results.checks.speed.loadTime}s
                  </p>
                  <div className="text-sm">
                    <h4 className="font-medium">Recommendations:</h4>
                    <ul className="list-disc pl-4">
                      {results.checks.speed.recommendations.map((rec, i) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </SEOCheckItem>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const SEOCheckItem = ({ title, passed, icon, children }) => (
  <div className="p-4 bg-card rounded-lg border">
    <div className="flex items-center gap-3 mb-3">
      <span className={passed ? "text-green-500" : "text-red-500"}>
        {passed ? (
          <CheckCircle2 className="w-5 h-5" />
        ) : (
          <AlertCircle className="w-5 h-5" />
        )}
      </span>
      <h3 className="font-medium">{title}</h3>
      {icon}
    </div>
    <div className="text-sm text-muted-foreground">{children}</div>
  </div>
);

export default SEOChecker;
