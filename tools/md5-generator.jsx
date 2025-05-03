// tools/md5-generator.tsx
"use client";

import { useState } from "react";
import md5 from "crypto-js/md5";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MD5Generator = () => {
  const [input, setInput] = useState("");
  const [hash, setHash] = useState("");

  const generateHash = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      setHash("Please enter valid input");
      return;
    }
    const result = md5(input.trim()).toString();
    setHash(result);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center ">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>MD5 Hash Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={generateHash} className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter text to hash"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">Generate</Button>
            </div>

            {hash && (
              <div className="space-y-2">
                <label className="text-sm font-medium">MD5 Hash:</label>
                <div className="p-4 bg-gray-100 rounded-md break-all font-mono">
                  {hash}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(hash)}
                >
                  Copy to Clipboard
                </Button>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default MD5Generator;
