import { useReadContracts } from "wagmi";
import { VAULT_ABI } from "@/config/contracts";
import type { Address } from "viem";

interface UseVaultDataReturn {
  totalTeamA: bigint;
  totalTeamB: bigint;
  status: number;
  winner: number;
  yieldBalance: bigint;
  totalDeposits: bigint;
  isLoading: boolean;
  refetch: () => void;
}

export function useVaultData(vaultAddress?: string): UseVaultDataReturn {
  const isValidAddress = !!vaultAddress && vaultAddress !== "0x0000000000000000000000000000000000000000";

  const { data, isLoading, refetch } = useReadContracts({
    contracts: isValidAddress
      ? [
          {
            address: vaultAddress as Address,
            abi: VAULT_ABI,
            functionName: "totalTeamA",
          },
          {
            address: vaultAddress as Address,
            abi: VAULT_ABI,
            functionName: "totalTeamB",
          },
          {
            address: vaultAddress as Address,
            abi: VAULT_ABI,
            functionName: "status",
          },
          {
            address: vaultAddress as Address,
            abi: VAULT_ABI,
            functionName: "winner",
          },
          {
            address: vaultAddress as Address,
            abi: VAULT_ABI,
            functionName: "getYieldBalance",
          },
          {
            address: vaultAddress as Address,
            abi: VAULT_ABI,
            functionName: "getTotalDeposits",
          },
        ]
      : [],
    query: {
      enabled: isValidAddress,
    },
  });

  return {
    totalTeamA: (data?.[0]?.result as bigint) || 0n,
    totalTeamB: (data?.[1]?.result as bigint) || 0n,
    status: (data?.[2]?.result as number) || 0,
    winner: (data?.[3]?.result as number) || 0,
    yieldBalance: (data?.[4]?.result as bigint) || 0n,
    totalDeposits: (data?.[5]?.result as bigint) || 0n,
    isLoading,
    refetch,
  };
}
