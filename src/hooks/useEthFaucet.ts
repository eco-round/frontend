import { useState } from "react";
import { useAccount, useBalance } from "wagmi";

const TENDERLY_RPC = process.env.NEXT_PUBLIC_RPC_URL!;

// 1 ETH in wei hex
const ETH_AMOUNT = "0x" + BigInt("1000000000000000000").toString(16);

export function useEthFaucet() {
  const { address } = useAccount();
  const [isMinting, setIsMinting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { data: balance, refetch } = useBalance({
    address,
    query: { enabled: !!address },
  });

  const mint = async () => {
    if (!address) {
      setError("Connect your wallet first");
      return;
    }

    setIsMinting(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await fetch(TENDERLY_RPC, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "tenderly_addBalance",
          params: [[address], ETH_AMOUNT],
          id: 1,
        }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error.message || "RPC error");
      }

      setSuccess(true);
      setTimeout(() => refetch(), 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to mint ETH");
    } finally {
      setIsMinting(false);
    }
  };

  return { mint, isMinting, success, error, balance };
}
