import { calculateRiskScore, type RiskFactors } from "../scoring";
import { type StructuredAI } from "../scoring";
import { type AnalysisResult } from "../mockData";

/**
 * Generate realistic mock data for Ethereum testing
 */
function generateMockAnalysis(address: string): AnalysisResult {
  // Use address hash to seed pseudo-random values for consistency
  const seed = address.charCodeAt(2) + address.charCodeAt(3);
  const rng = (min: number, max: number) => {
    return (
      Math.floor((((seed * 9301 + 49297) % 233280) / 233280) * (max - min)) +
      min
    );
  };

  // Generate risk factors
  const factors: RiskFactors = {
    tokenConcentration: rng(20, 95),
    liquidity: rng(5, 85),
    contractAge: rng(1, 180),
    transactionVelocity: rng(0, 8),
    holderDistribution: rng(10, 80),
  };

  const scoreResult = calculateRiskScore(factors);
  const {
    riskScore,
    flags,
    riskLevel,
    riskBreakdown,
    confidenceScore,
    aiAnalysis,
  } = scoreResult;

  // Generate wallet stats
  const totalTransactions = rng(50, 2000);
  const tokensHeld = rng(3, 45);
  const hoursSinceActivity = rng(1, 720);
  const lastActivity = formatTimeAgo(hoursSinceActivity);

  // Generate token stats
  const liquidity = `$${rng(1000, 500000).toLocaleString()}`;
  const topHolders = `${rng(5, 25)}%`;

  return {
    chain: "ethereum",
    address: address.toLowerCase(),
    riskScore,
    riskLevel,
    flags,
    riskBreakdown,
    contractAgeDays: factors.contractAge,
    confidenceScore,
    walletStats: {
      totalTransactions,
      tokensHeld,
      lastActivity,
    },
    tokenStats: {
      liquidity,
      topHolders,
      suspiciousFlags: flags.map(flagToLabel),
    },
    aiAnalysis,
  };
}

/**
 * Analyze Ethereum address
 */
export async function analyzeAddress(address: string): Promise<AnalysisResult> {
  // Simulate API processing delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Generate analysis (mock data for now)
  return generateMockAnalysis(address);
}

/**
 * Convert flag to human-readable label
 */
function flagToLabel(flag: string): string {
  const labels: Record<string, string> = {
    low_liquidity: "Low Liquidity",
    high_concentration: "High Holder Concentration",
    new_contract: "Very New Contract",
    high_transaction_velocity: "High Transaction Velocity",
  };
  return labels[flag] || flag;
}

/**
 * Format time ago string
 */
function formatTimeAgo(hours: number): string {
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}
