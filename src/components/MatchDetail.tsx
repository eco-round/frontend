"use client";

import { ApiMatch } from "@/config/api";
import { formatDate } from "@/lib/utils";
import StatusBadge from "@/components/StatusBadge";

interface MatchDetailProps {
  match: ApiMatch;
}

export default function MatchDetail({ match }: MatchDetailProps) {
  const hasResults = match.results && match.results.length > 0;
  const getTeamInitial = (name: string) => name.charAt(0).toUpperCase();

  return (
    <div className="bg-[#1A2634] clip-corner-lg p-8 space-y-8 border border-[#768079]/20 relative overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00E6C3] via-[#768079] to-[#FF4655]" />

      {/* Event name */}
      <div className="text-[#768079] text-xs uppercase tracking-widest font-black">
        {match.event}
      </div>

      {/* Team Matchup - Esports Broadcast Style */}
      <div className="relative">
        {/* Background glow effects */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-32 bg-[#00E6C3]/20 blur-3xl" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-32 bg-[#FF4655]/20 blur-3xl" />

        <div className="flex items-center justify-center gap-8 flex-wrap relative z-10">
          {/* Team A */}
          <div className="flex items-center gap-4 flex-1 justify-end min-w-[200px]">
            <div className="text-right">
              <div className="text-[#00E6C3] text-5xl font-black uppercase tracking-tight mb-2 drop-shadow-[0_0_15px_rgba(0,230,195,0.5)]">
                {match.team_a_name}
              </div>
              <div className="text-[#768079] text-sm uppercase tracking-widest font-bold">
                {match.team_a_tag}
              </div>
            </div>
            {/* Team A Shield/Avatar */}
            <div className="relative">
              <div className="absolute inset-0 bg-[#00E6C3] blur-xl opacity-50" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-[#00E6C3] to-[#00E6C3]/60 flex items-center justify-center text-[#0F1923] text-3xl font-black shadow-2xl"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%)" }}>
                {getTeamInitial(match.team_a_name)}
              </div>
            </div>
          </div>

          {/* VS Section - Dramatic Treatment */}
          <div className="relative mx-4">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF4655] via-[#FF4655] to-[#FF4655] blur-2xl opacity-30" />
            <div className="relative px-8 py-4 bg-gradient-to-br from-[#FF4655]/20 via-[#FF4655]/10 to-transparent border-2 border-[#FF4655]"
              style={{ clipPath: "polygon(15px 0, calc(100% - 15px) 0, 100% 50%, calc(100% - 15px) 100%, 15px 100%, 0 50%)" }}>
              <div className="text-6xl font-black text-[#FF4655] tracking-tighter drop-shadow-[0_0_20px_rgba(255,70,85,0.8)]">
                VS
              </div>
            </div>
          </div>

          {/* Team B */}
          <div className="flex items-center gap-4 flex-1 justify-start min-w-[200px]">
            {/* Team B Shield/Avatar */}
            <div className="relative">
              <div className="absolute inset-0 bg-[#FF4655] blur-xl opacity-50" />
              <div className="relative w-20 h-20 bg-gradient-to-br from-[#FF4655] to-[#FF4655]/60 flex items-center justify-center text-[#ECE8E1] text-3xl font-black shadow-2xl"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}>
                {getTeamInitial(match.team_b_name)}
              </div>
            </div>
            <div className="text-left">
              <div className="text-[#ECE8E1] text-5xl font-black uppercase tracking-tight mb-2 drop-shadow-[0_0_15px_rgba(236,232,225,0.3)]">
                {match.team_b_name}
              </div>
              <div className="text-[#768079] text-sm uppercase tracking-widest font-bold">
                {match.team_b_tag}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status & Info - More Prominent */}
      <div className="flex items-center justify-center gap-8 flex-wrap py-4 border-y border-[#768079]/20">
        <div className="scale-110">
          <StatusBadge status={match.status} />
        </div>

        <div className="text-[#768079] text-sm uppercase tracking-widest font-bold bg-[#0F1923] px-4 py-2 clip-corner-sm border border-[#768079]/30">
          Best of {match.best_of}
        </div>

        <div className="text-[#ECE8E1] text-sm font-bold bg-[#0F1923] px-4 py-2 clip-corner-sm border border-[#768079]/30">
          {formatDate(match.start_time)}
        </div>
      </div>

      {/* Results - Scoreboard Style */}
      {hasResults && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#768079]/30" />
            <div className="text-[#ECE8E1] text-sm uppercase tracking-widest font-black">
              Match Results
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#768079]/30" />
          </div>

          <div className="space-y-3">
            {match.results?.map((result, index) => {
              const isTeamAWinner = result.winner === "TeamA";
              const isTeamBWinner = result.winner === "TeamB";

              return (
                <div
                  key={index}
                  className="relative bg-[#0F1923] clip-corner-sm p-4 border-2 border-[#768079]/20 hover:border-[#768079]/40 transition-colors"
                >
                  {/* Winner highlight glow */}
                  {isTeamAWinner && (
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00E6C3]/10 to-transparent pointer-events-none" />
                  )}
                  {isTeamBWinner && (
                    <div className="absolute inset-0 bg-gradient-to-l from-[#FF4655]/10 to-transparent pointer-events-none" />
                  )}

                  <div className="relative z-10 flex justify-between items-center">
                    <div className="flex items-center gap-4 flex-1">
                      <span className="text-[#768079] font-black uppercase tracking-wider text-xs bg-[#1A2634] px-3 py-1 clip-corner-sm">
                        Map {index + 1}
                      </span>
                      <div className="flex items-center gap-3">
                        <span className={`font-black text-xl ${isTeamAWinner ? 'text-[#00E6C3]' : 'text-[#768079]'}`}>
                          {result.score_a}
                        </span>
                        <span className="text-[#768079] font-bold">-</span>
                        <span className={`font-black text-xl ${isTeamBWinner ? 'text-[#FF4655]' : 'text-[#768079]'}`}>
                          {result.score_b}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {result.winner !== "Draw" && (
                        <div className="text-xs text-[#768079] uppercase tracking-wider font-bold">
                          Winner:
                        </div>
                      )}
                      <div
                        className={`
                          font-black uppercase tracking-wider px-4 py-2 clip-corner-sm text-sm
                          ${
                            isTeamAWinner
                              ? "text-[#00E6C3] bg-[#00E6C3]/10 border border-[#00E6C3]/30"
                              : isTeamBWinner
                              ? "text-[#FF4655] bg-[#FF4655]/10 border border-[#FF4655]/30"
                              : "text-[#768079] bg-[#768079]/10 border border-[#768079]/30"
                          }
                        `}
                      >
                        {result.winner === "TeamA"
                          ? match.team_a_name
                          : result.winner === "TeamB"
                          ? match.team_b_name
                          : "Draw"}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
