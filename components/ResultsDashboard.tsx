"use client";

import { RiskScoreCard } from "./RiskScoreCard";
import { WalletOverviewCard } from "./WalletOverviewCard";
import { TokenAnalysisCard } from "./TokenAnalysisCard";
import { AIExplanationCard } from "./AIExplanationCard";
import { RiskBreakdown } from "./RiskBreakdown";
import { RiskFlags } from "./RiskFlags";
import { OverviewHeader } from "./OverviewHeader";
import type { AnalysisResult } from "@/lib/mockData";

interface ResultsDashboardProps {
  data: AnalysisResult;
}

export function ResultsDashboard({ data }: ResultsDashboardProps) {
  // Provide fallback aiAnalysis if not present
  const aiAnalysis = data.aiAnalysis || {
    summary:
      "Analysis complete. Review the risk indicators above for detailed findings.",
    drivers: ["Data analysis in progress"],
    verdict: "Warning" as const,
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Section A: Overview Header */}
      <OverviewHeader
        address={data.address}
        riskScore={data.riskScore}
        riskLevel={data.riskLevel}
        chain={data.chain}
      />

      {/* Section B: Risk Breakdown */}
      {data.riskBreakdown && (
        <RiskBreakdown
          breakdown={data.riskBreakdown}
          contractAgeDays={data.contractAgeDays || 0}
          chain={data.chain}
        />
      )}

      {/* Section C: Risk Flags */}
      <RiskFlags flags={data.flags} />

      {/* Section D: Detailed Analysis Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <WalletOverviewCard
          totalTransactions={data.walletStats.totalTransactions}
          tokensHeld={data.walletStats.tokensHeld}
          lastActivity={data.walletStats.lastActivity}
        />
        <TokenAnalysisCard
          liquidity={data.tokenStats.liquidity}
          topHolders={data.tokenStats.topHolders}
          suspiciousFlags={data.tokenStats.suspiciousFlags}
        />
        <RiskScoreCard score={data.riskScore} />
      </div>

      {/* Section E: AI Analysis */}
      <AIExplanationCard
        analysis={aiAnalysis}
        confidenceScore={data.confidenceScore}
      />
    </div>
  );
}
