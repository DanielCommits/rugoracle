/**
 * Validates Ethereum addresses (wallet or contract)
 */
export function validateEthereumAddress(address: string): boolean {
  // Remove whitespace
  const trimmed = address.trim();
  
  // Check format: 0x followed by 40 hex characters (42 total)
  return /^0x[a-fA-F0-9]{40}$/.test(trimmed);
}

/**
 * Normalizes Ethereum address to checksum format
 */
export function normalizeAddress(address: string): string {
  return address.trim().toLowerCase();
}

/**
 * Formats address for display (short format: 0x1234...abcd)
 */
export function formatAddressShort(address: string): string {
  if (!validateEthereumAddress(address)) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}
