import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { VAULT_ABI } from "@/config/contracts";
import type { Address } from "viem";

interface UseClaimReturn {
  claim: () => void;
  isClaiming: boolean;
  claimHash: Address | undefined;
  isConfirming: boolean;
  isConfirmed: boolean;
}

export function useClaim(vaultAddress: string): UseClaimReturn {
  const {
    data: claimHash,
    isPending,
    writeContract,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: claimHash,
    });

  const claim = () => {
    writeContract({
      address: vaultAddress as Address,
      abi: VAULT_ABI,
      functionName: "claim",
    });
  };

  return {
    claim,
    isClaiming: isPending || isConfirming,
    claimHash,
    isConfirming,
    isConfirmed,
  };
}
