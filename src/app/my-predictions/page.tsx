"use client";

import { useMatches } from "@/hooks/useMatches";
import { useAccount } from "wagmi";
import { useReadContracts } from "wagmi";
import { VAULT_ABI } from "@/config/contracts";
import { ApiMatch } from "@/config/api";
import {
  formatUSDC,
  formatDate,
  getStatusLabel,
  getOnChainStatusLabel,
  getStatusColor,
  getWinnerLabel,
  ZERO_ADDRESS,
} from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";
import Link from "next/link";
import { useMemo } from "react";

interface UserPrediction {
  match: ApiMatch;
  vaultAddress: `0x${string}`;
  teamADeposit: bigint;
  teamBDeposit: bigint;
  onChainStatus: number;
  winner: number;
  expectedPayout: bigint;
  hasClaimed: boolean;
}

export default function MyPredictionsPage() {
  const { address, isConnected } = useAccount();
  const { matches, isLoading: isLoadingMatches } = useMatches();

  // Filter matches that have valid vault addresses
  const matchesWithVaults = useMemo(() => {
    if (!matches) return [];
    return matches.filter(
      (m) =>
        m.vault_address &&
        m.vault_address !== "" &&
        m.vault_address !== ZERO_ADDRESS
    );
  }, [matches]);

  // Build dynamic contract reads for all vaults
  const contractReads = useMemo(() => {
    if (!address || matchesWithVaults.length === 0) return [];

    const reads = [];
    for (const match of matchesWithVaults) {
      const vaultAddress = match.vault_address as `0x${string}`;

      reads.push(
        {
          address: vaultAddress,
          abi: VAULT_ABI,
          functionName: "userDeposits",
          args: [address, 1],
        },
        {
          address: vaultAddress,
          abi: VAULT_ABI,
          functionName: "userDeposits",
          args: [address, 2],
        },
        {
          address: vaultAddress,
          abi: VAULT_ABI,
          functionName: "status",
        },
        {
          address: vaultAddress,
          abi: VAULT_ABI,
          functionName: "winner",
        },
        {
          address: vaultAddress,
          abi: VAULT_ABI,
          functionName: "getExpectedPayout",
          args: [address],
        },
        {
          address: vaultAddress,
          abi: VAULT_ABI,
          functionName: "hasClaimed",
          args: [address],
        }
      );
    }
    return reads;
  }, [address, matchesWithVaults]);

  const { data: contractData, isLoading: isLoadingContracts } =
    useReadContracts({
      contracts: contractReads,
    });

  // Parse contract data into user predictions
  const userPredictions = useMemo(() => {
    if (!contractData || contractData.length === 0) return [];

    const predictions: UserPrediction[] = [];
    const readsPerMatch = 6;

    matchesWithVaults.forEach((match, index) => {
      const baseIndex = index * readsPerMatch;
      const teamADeposit = (contractData[baseIndex]?.result as bigint) || 0n;
      const teamBDeposit = (contractData[baseIndex + 1]?.result as bigint) || 0n;
      const onChainStatus = (contractData[baseIndex + 2]?.result as number) || 0;
      const winner = (contractData[baseIndex + 3]?.result as number) || 0;
      const expectedPayout = (contractData[baseIndex + 4]?.result as bigint) || 0n;
      const hasClaimed = (contractData[baseIndex + 5]?.result as boolean) || false;

      // Only include if user has deposits
      if (teamADeposit > 0n || teamBDeposit > 0n) {
        predictions.push({
          match,
          vaultAddress: match.vault_address as `0x${string}`,
          teamADeposit,
          teamBDeposit,
          onChainStatus,
          winner,
          expectedPayout,
          hasClaimed,
        });
      }
    });

    return predictions;
  }, [contractData, matchesWithVaults]);

  // Calculate summary stats
  const summaryStats = useMemo(() => {
    const totalDeposited = userPredictions.reduce(
      (sum, p) => sum + p.teamADeposit + p.teamBDeposit,
      0n
    );
    const totalClaimable = userPredictions
      .filter(p => p.onChainStatus === 2 && !p.hasClaimed)
      .reduce((sum, p) => sum + p.expectedPayout, 0n);
    const activePredictions = userPredictions.filter(p => p.onChainStatus !== 2).length;
    const resolvedCount = userPredictions.filter(p => p.onChainStatus === 2).length;

    return { totalDeposited, totalClaimable, activePredictions, resolvedCount };
  }, [userPredictions]);

  const isLoading = isLoadingMatches || isLoadingContracts;

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-[#0F1923] px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12 relative">
            <div className="flex items-end gap-6">
              <div>
                <h1 className="text-5xl font-black uppercase tracking-tight mb-3 relative inline-block">
                  MY <span className="text-[#FF4655]">PREDICTIONS</span>
                  <div className="absolute -right-3 -top-2 w-2 h-2 bg-[#00E6C3]"
                       style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
                </h1>
                <div className="h-1 w-32 bg-gradient-to-r from-[#FF4655] to-transparent" />
              </div>
            </div>
          </div>

          {/* Connect Wallet State */}
          <div
            className="p-16 text-center relative overflow-hidden bg-[#1A2634]"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)' }}
          >
            <div className="absolute top-0 left-0 w-40 h-40 border-l-2 border-t-2 border-[#768079]/10"
                 style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
            <div className="absolute bottom-0 right-0 w-40 h-40 border-r-2 border-b-2 border-[#768079]/10"
                 style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />

            <div className="relative z-10">
              <div className="w-24 h-24 mx-auto mb-6 bg-[#0F1923] flex items-center justify-center"
                   style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                <svg className="w-12 h-12 text-[#768079]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <p className="text-[#768079] text-xl font-bold uppercase tracking-wider">
                Connect your wallet to view your predictions
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F1923] px-4 py-12">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, #FF4655 0px, #FF4655 1px, transparent 1px, transparent 80px)',
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="mb-12 relative">
          <div className="flex items-end gap-6">
            <div>
              <h1 className="text-5xl font-black uppercase tracking-tight mb-3 relative inline-block">
                MY <span className="text-[#FF4655]">PREDICTIONS</span>
                <div className="absolute -right-3 -top-2 w-2 h-2 bg-[#00E6C3]"
                     style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
              </h1>
              <div className="h-1 w-32 bg-gradient-to-r from-[#FF4655] to-transparent" />
            </div>

            {/* Decorative corner accent */}
            <div className="mb-1 flex gap-1">
              <div className="w-1 h-8 bg-[#00E6C3]" />
              <div className="w-1 h-6 bg-[#00E6C3]/60" />
              <div className="w-1 h-4 bg-[#00E6C3]/30" />
            </div>
          </div>
        </div>

        {isLoading ? (
          <div
            className="p-16 text-center bg-[#1A2634]"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)' }}
          >
            <div className="w-20 h-20 mx-auto mb-6 relative">
              <div className="absolute inset-0 border-4 border-[#1A2634]"
                   style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
              <div className="absolute inset-0 border-4 border-[#FF4655] border-t-transparent animate-spin"
                   style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />
            </div>
            <p className="text-[#768079] text-xl font-bold uppercase tracking-wider">Loading predictions...</p>
          </div>
        ) : userPredictions.length === 0 ? (
          <div
            className="p-16 text-center relative overflow-hidden bg-[#1A2634]"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)' }}
          >
            <div className="absolute top-0 left-0 w-40 h-40 border-l-2 border-t-2 border-[#768079]/10"
                 style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
            <div className="absolute bottom-0 right-0 w-40 h-40 border-r-2 border-b-2 border-[#768079]/10"
                 style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />

            <div className="relative z-10">
              <div className="w-24 h-24 mx-auto mb-6 bg-[#0F1923] flex items-center justify-center"
                   style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                <svg className="w-12 h-12 text-[#768079]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-[#768079] text-xl font-bold uppercase tracking-wider mb-6">No predictions yet</p>
              <Link
                href="/matches"
                className="inline-block bg-[#FF4655] hover:bg-[#FF5865] text-[#ECE8E1] font-bold px-8 py-4 uppercase tracking-wider transition-all hover:scale-105"
                style={{ clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)' }}
              >
                Browse Matches
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div
                className="bg-gradient-to-br from-[#1A2634] to-[#1A2634]/80 p-6 border-l-4 border-[#00E6C3] relative overflow-hidden group hover:border-[#00E6C3]/80 transition-all"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 opacity-5 group-hover:opacity-10 transition-opacity">
                  <svg fill="currentColor" viewBox="0 0 20 20" className="text-[#00E6C3]">
                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="relative z-10">
                  <div className="text-[#768079] text-xs uppercase tracking-widest font-bold mb-2">Total Deposited</div>
                  <div className="text-[#ECE8E1] text-3xl font-black">{formatUSDC(summaryStats.totalDeposited)}</div>
                </div>
              </div>

              <div
                className="bg-gradient-to-br from-[#1A2634] to-[#1A2634]/80 p-6 border-l-4 border-[#FF4655] relative overflow-hidden group hover:border-[#FF4655]/80 transition-all"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 opacity-5 group-hover:opacity-10 transition-opacity">
                  <svg fill="currentColor" viewBox="0 0 20 20" className="text-[#FF4655]">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="relative z-10">
                  <div className="text-[#768079] text-xs uppercase tracking-widest font-bold mb-2">Active</div>
                  <div className="text-[#ECE8E1] text-3xl font-black">{summaryStats.activePredictions}</div>
                </div>
              </div>

              <div
                className="bg-gradient-to-br from-[#1A2634] to-[#1A2634]/80 p-6 border-l-4 border-[#768079] relative overflow-hidden group hover:border-[#768079]/80 transition-all"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 opacity-5 group-hover:opacity-10 transition-opacity">
                  <svg fill="currentColor" viewBox="0 0 20 20" className="text-[#768079]">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="relative z-10">
                  <div className="text-[#768079] text-xs uppercase tracking-widest font-bold mb-2">Resolved</div>
                  <div className="text-[#ECE8E1] text-3xl font-black">{summaryStats.resolvedCount}</div>
                </div>
              </div>

              <div
                className="bg-gradient-to-br from-[#1A2634] to-[#1A2634]/80 p-6 border-l-4 border-[#00E6C3] relative overflow-hidden group hover:border-[#00E6C3]/80 transition-all"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)' }}
              >
                <div className="absolute top-0 right-0 w-20 h-20 opacity-5 group-hover:opacity-10 transition-opacity">
                  <svg fill="currentColor" viewBox="0 0 20 20" className="text-[#00E6C3]">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="relative z-10">
                  <div className="text-[#768079] text-xs uppercase tracking-widest font-bold mb-2">Claimable</div>
                  <div className="text-[#ECE8E1] text-3xl font-black">{formatUSDC(summaryStats.totalClaimable)}</div>
                </div>
              </div>
            </div>

            {/* Desktop: Table Header */}
            <div
              className="hidden md:grid md:grid-cols-12 gap-4 px-6 py-4 bg-[#1A2634] text-[#768079] text-xs font-black uppercase tracking-widest"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)' }}
            >
              <div className="col-span-3">Match</div>
              <div className="col-span-2">My Predictions</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Result</div>
              <div className="col-span-2">Payout</div>
              <div className="col-span-1">Action</div>
            </div>

            {/* Predictions List */}
            {userPredictions.map((prediction, index) => {
              const { match, teamADeposit, teamBDeposit, onChainStatus, winner, expectedPayout, hasClaimed } = prediction;
              const statusLabel = getOnChainStatusLabel(onChainStatus);
              const onChainStatusString = onChainStatus === 0 ? "open" : onChainStatus === 1 ? "locked" : "finished";
              const statusColor = getStatusColor(onChainStatusString);
              const isResolved = onChainStatus === 2;
              const winnerLabel = getWinnerLabel(winner, match.team_a_name, match.team_b_name);

              return (
                <div
                  key={match.id}
                  className="bg-[#1A2634] hover:bg-[#223040] transition-all p-6 border-l-2 border-transparent hover:border-[#00E6C3] group"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)',
                    animation: 'slideInRight 0.3s ease-out forwards',
                    animationDelay: `${index * 50}ms`,
                    opacity: 0
                  }}
                >
                  {/* Mobile Layout */}
                  <div className="md:hidden space-y-4">
                    <div>
                      <Link
                        href={`/match/${match.id}`}
                        className="text-[#ECE8E1] font-bold hover:text-[#00E6C3] transition-colors text-lg"
                      >
                        {match.team_a_name} vs {match.team_b_name}
                      </Link>
                      <p className="text-[#768079] text-sm mt-1 font-semibold uppercase tracking-wide">
                        {match.event}
                      </p>
                      <p className="text-[#768079] text-xs mt-1">
                        {formatDate(match.start_time)}
                      </p>
                    </div>

                    <div className="bg-[#0F1923] p-4" style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)' }}>
                      <p className="text-[#768079] text-xs mb-2 font-bold uppercase tracking-widest">My Predictions:</p>
                      {teamADeposit > 0n && (
                        <p className="text-[#ECE8E1] text-sm mb-1">
                          <span className="text-[#768079]">{match.team_a_name}:</span> <span className="text-[#00E6C3] font-bold">{formatUSDC(teamADeposit)} USDC</span>
                        </p>
                      )}
                      {teamBDeposit > 0n && (
                        <p className="text-[#ECE8E1] text-sm">
                          <span className="text-[#768079]">{match.team_b_name}:</span> <span className="text-[#00E6C3] font-bold">{formatUSDC(teamBDeposit)} USDC</span>
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <StatusBadge status={onChainStatusString} />
                    </div>

                    {isResolved && (
                      <div className="bg-[#0F1923] p-4" style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)' }}>
                        <p className="text-[#768079] text-xs mb-1 font-bold uppercase tracking-widest">Winner:</p>
                        <p className="text-[#00E6C3] font-bold text-lg mb-3">{winnerLabel}</p>
                        <p className="text-[#768079] text-xs mb-1 font-bold uppercase tracking-widest">Expected Payout:</p>
                        <p className="text-[#ECE8E1] font-bold text-xl">{formatUSDC(expectedPayout)} USDC</p>
                      </div>
                    )}

                    <div className="flex gap-2">
                      {isResolved && !hasClaimed && (
                        <Link
                          href={`/match/${match.id}`}
                          className="flex-1 bg-[#FF4655] hover:bg-[#FF5865] text-[#ECE8E1] font-bold px-4 py-3 text-center transition-all uppercase tracking-wider text-sm hover:scale-105"
                          style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
                        >
                          Claim Now
                        </Link>
                      )}
                      {isResolved && hasClaimed && (
                        <div className="flex-1 bg-[#00E6C3]/20 text-[#00E6C3] font-bold px-4 py-3 text-center uppercase tracking-wider text-sm"
                             style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}>
                          Claimed
                        </div>
                      )}
                      <Link
                        href={`/match/${match.id}`}
                        className="flex-1 border-2 border-[#768079] hover:border-[#ECE8E1] text-[#ECE8E1] font-bold px-4 py-3 text-center transition-all uppercase tracking-wider text-sm"
                        style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
                      >
                        View Match
                      </Link>
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:grid md:grid-cols-12 gap-4 items-center">
                    <div className="col-span-3">
                      <Link
                        href={`/match/${match.id}`}
                        className="text-[#ECE8E1] font-bold hover:text-[#00E6C3] transition-colors text-lg group-hover:translate-x-1 inline-block transition-transform"
                      >
                        {match.team_a_name} vs {match.team_b_name}
                      </Link>
                      <p className="text-[#768079] text-sm mt-1 font-semibold uppercase tracking-wide">
                        {match.event}
                      </p>
                      <p className="text-[#768079] text-xs mt-1">
                        {formatDate(match.start_time)}
                      </p>
                    </div>

                    <div className="col-span-2">
                      {teamADeposit > 0n && (
                        <p className="text-[#ECE8E1] text-sm mb-1">
                          <span className="text-[#768079] text-xs">{match.team_a_name}:</span> <span className="text-[#00E6C3] font-bold text-base">{formatUSDC(teamADeposit)}</span>
                        </p>
                      )}
                      {teamBDeposit > 0n && (
                        <p className="text-[#ECE8E1] text-sm">
                          <span className="text-[#768079] text-xs">{match.team_b_name}:</span> <span className="text-[#00E6C3] font-bold text-base">{formatUSDC(teamBDeposit)}</span>
                        </p>
                      )}
                    </div>

                    <div className="col-span-2">
                      <StatusBadge status={onChainStatusString} />
                    </div>

                    <div className="col-span-2">
                      {isResolved ? (
                        <p className="text-[#00E6C3] font-bold text-lg">{winnerLabel}</p>
                      ) : (
                        <p className="text-[#768079] text-sm uppercase tracking-wider font-semibold">Pending</p>
                      )}
                    </div>

                    <div className="col-span-2">
                      {isResolved ? (
                        <p className="text-[#ECE8E1] font-bold text-xl">{formatUSDC(expectedPayout)}</p>
                      ) : (
                        <p className="text-[#768079] text-sm">-</p>
                      )}
                    </div>

                    <div className="col-span-1">
                      {isResolved && !hasClaimed && (
                        <Link
                          href={`/match/${match.id}`}
                          className="block bg-[#FF4655] hover:bg-[#FF5865] text-[#ECE8E1] font-bold px-3 py-2 text-center text-xs transition-all uppercase tracking-wider hover:scale-105"
                          style={{ clipPath: 'polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)' }}
                        >
                          Claim
                        </Link>
                      )}
                      {isResolved && hasClaimed && (
                        <div className="bg-[#00E6C3]/20 text-[#00E6C3] font-bold px-3 py-2 text-center text-xs uppercase tracking-wider"
                             style={{ clipPath: 'polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)' }}>
                          Claimed
                        </div>
                      )}
                      {!isResolved && (
                        <Link
                          href={`/match/${match.id}`}
                          className="block text-[#00E6C3] hover:text-[#ECE8E1] font-bold text-sm transition-colors uppercase tracking-wider"
                        >
                          View
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
