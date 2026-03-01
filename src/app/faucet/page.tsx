"use client";

import { useAccount, useReadContract } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useFaucet } from "@/hooks/useFaucet";
import { useEthFaucet } from "@/hooks/useEthFaucet";
import { ERC20_ABI, USDC_ADDRESS } from "@/config/contracts";
import { formatUSDC } from "@/lib/utils";
import { formatEther } from "viem";

function Spinner() {
  return (
    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

export default function FaucetPage() {
  const { address, isConnected } = useAccount();

  // USDC faucet
  const { mint: mintUsdc, isMinting: isMintingUsdc, success: usdcSuccess, error: usdcError } = useFaucet();
  const { data: usdcBalance, refetch: refetchUsdc } = useReadContract({
    address: USDC_ADDRESS,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: !!address },
  });
  const handleMintUsdc = async () => {
    await mintUsdc();
    setTimeout(() => refetchUsdc(), 1500);
  };

  // ETH faucet
  const { mint: mintEth, isMinting: isMintingEth, success: ethSuccess, error: ethError, balance: ethBalance } = useEthFaucet();

  return (
    <div className="min-h-screen px-4 py-16">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-4">
            <span className="text-[#ECE8E1]">TESTNET</span>{" "}
            <span className="text-[#00E6C3]">FAUCET</span>
          </h1>
          <p className="text-[#768079] text-lg">
            Get test tokens for the Tenderly Base fork
          </p>
        </div>

        {!isConnected && (
          <div className="flex flex-col items-center gap-4 mb-10">
            <p className="text-[#768079] text-sm">Connect your wallet to receive tokens</p>
            <ConnectButton />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* USDC Card */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00E6C3]/20 via-transparent to-transparent blur-xl opacity-50" />
            <div
              className="relative bg-[#1A2634] border border-[#768079]/20 p-8 space-y-6"
              style={{ clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))" }}
            >
              {/* Icon + Amount */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#00E6C3]/10 border-2 border-[#00E6C3]/30 mb-1">
                  <span className="text-2xl font-black text-[#00E6C3]">$</span>
                </div>
                <div className="text-[#ECE8E1]">
                  <span className="text-4xl font-black">10,000</span>
                  <span className="text-lg font-bold text-[#768079] ml-2">USDC</span>
                </div>
                <p className="text-[#768079] text-sm">per request</p>
              </div>

              {/* Balance */}
              {isConnected && usdcBalance !== undefined && (
                <div
                  className="bg-[#0F1923] p-3 text-center"
                  style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
                >
                  <p className="text-[#768079] text-xs uppercase tracking-wider mb-1">Balance</p>
                  <p className="text-xl font-bold text-[#ECE8E1]">
                    {formatUSDC(usdcBalance as bigint)}{" "}
                    <span className="text-sm text-[#768079]">USDC</span>
                  </p>
                </div>
              )}

              {/* Button */}
              {isConnected && (
                <button
                  onClick={handleMintUsdc}
                  disabled={isMintingUsdc}
                  className="w-full py-4 font-bold uppercase tracking-wider text-base transition-all duration-200
                             disabled:opacity-50 disabled:cursor-not-allowed
                             bg-gradient-to-r from-[#00E6C3] to-[#00BFA5] text-[#0F1923]
                             hover:from-[#00FFD5] hover:to-[#00E6C3]"
                  style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}
                >
                  {isMintingUsdc ? (
                    <span className="flex items-center justify-center gap-3">
                      <Spinner /> Minting...
                    </span>
                  ) : (
                    "Mint 10,000 USDC"
                  )}
                </button>
              )}

              {usdcSuccess && (
                <div
                  className="bg-[#00E6C3]/10 border border-[#00E6C3]/30 p-3 text-center"
                  style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
                >
                  <p className="text-[#00E6C3] font-semibold text-sm">10,000 USDC minted!</p>
                </div>
              )}
              {usdcError && (
                <div
                  className="bg-[#FF4655]/10 border border-[#FF4655]/30 p-3 text-center"
                  style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
                >
                  <p className="text-[#FF4655] font-semibold text-sm">{usdcError}</p>
                </div>
              )}
            </div>
          </div>

          {/* ETH Card */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-transparent to-[#FF4655]/20 blur-xl opacity-50" />
            <div
              className="relative bg-[#1A2634] border border-[#768079]/20 p-8 space-y-6"
              style={{ clipPath: "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))" }}
            >
              {/* Icon + Amount */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#FF4655]/10 border-2 border-[#FF4655]/30 mb-1">
                  <span className="text-2xl font-black text-[#FF4655]">Ξ</span>
                </div>
                <div className="text-[#ECE8E1]">
                  <span className="text-4xl font-black">1</span>
                  <span className="text-lg font-bold text-[#768079] ml-2">ETH</span>
                </div>
                <p className="text-[#768079] text-sm">per request</p>
              </div>

              {/* Balance */}
              {isConnected && ethBalance !== undefined && (
                <div
                  className="bg-[#0F1923] p-3 text-center"
                  style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
                >
                  <p className="text-[#768079] text-xs uppercase tracking-wider mb-1">Balance</p>
                  <p className="text-xl font-bold text-[#ECE8E1]">
                    {parseFloat(formatEther(ethBalance.value)).toFixed(4)}{" "}
                    <span className="text-sm text-[#768079]">ETH</span>
                  </p>
                </div>
              )}

              {/* Button */}
              {isConnected && (
                <button
                  onClick={mintEth}
                  disabled={isMintingEth}
                  className="w-full py-4 font-bold uppercase tracking-wider text-base transition-all duration-200
                             disabled:opacity-50 disabled:cursor-not-allowed
                             bg-gradient-to-r from-[#FF4655] to-[#CC3344] text-white
                             hover:from-[#FF6070] hover:to-[#FF4655]"
                  style={{ clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))" }}
                >
                  {isMintingEth ? (
                    <span className="flex items-center justify-center gap-3">
                      <Spinner /> Minting...
                    </span>
                  ) : (
                    "Mint 1 ETH"
                  )}
                </button>
              )}

              {ethSuccess && (
                <div
                  className="bg-[#00E6C3]/10 border border-[#00E6C3]/30 p-3 text-center"
                  style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
                >
                  <p className="text-[#00E6C3] font-semibold text-sm">1 ETH minted!</p>
                </div>
              )}
              {ethError && (
                <div
                  className="bg-[#FF4655]/10 border border-[#FF4655]/30 p-3 text-center"
                  style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
                >
                  <p className="text-[#FF4655] font-semibold text-sm">{ethError}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="text-center mt-8 space-y-1">
          <p className="text-[#768079] text-xs">
            Tenderly Base fork only · Tokens have no real value
          </p>
        </div>
      </div>
    </div>
  );
}
