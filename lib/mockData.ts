import { calculateRiskScore, type RiskFactors } from './scoring';

import { type StructuredAI } from './scoring';

export interface AnalysisResult {
  address: string;
  riskScore: number;
  riskLevel: 'safe' | 'warning' | 'danger';
  flags: string[];
  riskBreakdown: {
    liquidityRisk: number;
    holderConcentrationRisk: number;
    transactionBehaviorRisk: number;
    contractAgeRisk: number;
  };
  confidenceScore: number;
  walletStats: {
    totalTransactions: number;
    tokensHeld: number;
    lastActivity: string;
  };
  tokenStats: {
    liquidity: string;
    topHolders: string;
    suspiciousFlags: string[];
  };
  aiAnalysis: StructuredAI;
}

/**
 * Generate realistic mock data for testing
 */
export function generateMockAnalysis(address: string): AnalysisResult {
  // Use address hash to seed pseudo-random values for consistency
  const seed = address.charCodeAt(2) + address.charCodeAt(3);
  const rng = (min: number, max: number) => {
    return Math.floor(((seed * 9301 + 49297) % 233280) / 233280 * (max - min)) + min;
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
  const { riskScore, flags, riskLevel, riskBreakdown, confidenceScore, aiAnalysis } = scoreResult;

  // Generate wallet stats
  const totalTransactions = rng(50, 2000);
  const tokensHeld = rng(3, 45);
  const hoursSinceActivity = rng(1, 720);
  const lastActivity = formatTimeAgo(hoursSinceActivity);

  // Generate token stats
  const liquidity = `$${rng(1000, 500000).toLocaleString()}`;
  const topHolders = `${rng(5, 25)}%`;

  return {
    address: address.toLowerCase(),
    riskScore,
    riskLevel,
    flags,
    riskBreakdown,
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
 * Format hours into human-readable time ago
 */
function formatTimeAgo(hours: number): string {
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
}

/**
 * Convert flag to human-readable label
 */
function flagToLabel(flag: string): string {
  const labels: Record<string, string> = {
    high_concentration: 'High Token Concentration',
    low_liquidity: 'Low Liquidity',
    new_contract: 'New Contract',
    high_transaction_velocity: 'Rapid Transactions',
    concentrated_holders: 'Concentrated Holders',
  };
  return labels[flag] || flag;
}


