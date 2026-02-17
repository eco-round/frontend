"use client";

import { useAccount, useReadContract } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useFaucet } from "@/hooks/useFaucet";
import { ERC20_ABI, USDC_ADDRESS } from "@/config/contracts";
import { formatUSDC } from "@/lib/utils";

export default function FaucetPage() {
  const { address, isConnected } = useAccount();
  const { mint, isMinting, success, error } = useFaucet();

  const { data: balance, refetch } = useReadContract({
    address: USDC_ADDRESS,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });

  const handleMint = async () => {
    await mint();
    setTimeout(() => refetch(), 1500);
  };

  return (
    <div className="min-h-screen px-4 py-16">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4">
            <span className="text-[#00E6C3]">USDC</span>{" "}
            <span className="text-[#ECE8E1]">FAUCET</span>
          </h1>
          <p className="text-[#768079] text-lg">
            Get test USDC to start making predictions
          </p>
        </div>

        {/* Faucet Card */}
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00E6C3]/20 via-transparent to-[#FF4655]/20 blur-xl opacity-50" />

          <div className="relative bg-[#1A2634] border border-[#768079]/20 p-8 space-y-8"
               style={{ clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))" }}>

            {/* USDC Icon + Amount */}
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#00E6C3]/10 border-2 border-[#00E6C3]/30 mb-2">
                <span className="text-3xl font-black text-[#00E6C3]">$</span>
              </div>
              <div className="text-[#ECE8E1]">
                <span className="text-5xl font-black">10,000</span>
                <span className="text-xl font-bold text-[#768079] ml-2">USDC</span>
              </div>
              <p className="text-[#768079] text-sm">per request</p>
            </div>

            {/* Current Balance */}
            {isConnected && balance !== undefined && (
              <div className="bg-[#0F1923] p-4 text-center"
                   style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}>
                <p className="text-[#768079] text-xs uppercase tracking-wider mb-1">Current Balance</p>
                <p className="text-2xl font-bold text-[#ECE8E1]">
                  {formatUSDC(balance as bigint)} <span className="text-sm text-[#768079]">USDC</span>
                </p>
              </div>
            )}

            {/* Action */}
            {!isConnected ? (
              <div className="flex flex-col items-center gap-4">
                <p className="text-[#768079] text-sm">Connect your wallet to receive test USDC</p>
                <ConnectButton />
              </div>
            ) : (
              <button
                onClick={handleMint}
                disabled={isMinting}
                className="w-full py-4 font-bold uppercase tracking-wider text-lg transition-all duration-200
                           disabled:opacity-50 disabled:cursor-not-allowed
                           bg-gradient-to-r from-[#00E6C3] to-[#00BFA5] text-[#0F1923]
                           hover:from-[#00FFD5] hover:to-[#00E6C3]"
                style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}
              >
                {isMinting ? (
                  <span className="flex items-center justify-center gap-3">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Minting...
                  </span>
                ) : (
                  "Mint 10,000 USDC"
                )}
              </button>
            )}

            {/* Status Messages */}
            {success && (
              <div className="bg-[#00E6C3]/10 border border-[#00E6C3]/30 p-4 text-center"
                   style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}>
                <p className="text-[#00E6C3] font-semibold">
                  10,000 USDC minted successfully!
                </p>
              </div>
            )}

            {error && (
              <div className="bg-[#FF4655]/10 border border-[#FF4655]/30 p-4 text-center"
                   style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}>
                <p className="text-[#FF4655] font-semibold">{error}</p>
              </div>
            )}

            {/* Info */}
            <div className="text-center space-y-1">
              <p className="text-[#768079] text-xs">
                This faucet works on the Tenderly Base fork testnet only.
              </p>
              <p className="text-[#768079] text-xs">
                Tokens have no real value.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
