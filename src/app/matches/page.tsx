"use client";

import { useState } from "react";
import { useMatches } from "@/hooks/useMatches";
import MatchCard from "@/components/MatchCard";

type FilterTab = "all" | "open" | "locked" | "resolved";

export default function MatchesPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>("all");
  const { matches, isLoading } = useMatches();

  const filteredMatches = matches?.filter((match) => {
    if (activeTab === "all") return true;
    if (activeTab === "resolved") return match.status === "finished";
    return match.status === activeTab;
  });

  const tabs: { id: FilterTab; label: string }[] = [
    { id: "all", label: "All" },
    { id: "open", label: "Open" },
    { id: "locked", label: "Locked" },
    { id: "resolved", label: "Resolved" },
  ];

  const getTabCount = (tabId: FilterTab) => {
    if (!matches) return 0;
    if (tabId === "all") return matches.length;
    if (tabId === "resolved") return matches.filter(m => m.status === "finished").length;
    return matches.filter(m => m.status === tabId).length;
  };

  return (
    <div className="min-h-screen bg-[#0F1923] text-[#ECE8E1] py-12 px-4">
      {/* Subtle diagonal background pattern */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, #FF4655 0px, #FF4655 1px, transparent 1px, transparent 40px)',
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header with decorative element */}
        <div className="mb-12 relative">
          <div className="flex items-end gap-6">
            <div>
              <h1 className="text-5xl font-black uppercase tracking-tight mb-3 relative inline-block">
                MATCHES
                <div className="absolute -right-3 -top-2 w-2 h-2 bg-[#FF4655]"
                     style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-[#FF4655] to-transparent" />
            </div>

            {/* Decorative corner accent */}
            <div className="mb-1 flex gap-1">
              <div className="w-1 h-8 bg-[#00E6C3]" />
              <div className="w-1 h-6 bg-[#00E6C3]/60" />
              <div className="w-1 h-4 bg-[#00E6C3]/30" />
            </div>
          </div>

          {/* Subtle horizontal accent line */}
          <div className="absolute -bottom-6 left-0 right-0 h-px bg-gradient-to-r from-[#768079]/20 via-[#768079]/40 to-transparent" />
        </div>

        {/* Filter Tabs - Angular Valorant style */}
        <div className="flex gap-2 mb-8 relative">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const count = getTabCount(tab.id);

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? "text-[#0F1923] bg-[#FF4655]"
                    : "text-[#768079] bg-[#1A2634] hover:bg-[#223040] hover:text-[#ECE8E1]"
                }`}
                style={{
                  clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)'
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {tab.label}
                  <span className={`inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-bold rounded-sm ${
                    isActive
                      ? "bg-[#0F1923]/20 text-[#0F1923]"
                      : "bg-[#0F1923] text-[#768079]"
                  }`}>
                    {count}
                  </span>
                </span>

                {isActive && (
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-[#00E6C3]"
                    style={{ clipPath: 'polygon(0 0, 100% 0, calc(100% - 4px) 100%, 0 100%)' }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Loading State - Animated placeholder cards */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-[#1A2634] h-80 animate-pulse"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%)',
                  animationDelay: `${i * 50}ms`
                }}
              >
                <div className="p-6 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="h-4 bg-[#0F1923] w-3/4 rounded" />
                    <div className="h-4 bg-[#0F1923] w-1/2 rounded" />
                  </div>
                  <div className="space-y-3">
                    <div className="h-12 bg-[#0F1923] rounded" />
                    <div className="h-12 bg-[#0F1923] rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State - Visually interesting */}
        {!isLoading && filteredMatches?.length === 0 && (
          <div
            className="text-center py-20 bg-[#1A2634] relative overflow-hidden"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%)'
            }}
          >
            {/* Decorative corner elements */}
            <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-[#768079]/20"
                 style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
            <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-[#768079]/20"
                 style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />

            {/* Icon */}
            <div className="relative z-10 mb-6 flex justify-center">
              <div className="w-20 h-20 bg-[#0F1923] flex items-center justify-center"
                   style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}>
                <svg className="w-10 h-10 text-[#768079]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            <p className="text-2xl font-bold uppercase tracking-wider text-[#768079] mb-2">
              No matches found
            </p>
            <p className="text-sm text-[#768079]/60 uppercase tracking-wide">
              {activeTab === "all" ? "Check back soon for new matches" : `No ${activeTab} matches available`}
            </p>
          </div>
        )}

        {/* Matches Grid */}
        {!isLoading && filteredMatches && filteredMatches.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMatches.map((match, index) => (
              <div
                key={match.id}
                style={{
                  animation: 'fadeInUp 0.4s ease-out forwards',
                  animationDelay: `${index * 50}ms`,
                  opacity: 0
                }}
              >
                <MatchCard match={match} />
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
