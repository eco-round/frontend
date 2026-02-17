"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useReadContract } from "wagmi";
import { useMatch } from "@/hooks/useMatch";
import { useVaultData } from "@/hooks/useVaultData";
import { useUserPosition } from "@/hooks/useUserPosition";
import { FACTORY_ABI, FACTORY_ADDRESS } from "@/config/contracts";
import { formatUSDC, ZERO_ADDRESS } from "@/lib/utils";
import MatchDetail from "@/components/MatchDetail";
import PoolStats from "@/components/PoolStats";
import DepositForm from "@/components/DepositForm";
import ClaimButton from "@/components/ClaimButton";

export default function MatchPage() {
  const params = useParams();
  const matchId = parseInt(params.id as string);

  const { match, isLoading: isMatchLoading, error: matchError } = useMatch(matchId);

  // Read vault address from on-chain
  const { data: vaultAddressFromChain } = useReadContract({
    address: FACTORY_ADDRESS,
    abi: FACTORY_ABI,
    functionName: "getVault",
    args: match?.on_chain_match_id ? [BigInt(match.on_chain_match_id)] : undefined,
    query: {
      enabled: !!match && match.on_chain_match_id > 0,
    },
  });

  // Determine which vault address to use
  const vaultAddress =
    match?.on_chain_match_id && match.on_chain_match_id > 0 && vaultAddressFromChain
      ? (vaultAddressFromChain as string)
      : match?.vault_address || "";

  const isValidVault = vaultAddress && vaultAddress !== ZERO_ADDRESS;

  const {
    totalTeamA,
    totalTeamB,
    status,
    winner,
    yieldBalance,
    totalDeposits,
    isLoading: isVaultLoading,
    refetch: refetchVault,
  } = useVaultData(isValidVault ? (vaultAddress as `0x${string}`) : undefined);

  const {
    depositTeamA,
    depositTeamB,
    expectedPayout,
    hasClaimed,
    totalDeposit,
    isLoading: isPositionLoading,
    refetch: refetchPosition,
  } = useUserPosition(isValidVault ? (vaultAddress as `0x${string}`) : undefined);

  if (isMatchLoading) {
    return (
      <div className="min-h-screen bg-[#0F1923] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 relative">
            <div className="absolute inset-0 border-4 border-[#1A2634]"
                 style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
            <div className="absolute inset-0 border-4 border-[#FF4655] border-t-transparent animate-spin"
                 style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
          </div>
          <div className="text-[#ECE8E1] text-xl font-bold uppercase tracking-wider">Loading match...</div>
        </div>
      </div>
    );
  }

  if (matchError || !match) {
    return (
      <div className="min-h-screen bg-[#0F1923] flex items-center justify-center">
        <div
          className="bg-[#1A2634] p-12 text-center max-w-md"
          style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)' }}
        >
          <div className="text-[#FF4655] text-6xl font-black mb-4">404</div>
          <div className="text-[#ECE8E1] text-xl font-bold uppercase mb-6">Match not found</div>
          <Link
            href="/matches"
            className="inline-block bg-[#FF4655] hover:bg-[#FF5865] text-[#ECE8E1] font-bold px-6 py-3 uppercase tracking-wider transition-colors"
            style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
          >
            Back to Matches
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1923] py-8 px-4">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #00E6C3 0px, #00E6C3 1px, transparent 1px, transparent 60px)',
        }} />
      </div>

      <div className="max-w-7xl mx-auto space-y-6 relative">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-3 text-sm">
          <Link
            href="/matches"
            className="text-[#768079] hover:text-[#00E6C3] transition-colors uppercase tracking-wider font-semibold"
          >
            Matches
          </Link>
          <div className="w-1.5 h-1.5 bg-[#768079]" style={{ clipPath: 'polygon(50% 0, 100% 50%, 50% 100%, 0 50%)' }} />
          <span className="text-[#ECE8E1] uppercase tracking-wider font-semibold truncate max-w-md">
            {match.team_a_name} vs {match.team_b_name}
          </span>
        </div>

        {/* Enhanced Back Button */}
        <Link
          href="/matches"
          className="inline-flex items-center gap-3 px-5 py-3 bg-[#1A2634] hover:bg-[#223040] text-[#00E6C3] transition-all group"
          style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
        >
          <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="uppercase text-sm tracking-wider font-bold">Back</span>
        </Link>

        {/* Full-width Match Detail Header */}
        <div className="relative">
          <MatchDetail match={match} />
        </div>

        {/* Vault Not Deployed State */}
        {!isValidVault && (
          <div
            className="bg-[#1A2634] border-l-4 border-[#00E6C3] p-8 relative overflow-hidden"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)' }}
          >
            <div className="absolute top-0 right-0 w-32 h-32 opacity-5">
              <div className="w-full h-full border-8 border-[#00E6C3]"
                   style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
            </div>

            <div className="relative z-10 flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-6 h-6 text-[#00E6C3]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h3 className="text-[#ECE8E1] font-bold uppercase tracking-wider mb-1">
                  Vault Not Deployed
                </h3>
                <p className="text-[#768079] text-sm">
                  {match.on_chain_match_id === 0
                    ? "This match has not been deployed on-chain yet. Check back soon."
                    : "The vault for this match is being prepared. Please wait."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Two-column layout with enhanced visual separation */}
        {isValidVault && (
          <div className="grid lg:grid-cols-[1.2fr,1fr] gap-6">
            {/* Left Column: Pool Stats + User Position */}
            <div className="space-y-6">
              {isVaultLoading ? (
                <div
                  className="bg-[#1A2634] p-12 animate-pulse"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)' }}
                >
                  <div className="space-y-4">
                    <div className="h-4 bg-[#0F1923] w-1/3 rounded" />
                    <div className="h-24 bg-[#0F1923] rounded" />
                    <div className="h-4 bg-[#0F1923] w-1/2 rounded" />
                  </div>
                </div>
              ) : (
                <>
                  <PoolStats
                    totalTeamA={totalTeamA}
                    totalTeamB={totalTeamB}
                    teamAName={match.team_a_name}
                    teamBName={match.team_b_name}
                  />

                  {/* User Position - Enhanced Card */}
                  {totalDeposit > 0n && (
                    <div
                      className="bg-gradient-to-br from-[#1A2634] to-[#1A2634]/80 p-6 space-y-5 relative border border-[#00E6C3]/20"
                      style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)' }}
                    >
                      {/* Corner accent */}
                      <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-[#00E6C3]/30"
                           style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }} />

                      <div className="flex items-center gap-3">
                        <div className="w-1 h-6 bg-[#00E6C3]" />
                        <h3 className="text-lg font-black uppercase tracking-wider text-[#ECE8E1]">
                          Your Position
                        </h3>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div
                          className="bg-[#0F1923] p-5 border-l-2 border-[#00E6C3]"
                          style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)' }}
                        >
                          <div className="text-[#00E6C3] text-xs uppercase tracking-widest mb-2 font-bold">
                            {match.team_a_name}
                          </div>
                          <div className="text-[#ECE8E1] font-black text-2xl">
                            {formatUSDC(depositTeamA)}
                          </div>
                        </div>

                        <div
                          className="bg-[#0F1923] p-5 border-l-2 border-[#FF4655]"
                          style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)' }}
                        >
                          <div className="text-[#FF4655] text-xs uppercase tracking-widest mb-2 font-bold">
                            {match.team_b_name}
                          </div>
                          <div className="text-[#ECE8E1] font-black text-2xl">
                            {formatUSDC(depositTeamB)}
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#768079]/20 space-y-3">
                        <div className="flex justify-between items-end">
                          <div className="text-[#768079] text-xs uppercase tracking-widest font-bold">
                            Total Deposit
                          </div>
                          <div className="text-[#ECE8E1] text-2xl font-black">
                            {formatUSDC(totalDeposit)}
                          </div>
                        </div>

                        {expectedPayout > 0n && (
                          <div className="flex justify-between items-end pt-3 border-t border-[#768079]/10">
                            <div className="text-[#768079] text-xs uppercase tracking-widest font-bold">
                              Expected Payout
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-[#00E6C3] text-2xl font-black">
                                {formatUSDC(expectedPayout)}
                              </div>
                              {hasClaimed && (
                                <div
                                  className="bg-[#00E6C3]/20 text-[#00E6C3] px-3 py-1 text-xs font-bold uppercase tracking-wider"
                                  style={{ clipPath: 'polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)' }}
                                >
                                  Claimed
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Right Column: Deposit Form or Claim Button - Sticky */}
            <div className="lg:sticky lg:top-8 h-fit">
              {isVaultLoading ? (
                <div
                  className="bg-[#1A2634] p-12 animate-pulse"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)' }}
                >
                  <div className="space-y-4">
                    <div className="h-4 bg-[#0F1923] w-1/2 rounded" />
                    <div className="h-12 bg-[#0F1923] rounded" />
                    <div className="h-12 bg-[#0F1923] rounded" />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <DepositForm
                    vaultAddress={vaultAddress}
                    teamAName={match.team_a_name}
                    teamBName={match.team_b_name}
                    status={status}
                  />

                  <ClaimButton
                    vaultAddress={vaultAddress}
                    status={status}
                    winner={winner}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
