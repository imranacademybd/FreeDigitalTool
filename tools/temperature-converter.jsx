// tools/temperature-converter.jsx
'use client';

import { useState } from 'react';
// import useSWR from "swr";
import useSWR from 'swr';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Copy, Check, RefreshCw, Thermometer } from 'lucide-react';

const TemperatureConverter = () => {
  const [inputValue, setInputValue] = useState('');
  const [inputUnit, setInputUnit] = useState('celsius');
  const [converted, setConverted] = useState({});
  const [copied, setCopied] = useState({});

  const convertTemperature = (value, fromUnit) => {
    const num = parseFloat(value);
    if (isNaN(num)) return {};
    
    const conversions = {
      celsius: {
        fahrenheit: (num * 9/5) + 32,
        kelvin: num + 273.15
      },
      fahrenheit: {
        celsius: (num - 32) * 5/9,
        kelvin: (num - 32) * 5/9 + 273.15
      },
      kelvin: {
        celsius: num - 273.15,
        fahrenheit: (num - 273.15) * 9/5 + 32
      }
    };

    return conversions[fromUnit];
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    setConverted(convertTemperature(value, inputUnit));
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

  const clearAll = () => {
    setInputValue('');
    setConverted({});
    setCopied({});
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Thermometer className="w-6 h-6" />
          Temperature Converter
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Enter temperature"
              value={inputValue}
              onChange={handleInputChange}
              className="flex-1"
            />
            <div className="flex gap-1">
              {['celsius', 'fahrenheit', 'kelvin'].map((unit) => (
                <Button
                  key={unit}
                  variant={inputUnit === unit ? 'default' : 'outline'}
                  onClick={() => {
                    setInputUnit(unit);
                    setConverted(convertTemperature(inputValue, unit));
                  }}
                >
                  °{unit[0].toUpperCase()}
                </Button>
              ))}
            </div>
          </div>

          {Object.keys(converted).length > 0 && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {Object.entries(converted).map(([unit, value]) => (
                  <div key={unit} className="space-y-1">
                    <label className="font-medium">
                      {unit.charAt(0).toUpperCase() + unit.slice(1)}
                    </label>
                    <div className="flex gap-2">
                      <Input
                        value={`${value.toFixed(2)} °${unit[0].toUpperCase()}`}
                        readOnly
                        className="font-mono"
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => copyToClipboard(value.toFixed(2), unit)}
                      >
                        {copied[unit] ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={clearAll}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TemperatureConverter;