import { useReadContracts } from "wagmi";
import type { Address } from "viem";
import type { ApiMatch } from "@/config/api";

// Slim ABI for the single read we need (avoids `as const` issue on the full VAULT_ABI)
const STATUS_ABI = [
  {
    type: "function" as const,
    name: "status",
    stateMutability: "view" as const,
    inputs: [],
    outputs: [{ type: "uint8", name: "" }],
  },
] as const;

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

/**
 * Reads on-chain `status()` for every match that has a vault address.
 * Uses wagmi multicall so this is a single RPC round-trip.
 * On-chain enum: 0=Open, 1=Locked, 2=Resolved
 */
export function useAllVaultStatuses(matches: ApiMatch[]) {
  const validMatches = matches.filter(
    (m) => m.vault_address && m.vault_address !== ZERO_ADDRESS
  );

  const { data, isLoading } = useReadContracts({
    contracts: validMatches.map((m) => ({
      address: m.vault_address as Address,
      abi: STATUS_ABI,
      functionName: "status" as const,
    })),
    query: {
      enabled: validMatches.length > 0,
      // Refresh every 15 seconds to catch CRE workflow lock/resolve TXes
      refetchInterval: 15_000,
    },
  });

  // Build a map: matchId → on-chain status number (0 | 1 | 2)
  const chainStatuses: Record<number, number> = {};
  if (data) {
    validMatches.forEach((m, i) => {
      const result = data[i];
      if (result && result.status === "success") {
        chainStatuses[m.id] = result.result as number;
      }
    });
  }

  /** Returns effective display status string (prefers on-chain) */
  function getEffectiveStatus(match: ApiMatch): "open" | "locked" | "resolved" {
    const cs = chainStatuses[match.id];
    if (cs === 1) return "locked";
    if (cs === 2) return "resolved";
    if (cs === 0) return "open";
    // Fall back to API status
    if (match.status === "finished") return "resolved";
    if (match.status === "locked") return "locked";
    return "open";
  }

  return { chainStatuses, getEffectiveStatus, isLoading };
}
