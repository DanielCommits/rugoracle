import { NextRequest, NextResponse } from "next/server";
import { validateEthereumAddress } from "@/lib/validation";
import { analyzeAddress as analyzeEthereum } from "@/lib/chains/ethereum";
import { analyzeAddress as analyzeSolana } from "@/lib/chains/solana";

/**
 * Detect blockchain from address format
 */
function detectChain(address: string): "ethereum" | "solana" {
  // Ethereum addresses start with 0x and are 42 characters long
  if (address.startsWith("0x") && address.length === 42) {
    return "ethereum";
  }
  // Assume Solana for other formats (base58 encoded)
  return "solana";
}

/**
 * Validate address format based on chain
 */
function validateAddress(
  address: string,
  chain: "ethereum" | "solana",
): boolean {
  if (chain === "ethereum") {
    return validateEthereumAddress(address);
  }
  // For Solana, basic validation - should be base58 and reasonable length
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(address);
}

export async function POST(request: NextRequest) {
  try {
    const { address } = await request.json();

    // Validate input
    if (!address || typeof address !== "string") {
      return NextResponse.json(
        { error: "Address is required" },
        { status: 400 },
      );
    }

    // Detect chain and validate address
    const chain = detectChain(address);
    if (!validateAddress(address, chain)) {
      return NextResponse.json(
        { error: `Invalid ${chain} address format` },
        { status: 400 },
      );
    }

    // Route to appropriate analyzer
    const analysis =
      chain === "ethereum"
        ? await analyzeEthereum(address)
        : await analyzeSolana(address);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Analysis error:", error);
    return NextResponse.json(
      { error: "Failed to analyze address" },
      { status: 500 },
    );
  }
}
