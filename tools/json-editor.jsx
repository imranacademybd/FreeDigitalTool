// tools/json-editor.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check, AlertCircle } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
 
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const JSONEditor = () => {
  const [input, setInput] = useState("");
  const [formatted, setFormatted] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      const formattedJSON = JSON.stringify(parsed, null, 2);
      setFormatted(formattedJSON);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON");
      setFormatted("");
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(formatted);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError("Failed to copy to clipboard");
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>JSON Editor & Validator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col gap-4">
          <Textarea
            placeholder={`Enter JSON here...\nExample: { "name": "John", "age": 30 }`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[200px] font-mono"
          />

          <div className="flex gap-2">
            <Button onClick={formatJSON}>Format/Validate</Button>
            <Button variant="outline" onClick={() => setInput("")}>
              Clear
            </Button>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-600">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {formatted && (
          <div className="relative group">
            <SyntaxHighlighter
              language="json"
              style={atomDark}
              customStyle={{
                borderRadius: "0.375rem",
                padding: "1rem",
                maxHeight: "500px",
                overflow: "auto",
              }}
            >
              {formatted}
            </SyntaxHighlighter>

            <Button
              size="sm"
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={copyToClipboard}
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JSONEditor;
