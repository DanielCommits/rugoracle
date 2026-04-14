"use client";

import { Copy, Check } from "lucide-react";
import { useState } from "react";

interface OverviewHeaderProps {
  address: string;
  riskScore: number;
  riskLevel: "safe" | "warning" | "danger";
  chain: "ethereum" | "solana";
}

export function OverviewHeader({
  address,
  riskScore,
  riskLevel,
  chain,
}: OverviewHeaderProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-red-400";
    if (score >= 40) return "text-yellow-400";
    return "text-green-400";
  };

  const getStatusBg = (level: string) => {
    switch (level) {
      case "danger":
        return "bg-red-500/20 border-red-500/30 text-red-400";
      case "warning":
        return "bg-yellow-500/20 border-yellow-500/30 text-yellow-400";
      case "safe":
        return "bg-green-500/20 border-green-500/30 text-green-400";
    }
  };

  const getStatusLabel = (level: string) => {
    switch (level) {
      case "danger":
        return "DANGER";
      case "warning":
        return "WARNING";
      case "safe":
        return "SAFE";
    }
  };

  return (
    <div className="bg-gradient-to-r from-slate-900/50 via-slate-900/50 to-slate-900/30 border border-slate-800 rounded-lg p-8 mb-8">
      {/* Address Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-slate-400">Analyzing Address</p>
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              chain === "ethereum"
                ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                : "bg-purple-500/20 text-purple-400 border border-purple-500/30"
            }`}
          >
            {chain === "ethereum" ? "🔷 Ethereum" : "🟣 Solana"}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <code className="text-slate-100 font-mono text-lg break-all">
            {address}
          </code>
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-slate-800 rounded-lg transition-colors flex-shrink-0"
            title="Copy address"
          >
            {copied ? (
              <Check className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </div>
      </div>

      {/* Risk Score Section */}
      <div className="flex items-end justify-between gap-8">
        <div>
          <p className="text-sm text-slate-400 mb-2">Risk Score</p>
          <div className={`text-6xl font-bold ${getScoreColor(riskScore)}`}>
            {riskScore}
          </div>
          <p className="text-slate-400 text-sm mt-1">out of 100</p>
        </div>

        {/* Status Badge */}
        <div
          className={`px-6 py-3 rounded-lg border font-bold text-lg ${getStatusBg(riskLevel)}`}
        >
          {getStatusLabel(riskLevel)}
        </div>
      </div>

      {/* Risk Scale */}
      <div className="mt-8 pt-8 border-t border-slate-800">
        <div className="flex justify-between text-xs text-slate-500 mb-2">
          <span>Safe (0-25)</span>
          <span>Caution (26-50)</span>
          <span>Warning (51-75)</span>
          <span>Danger (76-100)</span>
        </div>
        <div className="flex gap-1">
          <div className="flex-1 h-2 bg-green-500/30 rounded-l"></div>
          <div className="flex-1 h-2 bg-blue-500/30"></div>
          <div className="flex-1 h-2 bg-yellow-500/30"></div>
          <div className="flex-1 h-2 bg-red-500/30 rounded-r"></div>
        </div>
      </div>
    </div>
  );
}
