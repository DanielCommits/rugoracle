import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { type AnalysisResult } from "../mockData";
import { type StructuredAI } from "../scoring";

// Solana RPC endpoint
const SOLANA_RPC_URL = "https://api.mainnet-beta.solana.com";

/**
 * Analyze Solana address
 */
export async function analyzeAddress(address: string): Promise<AnalysisResult> {
  try {
    const connection = new Connection(SOLANA_RPC_URL, "confirmed");
    const publicKey = new PublicKey(address);

    // Fetch wallet data in parallel
    const [balance, recentTransactions, tokenAccounts] = await Promise.all([
      connection.getBalance(publicKey),
      connection.getSignaturesForAddress(publicKey, { limit: 20 }),
      connection.getParsedTokenAccountsByOwner(publicKey, {
        programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"), // SPL Token Program
      }),
    ]);

    // Process balance (convert lamports to SOL)
    const solBalance = balance / LAMPORTS_PER_SOL;

    // Process transactions
    const totalTransactions = recentTransactions.length;
    const lastActivity =
      recentTransactions.length > 0
        ? formatTimeAgo(Date.now() - recentTransactions[0].blockTime! * 1000)
        : "Never";

    // Process token holdings
    const tokensHeld = tokenAccounts.value.length;

    // Calculate risk score based on Solana-specific factors
    const riskScore = calculateSolanaRiskScore({
      balance: solBalance,
      totalTransactions,
      tokensHeld,
      recentTransactions: recentTransactions.length,
    });

    // Generate flags
    const flags = generateSolanaFlags({
      balance: solBalance,
      totalTransactions,
      tokensHeld,
      recentTransactions: recentTransactions.length,
    });

    // Determine risk level
    const riskLevel =
      riskScore < 30 ? "safe" : riskScore < 70 ? "warning" : "danger";

    // Generate AI explanation
    const aiAnalysis = generateSolanaAIExplanation(riskScore, flags);

    return {
      chain: "solana",
      address: address.toLowerCase(),
      riskScore,
      riskLevel,
      flags,
      confidenceScore: Math.min(95, 70 + Math.random() * 25), // Mock confidence
      walletStats: {
        totalTransactions,
        tokensHeld,
        lastActivity,
      },
      tokenStats: {
        suspiciousFlags: flags,
      },
      aiAnalysis,
    };
  } catch (error) {
    console.error("Solana analysis error:", error);
    throw new Error("Failed to analyze Solana address");
  }
}

/**
 * Calculate risk score for Solana wallet
 */
function calculateSolanaRiskScore(factors: {
  balance: number;
  totalTransactions: number;
  tokensHeld: number;
  recentTransactions: number;
}): number {
  let score = 0;

  // Low balance risk
  if (factors.balance < 0.1) score += 30;
  else if (factors.balance < 1) score += 15;

  // Low activity risk
  if (factors.totalTransactions < 5) score += 25;
  else if (factors.totalTransactions < 20) score += 10;

  // High token holdings (potential spam/scam interactions)
  if (factors.tokensHeld > 50) score += 20;
  else if (factors.tokensHeld > 20) score += 10;

  // Recent high activity (potential suspicious behavior)
  if (factors.recentTransactions > 15) score += 15;

  return Math.min(100, Math.max(0, score));
}

/**
 * Generate flags for Solana wallet
 */
function generateSolanaFlags(factors: {
  balance: number;
  totalTransactions: number;
  tokensHeld: number;
  recentTransactions: number;
}): string[] {
  const flags: string[] = [];

  if (factors.balance < 0.1) flags.push("very_low_balance");
  if (factors.totalTransactions < 5) flags.push("low_wallet_activity");
  if (factors.totalTransactions === 0) flags.push("new_wallet");
  if (factors.tokensHeld > 50) flags.push("high_token_holdings");
  if (factors.recentTransactions > 15)
    flags.push("suspicious_transaction_pattern");

  return flags;
}

/**
 * Generate AI explanation for Solana analysis
 */
function generateSolanaAIExplanation(
  riskScore: number,
  flags: string[],
): StructuredAI {
  const explanations: Record<string, string> = {
    very_low_balance:
      "Wallet has very low SOL balance, indicating limited financial activity.",
    low_wallet_activity:
      "Wallet shows minimal transaction history, suggesting it's either new or inactive.",
    new_wallet:
      "This appears to be a newly created wallet with no transaction history.",
    high_token_holdings:
      "Wallet holds many different tokens, which could indicate interactions with various projects.",
    suspicious_transaction_pattern:
      "Recent transaction activity is unusually high, warranting closer inspection.",
  };

  const drivers = flags.map((flag) => explanations[flag] || flag);

  let verdict: "Safe" | "Caution" | "Warning" | "Highly Risky";
  if (riskScore < 30) verdict = "Safe";
  else if (riskScore < 50) verdict = "Caution";
  else if (riskScore < 70) verdict = "Warning";
  else verdict = "Highly Risky";

  const summary = `This Solana wallet shows a risk score of ${riskScore}/100. ${drivers.length > 0 ? drivers[0] : "Analysis complete with no major red flags detected."}`;

  return {
    summary,
    drivers,
    verdict,
  };
}

/**
 * Format time ago string
 */
function formatTimeAgo(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return `${seconds}s ago`;
}
