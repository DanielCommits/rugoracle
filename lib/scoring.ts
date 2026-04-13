/**
 * Risk factors for scoring calculation
 */
export interface RiskFactors {
  tokenConcentration: number; // 0-100 (% in top holder)
  liquidity: number; // 0-100 (% of good liquidity)
  contractAge: number; // days old
  transactionVelocity: number; // 0-10 (transactions in last minute)
  holderDistribution: number; // 0-100 (concentration %)
}

export interface RiskBreakdown {
  liquidityRisk: number;
  holderConcentrationRisk: number;
  transactionBehaviorRisk: number;
  contractAgeRisk: number;
}

export interface StructuredAI {
  summary: string;
  drivers: string[];
  verdict: 'Safe' | 'Caution' | 'Warning' | 'Highly Risky';
}

export interface RiskScoreResult {
  riskScore: number;
  riskLevel: 'safe' | 'warning' | 'danger';
  flags: string[];
  riskBreakdown: RiskBreakdown;
  confidenceScore: number;
  aiAnalysis: StructuredAI;
}

/**
 * Calculate risk score based on multiple factors
 * Returns score 0-100 where 100 is highest risk
 */
export function calculateRiskScore(factors: RiskFactors): RiskScoreResult {
  let score = 0;
  const flags: string[] = [];

  // Calculate individual risk breakdowns
  let liquidityRisk = 0;
  let holderConcentrationRisk = 0;
  let transactionBehaviorRisk = 0;
  let contractAgeRisk = 0;

  // Liquidity Risk (max 25 points)
  if (factors.liquidity < 30) {
    liquidityRisk = 25;
    score += 25;
    flags.push('low_liquidity');
  } else if (factors.liquidity < 50) {
    liquidityRisk = 12;
    score += 12;
  } else {
    liquidityRisk = Math.max(0, 25 - (factors.liquidity / 100) * 25);
    score += liquidityRisk;
  }

  // Holder Concentration Risk (max 25 points)
  if (factors.tokenConcentration > 60) {
    holderConcentrationRisk = 25;
    score += 25;
    flags.push('high_concentration');
  } else if (factors.tokenConcentration > 40) {
    holderConcentrationRisk = 15;
    score += 15;
  } else {
    holderConcentrationRisk = Math.max(0, (factors.tokenConcentration / 100) * 25);
    score += holderConcentrationRisk;
  }

  // Transaction Behavior Risk (max 25 points)
  if (factors.transactionVelocity >= 5) {
    transactionBehaviorRisk = 25;
    score += 25;
    flags.push('high_transaction_velocity');
  } else if (factors.transactionVelocity >= 3) {
    transactionBehaviorRisk = 15;
    score += 15;
  } else {
    transactionBehaviorRisk = Math.max(0, (factors.transactionVelocity / 10) * 25);
    score += transactionBehaviorRisk;
  }

  // Contract Age Risk (max 25 points)
  if (factors.contractAge < 7) {
    contractAgeRisk = 25;
    score += 25;
    flags.push('new_contract');
  } else if (factors.contractAge < 30) {
    contractAgeRisk = 12;
    score += 12;
  } else {
    contractAgeRisk = Math.max(0, (100 - factors.contractAge) / 100 * 25);
    score += contractAgeRisk;
  }

  // Normalize to 0-100
  score = Math.max(0, Math.min(100, score / 4)); // Divide by 4 since we're counting max 25 per category

  // Calculate confidence score (based on data completeness)
  let confidenceScore = 85; // Base confidence
  if (factors.contractAge < 1) confidenceScore -= 10; // Very new contracts have less confidence
  if (factors.liquidity < 20) confidenceScore -= 5; // Very low liquidity reduces confidence
  confidenceScore = Math.max(60, Math.min(100, confidenceScore));

  // Determine risk level
  let riskLevel: 'safe' | 'warning' | 'danger';
  if (score >= 70) {
    riskLevel = 'danger';
  } else if (score >= 40) {
    riskLevel = 'warning';
  } else {
    riskLevel = 'safe';
  }

  // Generate structured AI analysis with error handling
  let aiAnalysis: StructuredAI;
  try {
    aiAnalysis = generateAIAnalysis(score, flags, factors);
  } catch (error) {
    console.error('[v0] Error generating AI analysis:', error);
    aiAnalysis = {
      summary: 'Unable to generate analysis at this time.',
      drivers: [],
      verdict: 'Warning',
    };
  }

  return {
    riskScore: Math.round(score),
    riskLevel,
    flags,
    riskBreakdown: {
      liquidityRisk: Math.round(liquidityRisk),
      holderConcentrationRisk: Math.round(holderConcentrationRisk),
      transactionBehaviorRisk: Math.round(transactionBehaviorRisk),
      contractAgeRisk: Math.round(contractAgeRisk),
    },
    confidenceScore: Math.round(confidenceScore),
    aiAnalysis,
  };
}

/**
 * Generate structured AI analysis
 */
function generateAIAnalysis(score: number, flags: string[], factors: RiskFactors): StructuredAI {
  let summary = '';
  let drivers: string[] = [];
  let verdict: 'Safe' | 'Caution' | 'Warning' | 'Highly Risky';

  if (score >= 70) {
    summary = 'This address shows significant warning signs and carries substantial investment risk.';
    verdict = 'Highly Risky';
  } else if (score >= 40) {
    summary = 'This address has some concerning indicators that warrant careful investigation before investing.';
    verdict = 'Warning';
  } else if (score >= 25) {
    summary = 'This address shows some caution flags but generally appears more legitimate than risky alternatives.';
    verdict = 'Caution';
  } else {
    summary = 'This address appears relatively safe with minimal red flags detected.';
    verdict = 'Safe';
  }

  // Build risk drivers
  if (flags.includes('high_concentration')) {
    drivers.push('High token concentration with whales holding majority of supply');
  }
  if (flags.includes('low_liquidity')) {
    drivers.push('Insufficient liquidity making tokens difficult to sell');
  }
  if (flags.includes('new_contract')) {
    drivers.push('Contract deployed very recently, increasing rug pull risk');
  }
  if (flags.includes('high_transaction_velocity')) {
    drivers.push('Unusual spike in transaction activity detected');
  }
  if (flags.includes('concentrated_holders')) {
    drivers.push('Token distribution heavily concentrated among few addresses');
  }

  if (drivers.length === 0) {
    drivers.push('No significant warning signals detected');
  }

  return {
    summary,
    drivers,
    verdict,
  };
}

/**
 * Get color for risk score
 */
export function getRiskColor(score: number): string {
  if (score >= 70) return 'text-red-400';
  if (score >= 40) return 'text-yellow-400';
  return 'text-green-400';
}

/**
 * Get background color for risk score
 */
export function getRiskBgColor(score: number): string {
  if (score >= 70) return 'bg-red-500/10 border-red-500/20';
  if (score >= 40) return 'bg-yellow-500/10 border-yellow-500/20';
  return 'bg-green-500/10 border-green-500/20';
}

/**
 * Get badge label for risk level
 */
export function getRiskLabel(score: number): string {
  if (score >= 70) return 'DANGER';
  if (score >= 40) return 'WARNING';
  return 'SAFE';
}
