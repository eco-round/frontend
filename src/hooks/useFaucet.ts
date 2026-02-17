import { useState } from "react";
import { useAccount } from "wagmi";
import { USDC_ADDRESS } from "@/config/contracts";

const TENDERLY_RPC = process.env.NEXT_PUBLIC_RPC_URL!;

// Amount in USDC raw units (6 decimals)
// 10,000 USDC = 10000 * 10^6 = 10_000_000_000
const FAUCET_AMOUNT = "0x" + (10_000_000_000).toString(16);

export function useFaucet() {
  const { address } = useAccount();
  const [isMinting, setIsMinting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mint = async () => {
    if (!address) {
      setError("Connect your wallet first");
      return;
    }

    setIsMinting(true);
    setError(null);
    setSuccess(false);

    try {
      // Use Tenderly's custom RPC to set ERC20 balance
      const response = await fetch(TENDERLY_RPC, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "tenderly_setErc20Balance",
          params: [USDC_ADDRESS, address, FAUCET_AMOUNT],
          id: 1,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message || "RPC error");
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to mint USDC");
    } finally {
      setIsMinting(false);
    }
  };

  return { mint, isMinting, success, error };
}
