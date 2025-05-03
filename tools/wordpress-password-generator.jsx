// tools/wordpress-password-generator.jsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Check, RefreshCw, Key } from 'lucide-react';
import md5 from 'blueimp-md5'; // Client-side MD5 implementation

class WordPressHasher {
  constructor() {
    this.itoa64 = './0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    this.iterationCount = 8;
    this.portableHashes = true;
  }

  hash(password) {
    const salt = this.gensalt();
    return this.crypt(password, salt);
  }

  gensalt() {
    const salt = this.portableHashes ? '$P$' : '$S$';
    return salt + this.encode64(this.random(6), this.iterationCount);
  }

  random(count) {
    const array = new Uint8Array(count);
    crypto.getRandomValues(array);
    return Array.from(array, byte => String.fromCharCode(byte)).join('');
  }

  encode64(input, count) {
    let output = '';
    let i = 0;
    const str = String(input);
    do {
      let value = str.charCodeAt(i++);
      output += this.itoa64[value & 0x3f];
      if (i < count) value |= str.charCodeAt(i) << 8;
      output += this.itoa64[(value >> 6) & 0x3f];
      if (i++ >= count) break;
      if (i < count) value |= str.charCodeAt(i) << 16;
      output += this.itoa64[(value >> 12) & 0x3f];
      if (i++ >= count) break;
      output += this.itoa64[(value >> 18) & 0x3f];
    } while (i < count);
    return output;
  }

  crypt(password, setting) {
    let hash = md5(password);
    for (let i = 0; i < (1 << this.iterationCount); i++) {
      hash = md5(hash + password);
    }
    return setting + this.encode64(hash, 16);
  }
}

const WordPressPasswordGenerator = () => {
  const [password, setPassword] = useState('');
  const [hash, setHash] = useState('');
  const [salts, setSalts] = useState({});
  const [copied, setCopied] = useState({});
  const [loading, setLoading] = useState(false);

  const generateSalt = (length = 64) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => chars[byte % chars.length]).join('');
  };

  const generatePassword = () => {
    setLoading(true);
    try {
      // Generate password
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=';
      const newPassword = Array.from({ length: 16 }, () => 
        chars[Math.floor(Math.random() * chars.length)]
      ).join('');

      // Generate hash
      const hasher = new WordPressHasher();
      const newHash = hasher.hash(newPassword);

      // Generate salts
      setPassword(newPassword);
      setHash(newHash);
      setSalts({
        AUTH_KEY: generateSalt(),
        SECURE_AUTH_KEY: generateSalt(),
        LOGGED_IN_KEY: generateSalt(),
        NONCE_KEY: generateSalt(),
        AUTH_SALT: generateSalt(),
        SECURE_AUTH_SALT: generateSalt(),
        LOGGED_IN_SALT: generateSalt(),
        NONCE_SALT: generateSalt(),
      });
    } catch (error) {
      console.error('Generation error:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(prev => ({ ...prev, [field]: true }));
      setTimeout(() => setCopied(prev => ({ ...prev, [field]: false }), 2000));
    } catch (err) {
      alert('Failed to copy to clipboard');
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="w-6 h-6" />
          WordPress Password Generator
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-4">
          <Button onClick={generatePassword} disabled={loading} className="gap-2">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? 'Generating...' : 'Generate New Password'}
          </Button>

          {password && (
            <div className="space-y-6">
              {/* Password Section */}
              <div className="space-y-2">
                <label className="font-medium">Generated Password</label>
                <div className="flex gap-2">
                  <Input value={password} readOnly className="font-mono" />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(password, 'password')}
                  >
                    {copied.password ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Hash Section */}
              <div className="space-y-2">
                <label className="font-medium">WordPress Hash</label>
                <div className="flex gap-2">
                  <Input value={hash} readOnly className="font-mono" />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => copyToClipboard(hash, 'hash')}
                  >
                    {copied.hash ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Salts Section */}
              <div className="space-y-4">
                <h3 className="font-medium">Authentication Salts</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  {Object.entries(salts).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <label className="text-sm font-mono">{key}</label>
                      <div className="flex gap-2">
                        <Input value={value} readOnly className="font-mono text-sm" />
                        <Button
                          variant="outline"
                          size="icon"
                          className="shrink-0"
                          onClick={() => copyToClipboard(value, key)}
                        >
                          {copied[key] ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WordPressPasswordGenerator;