"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface AddressInputProps {
  onAnalyze: (address: string) => Promise<void>;
  isLoading: boolean;
}

/**
 * Detect blockchain from address format
 */
function detectChain(address: string): "ethereum" | "solana" | null {
  if (address.startsWith("0x") && address.length === 42) {
    return "ethereum";
  }
  if (/^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address)) {
    return "solana";
  }
  return null;
}

export function AddressInput({ onAnalyze, isLoading }: AddressInputProps) {
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!address.trim()) {
      setError("Please enter an address");
      return;
    }

    const chain = detectChain(address);
    if (!chain) {
      setError(
        "Invalid address format. Please enter a valid Ethereum (0x...) or Solana address",
      );
      return;
    }

    await onAnalyze(address);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto space-y-4"
    >
      <div className="relative">
        <Input
          placeholder="Enter Ethereum (0x...) or Solana wallet address"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            setError("");
          }}
          disabled={isLoading}
          className="bg-slate-800/50 border-slate-700 text-slate-50 placeholder:text-slate-500 h-12 text-base"
        />
        {error && (
          <div className="absolute -bottom-6 left-0 flex items-center gap-2 text-red-400 text-sm mt-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}
      </div>
      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold h-12"
      >
        {isLoading ? "Analyzing..." : "Analyze Address"}
      </Button>
    </form>
  );
}
