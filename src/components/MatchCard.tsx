"use client";

import Link from "next/link";
import StatusBadge from "./StatusBadge";
import { formatDate } from "@/lib/utils";
import type { ApiMatch } from "@/config/api";

interface MatchCardProps {
  match: ApiMatch;
}

export default function MatchCard({ match }: MatchCardProps) {
  const getTeamInitial = (name: string) => name.charAt(0).toUpperCase();

  return (
    <Link href={`/match/${match.id}`}>
      <div className="match-card clip-corner bg-[#1A2634] border border-[#768079]/20 p-6 transition-all duration-300 hover:border-[#00E6C3] hover:shadow-[0_0_20px_rgba(0,230,195,0.3)] hover:bg-[#223040] relative overflow-hidden group">
        {/* Top accent bar - gradient from teal to red */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00E6C3] via-[#768079] to-[#FF4655]" />

        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0F1923]/80 to-transparent pointer-events-none" />

        {/* Header */}
        <div className="flex items-start justify-between mb-6 relative z-10">
          <p className="text-xs text-[#768079] uppercase tracking-widest font-bold">
            {match.event}
          </p>
          <StatusBadge status={match.status} />
        </div>

        {/* Teams */}
        <div className="my-8 text-center relative z-10">
          <div className="flex items-center justify-center gap-6">
            {/* Team A */}
            <div className="flex-1 flex items-center justify-end gap-3">
              <div className="text-right">
                <h3 className="text-3xl font-black text-[#00E6C3] mb-1 tracking-tight uppercase group-hover:text-shadow-glow-teal transition-all">
                  {match.team_a_name}
                </h3>
                <p className="text-xs text-[#768079] uppercase tracking-wider font-semibold">
                  {match.team_a_tag}
                </p>
              </div>
              {/* Team A avatar */}
              <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-[#00E6C3] to-[#00E6C3]/60 flex items-center justify-center text-[#0F1923] text-xl font-black shadow-lg"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%)" }}>
                {getTeamInitial(match.team_a_name)}
              </div>
            </div>

            {/* VS with dramatic background */}
            <div className="relative">
              <div className="absolute inset-0 bg-[#FF4655] opacity-20 blur-xl" />
              <div className="relative px-4 py-2 bg-gradient-to-r from-transparent via-[#FF4655]/20 to-transparent"
                style={{ clipPath: "polygon(10px 0, calc(100% - 10px) 0, 100% 50%, calc(100% - 10px) 100%, 10px 100%, 0 50%)" }}>
                <div className="text-4xl font-black text-[#FF4655] tracking-tighter">
                  VS
                </div>
              </div>
            </div>

            {/* Team B */}
            <div className="flex-1 flex items-center justify-start gap-3">
              {/* Team B avatar */}
              <div className="w-12 h-12 rounded-sm bg-gradient-to-br from-[#FF4655] to-[#FF4655]/60 flex items-center justify-center text-[#ECE8E1] text-xl font-black shadow-lg"
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}>
                {getTeamInitial(match.team_b_name)}
              </div>
              <div className="text-left">
                <h3 className="text-3xl font-black text-[#ECE8E1] mb-1 tracking-tight uppercase group-hover:text-shadow-glow transition-all">
                  {match.team_b_name}
                </h3>
                <p className="text-xs text-[#768079] uppercase tracking-wider font-semibold">
                  {match.team_b_tag}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-sm text-[#768079] pt-4 border-t border-[#768079]/20 relative z-10">
          <div className="space-y-1">
            <p className="uppercase tracking-widest text-xs font-bold">
              Best of {match.best_of}
            </p>
            <p className="text-xs">{formatDate(match.start_time)}</p>
          </div>
          <div className="text-[#FF4655] font-bold hover:text-[#00E6C3] transition-colors flex items-center gap-2 uppercase tracking-wider text-xs">
            View Match
            <span className="text-lg">→</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
