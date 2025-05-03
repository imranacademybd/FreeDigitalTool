// tools/typescript-converter.jsx
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check, AlertCircle, Code2, Clipboard } from "lucide-react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-typescript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

const TypescriptConverter = () => {
  const [typescriptCode, setTypescriptCode] = useState("");
  const [javascriptCode, setJavascriptCode] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load Babel standalone dynamically
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/@babel/standalone/babel.min.js";
    script.async = true;
    script.onload = () => setLoading(false);
    document.body.appendChild(script);

    return () => document.body.removeChild(script);
  }, []);

  const convertCode = async () => {
    try {
      setLoading(true);
      setError("");

      if (!window.Babel) {
        throw new Error("Babel compiler not loaded yet");
      }

      const result = window.Babel.transform(typescriptCode, {
        presets: ["typescript"],
        filename: "file.ts",
      });

      setJavascriptCode(result.code);
    } catch (err) {
      setError(err.message);
      setJavascriptCode("");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(javascriptCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      setError("Failed to copy to clipboard");
    }
  };

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code2 className="w-6 h-6" />
          TypeScript to JavaScript Converter
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h3 className="font-medium">TypeScript Input</h3>
            <AceEditor
              mode="typescript"
              theme="github"
              value={typescriptCode}
              onChange={setTypescriptCode}
              name="ts-editor"
              fontSize={14}
              width="100%"
              height="400px"
              showPrintMargin={false}
              setOptions={{
                useWorker: false,
                showLineNumbers: true,
              }}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">JavaScript Output</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                disabled={!javascriptCode}
              >
                {copied ? (
                  <Check className="w-4 h-4 mr-2" />
                ) : (
                  <Clipboard className="w-4 h-4 mr-2" />
                )}
                Copy
              </Button>
            </div>
            <AceEditor
              mode="javascript"
              theme="github"
              value={javascriptCode}
              name="js-editor"
              readOnly
              fontSize={14}
              width="100%"
              height="400px"
              showPrintMargin={false}
              setOptions={{
                useWorker: false,
                showLineNumbers: true,
              }}
            />
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-600">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        <div className="flex justify-center gap-2">
          <Button
            onClick={convertCode}
            disabled={loading || !typescriptCode.trim()}
            className="w-full md:w-auto"
          >
            {loading ? "Converting..." : "Convert to JavaScript"}
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setTypescriptCode("");
              setJavascriptCode("");
            }}
            className="w-full md:w-auto"
          >
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TypescriptConverter;
