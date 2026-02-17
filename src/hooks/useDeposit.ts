import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { USDC_ADDRESS, ERC20_ABI, VAULT_ABI } from "@/config/contracts";
import type { Address } from "viem";

interface UseDepositReturn {
  approve: (amount: bigint) => void;
  deposit: (team: number, amount: bigint) => void;
  isApproving: boolean;
  isDepositing: boolean;
  approveHash: Address | undefined;
  depositHash: Address | undefined;
  isApprovePending: boolean;
  isApproveConfirming: boolean;
  isApproveConfirmed: boolean;
  isDepositPending: boolean;
  isDepositConfirming: boolean;
  isDepositConfirmed: boolean;
}

export function useDeposit(vaultAddress: string): UseDepositReturn {
  const {
    data: approveHash,
    isPending: isApprovePending,
    writeContract: writeApprove,
  } = useWriteContract();

  const {
    data: depositHash,
    isPending: isDepositPending,
    writeContract: writeDeposit,
  } = useWriteContract();

  const { isLoading: isApproveConfirming, isSuccess: isApproveConfirmed } =
    useWaitForTransactionReceipt({
      hash: approveHash,
    });

  const { isLoading: isDepositConfirming, isSuccess: isDepositConfirmed } =
    useWaitForTransactionReceipt({
      hash: depositHash,
    });

  const approve = (amount: bigint) => {
    writeApprove({
      address: USDC_ADDRESS,
      abi: ERC20_ABI,
      functionName: "approve",
      args: [vaultAddress as Address, amount],
    });
  };

  const deposit = (team: number, amount: bigint) => {
    writeDeposit({
      address: vaultAddress as Address,
      abi: VAULT_ABI,
      functionName: "deposit",
      args: [team, amount],
    });
  };

  return {
    approve,
    deposit,
    isApproving: isApprovePending || isApproveConfirming,
    isDepositing: isDepositPending || isDepositConfirming,
    approveHash,
    depositHash,
    isApprovePending,
    isApproveConfirming,
    isApproveConfirmed,
    isDepositPending,
    isDepositConfirming,
    isDepositConfirmed,
  };
}
