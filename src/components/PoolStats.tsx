"use client";

import { formatUSDC } from "@/lib/utils";

interface PoolStatsProps {
  totalTeamA: bigint;
  totalTeamB: bigint;
  teamAName: string;
  teamBName: string;
}

export default function PoolStats({
  totalTeamA,
  totalTeamB,
  teamAName,
  teamBName,
}: PoolStatsProps) {
  const total = totalTeamA + totalTeamB;

  // Handle zero case - show 50/50
  const percentageA = total === 0n ? 50 : Number((totalTeamA * 100n) / total);
  const percentageB = total === 0n ? 50 : 100 - percentageA;

  return (
    <div className="bg-[#1A2634] clip-corner-lg p-6 space-y-6">
      <h3 className="text-lg font-black uppercase tracking-widest text-[#ECE8E1]">
        Pool Distribution
      </h3>

      {/* Team stats */}
      <div className="flex justify-between items-start gap-8">
        <div className="flex-1">
          <div className="font-black uppercase text-[#00E6C3] text-xs mb-2 tracking-widest">
            {teamAName}
          </div>
          <div className="text-[#ECE8E1] text-3xl font-black mb-1">
            {formatUSDC(totalTeamA)}
          </div>
          <div className="text-[#00E6C3] text-xs font-bold uppercase tracking-wider">
            USDC
          </div>
        </div>

        <div className="flex-1 text-right">
          <div className="font-black uppercase text-[#FF4655] text-xs mb-2 tracking-widest">
            {teamBName}
          </div>
          <div className="text-[#ECE8E1] text-3xl font-black mb-1">
            {formatUSDC(totalTeamB)}
          </div>
          <div className="text-[#FF4655] text-xs font-bold uppercase tracking-wider">
            USDC
          </div>
        </div>
      </div>

      {/* Visual bar with dramatic effects */}
      <div className="relative">
        {/* Glow effects */}
        <div className="absolute -inset-1 blur-xl opacity-50">
          <div
            className="absolute left-0 top-0 h-full bg-[#00E6C3] transition-all duration-500"
            style={{ width: `${percentageA}%` }}
          />
          <div
            className="absolute right-0 top-0 h-full bg-[#FF4655] transition-all duration-500"
            style={{ width: `${percentageB}%` }}
          />
        </div>

        {/* Main bar container */}
        <div className="relative h-12 bg-[#0F1923] clip-corner overflow-hidden border border-[#768079]/30">
          {/* Team A bar with inner glow */}
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#00E6C3] via-[#00E6C3] to-[#00E6C3]/80 transition-all duration-500 shadow-[inset_0_0_20px_rgba(0,230,195,0.4)]"
            style={{ width: `${percentageA}%` }}
          >
            {/* Percentage label inside bar when wide enough */}
            {percentageA > 15 && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#0F1923] font-black text-sm">
                {percentageA.toFixed(1)}%
              </div>
            )}
          </div>

          {/* Team B bar with inner glow */}
          <div
            className="absolute right-0 top-0 h-full bg-gradient-to-l from-[#FF4655] via-[#FF4655] to-[#FF4655]/80 transition-all duration-500 shadow-[inset_0_0_20px_rgba(255,70,85,0.4)]"
            style={{ width: `${percentageB}%` }}
          >
            {/* Percentage label inside bar when wide enough */}
            {percentageB > 15 && (
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#ECE8E1] font-black text-sm">
                {percentageB.toFixed(1)}%
              </div>
            )}
          </div>

          {/* Percentage labels outside for narrow bars */}
          {percentageA <= 15 && (
            <div className="absolute left-2 top-1/2 -translate-y-1/2 text-[#00E6C3] font-black text-xs z-10">
              {percentageA.toFixed(1)}%
            </div>
          )}
          {percentageB <= 15 && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 text-[#FF4655] font-black text-xs z-10">
              {percentageB.toFixed(1)}%
            </div>
          )}
        </div>
      </div>

      {/* Total pool */}
      <div className="text-center pt-4 border-t border-[#768079]/20">
        <div className="text-[#768079] text-xs uppercase tracking-widest font-bold mb-2">
          Total Pool
        </div>
        <div className="text-[#ECE8E1] text-4xl font-black mb-1">
          {formatUSDC(total)}
        </div>
        <div className="text-[#768079] text-xs font-bold uppercase tracking-wider">
          USDC
        </div>
      </div>
    </div>
  );
}
