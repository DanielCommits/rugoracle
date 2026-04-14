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

    // Calculate risk breakdown metrics
    const balanceRisk = calculateBalanceRisk(solBalance);
    const activityRisk = calculateActivityRisk(totalTransactions);
    const tokenRisk = calculateTokenRisk(tokensHeld);
    const transactionRisk = calculateTransactionRisk(recentTransactions.length);

    // Calculate overall risk score
    const riskScore =
      (balanceRisk + activityRisk + tokenRisk + transactionRisk) / 4;

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
    const aiAnalysis = generateSolanaAIExplanation(
      Math.round(riskScore),
      flags,
    );

    return {
      chain: "solana",
      address: address.toLowerCase(),
      riskScore: Math.round(riskScore),
      riskLevel,
      flags,
      riskBreakdown: {
        liquidityRisk: balanceRisk,
        holderConcentrationRisk: tokenRisk,
        transactionBehaviorRisk: transactionRisk,
        contractAgeRisk: activityRisk,
      },
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
 * Calculate balance risk (0-100)
 */
function calculateBalanceRisk(balance: number): number {
  if (balance < 0.01) return 100;
  if (balance < 0.1) return 80;
  if (balance < 0.5) return 50;
  if (balance < 2) return 25;
  return 10;
}

/**
 * Calculate activity risk (0-100)
 */
function calculateActivityRisk(totalTransactions: number): number {
  if (totalTransactions === 0) return 100;
  if (totalTransactions < 3) return 80;
  if (totalTransactions < 10) return 50;
  if (totalTransactions < 50) return 25;
  return 10;
}

/**
 * Calculate token holdings risk (0-100)
 */
function calculateTokenRisk(tokensHeld: number): number {
  if (tokensHeld === 0) return 30;
  if (tokensHeld < 5) return 20;
  if (tokensHeld > 100) return 70;
  if (tokensHeld > 50) return 50;
  if (tokensHeld > 20) return 35;
  return 15;
}

/**
 * Calculate recent transaction risk (0-100)
 */
function calculateTransactionRisk(recentTransactions: number): number {
  if (recentTransactions === 0) return 10;
  if (recentTransactions < 5) return 15;
  if (recentTransactions > 15) return 75;
  return 25;
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
