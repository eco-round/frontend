"use client";

import { useAccount } from "wagmi";
import { useClaim } from "@/hooks/useClaim";
import { useUserPosition } from "@/hooks/useUserPosition";
import { formatUSDC } from "@/lib/utils";

interface ClaimButtonProps {
  vaultAddress: string;
  status: number;
  winner: number;
}

export default function ClaimButton({
  vaultAddress,
  status,
  winner,
}: ClaimButtonProps) {
  const { address, isConnected } = useAccount();
  const { claim, isClaiming, claimHash, isConfirming, isConfirmed } = useClaim(
    vaultAddress as `0x${string}`
  );
  const {
    depositTeamA,
    depositTeamB,
    expectedPayout,
    hasClaimed,
    totalDeposit,
    isLoading,
  } = useUserPosition(vaultAddress as `0x${string}`);

  // Only show when status is Resolved (2)
  if (status !== 2) {
    return null;
  }

  if (!isConnected) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="bg-[#1A2634] clip-corner-lg p-6 border border-[#768079]/20">
        <p className="text-[#768079] text-center font-bold uppercase tracking-wider animate-pulse">
          Loading position...
        </p>
      </div>
    );
  }

  // No deposits
  if (totalDeposit === 0n) {
    return (
      <div className="bg-[#1A2634] clip-corner-lg p-6 border border-[#768079]/30">
        <p className="text-[#768079] text-center font-bold uppercase tracking-wider">
          No deposits
        </p>
      </div>
    );
  }

  // Already claimed - celebratory display
  if (hasClaimed) {
    return (
      <div className="bg-[#1A2634] clip-corner-lg p-8 space-y-6 border-2 border-green-500/30 relative overflow-hidden">
        {/* Celebration glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-green-500/5 pointer-events-none" />

        <div className="text-center relative z-10">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500/20 via-green-500/30 to-green-500/20 border-2 border-green-500
                          clip-corner px-6 py-3 shadow-[0_0_25px_rgba(34,197,94,0.4)]">
            {/* Checkmark icon */}
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-green-500 font-black uppercase tracking-widest text-lg">
              CLAIMED
            </span>
          </div>
        </div>

        <div className="text-center relative z-10">
          <div className="text-[#768079] text-xs uppercase tracking-widest font-bold mb-3">
            Your Payout
          </div>
          <div className="text-[#ECE8E1] text-5xl font-black mb-2 drop-shadow-[0_0_10px_rgba(236,232,225,0.3)]">
            {formatUSDC(expectedPayout)}
          </div>
          <div className="text-green-500 text-sm font-bold uppercase tracking-wider">
            USDC
          </div>
        </div>
      </div>
    );
  }

  const handleClaim = async () => {
    await claim();
  };

  // Claimable state - exciting display
  return (
    <div className="bg-[#1A2634] clip-corner-lg p-8 space-y-6 border-2 border-[#00E6C3]/30 relative overflow-hidden">
      {/* Exciting glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00E6C3]/10 via-transparent to-[#FF4655]/5 pointer-events-none" />

      <div className="text-center relative z-10">
        <div className="text-[#00E6C3] text-xs uppercase tracking-widest font-bold mb-3 flex items-center justify-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E6C3] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E6C3]"></span>
          </span>
          Expected Payout
        </div>
        <div className="text-[#ECE8E1] text-6xl font-black mb-2 drop-shadow-[0_0_15px_rgba(0,230,195,0.4)]">
          {formatUSDC(expectedPayout)}
        </div>
        <div className="text-[#00E6C3] text-sm font-bold uppercase tracking-wider">
          USDC
        </div>
      </div>

      <button
        onClick={handleClaim}
        disabled={isClaiming || isConfirming}
        className="relative w-full py-5 px-6 clip-corner font-black uppercase tracking-widest text-xl
                   bg-gradient-to-r from-[#00E6C3] to-[#00E6C3]/80 text-[#0F1923]
                   border-2 border-[#00E6C3]
                   hover:shadow-[0_0_30px_rgba(0,230,195,0.7)] hover:scale-[1.03]
                   disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:scale-100
                   transition-all duration-200 overflow-hidden z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
        <span className="relative z-10">
          {isClaiming || isConfirming ? "Claiming..." : "Claim Winnings"}
        </span>
      </button>

      {isConfirmed && (
        <div className="text-center text-green-500 text-sm font-black uppercase tracking-wider bg-green-500/10 clip-corner-sm py-2 border border-green-500/30 relative z-10">
          Claim successful!
        </div>
      )}

      {claimHash && (
        <div className="bg-[#00E6C3]/10 border-l-2 border-[#00E6C3] clip-corner-sm p-3 relative z-10">
          <div className="text-[#00E6C3] text-xs font-bold uppercase tracking-wider mb-1">
            Claim Transaction
          </div>
          <div className="text-[#768079] text-xs break-all font-mono">
            {claimHash}
          </div>
        </div>
      )}
    </div>
  );
}
