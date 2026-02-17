import { useReadContracts, useAccount } from "wagmi";
import { VAULT_ABI } from "@/config/contracts";
import type { Address } from "viem";

interface UseUserPositionReturn {
  depositTeamA: bigint;
  depositTeamB: bigint;
  expectedPayout: bigint;
  hasClaimed: boolean;
  totalDeposit: bigint;
  isLoading: boolean;
  refetch: () => void;
}

export function useUserPosition(
  vaultAddress?: string,
  userAddress?: string
): UseUserPositionReturn {
  const { address: connectedAddress } = useAccount();
  const effectiveUserAddress = userAddress || connectedAddress;

  const isValidVault =
    !!vaultAddress && vaultAddress !== "0x0000000000000000000000000000000000000000";
  const isValidUser = !!effectiveUserAddress;
  const shouldFetch = isValidVault && isValidUser;

  const { data, isLoading, refetch } = useReadContracts({
    contracts: shouldFetch
      ? [
          {
            address: vaultAddress as Address,
            abi: VAULT_ABI,
            functionName: "userDeposits",
            args: [effectiveUserAddress as Address, 1],
          },
          {
            address: vaultAddress as Address,
            abi: VAULT_ABI,
            functionName: "userDeposits",
            args: [effectiveUserAddress as Address, 2],
          },
          {
            address: vaultAddress as Address,
            abi: VAULT_ABI,
            functionName: "getExpectedPayout",
            args: [effectiveUserAddress as Address],
          },
          {
            address: vaultAddress as Address,
            abi: VAULT_ABI,
            functionName: "hasClaimed",
            args: [effectiveUserAddress as Address],
          },
          {
            address: vaultAddress as Address,
            abi: VAULT_ABI,
            functionName: "getUserTotalDeposit",
            args: [effectiveUserAddress as Address],
          },
        ]
      : [],
    query: {
      enabled: shouldFetch,
    },
  });

  return {
    depositTeamA: (data?.[0]?.result as bigint) || 0n,
    depositTeamB: (data?.[1]?.result as bigint) || 0n,
    expectedPayout: (data?.[2]?.result as bigint) || 0n,
    hasClaimed: (data?.[3]?.result as boolean) || false,
    totalDeposit: (data?.[4]?.result as bigint) || 0n,
    isLoading,
    refetch,
  };
}
