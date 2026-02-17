"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useDeposit } from "@/hooks/useDeposit";
import { parseUSDC, formatUSDC } from "@/lib/utils";

interface DepositFormProps {
  vaultAddress: string;
  teamAName: string;
  teamBName: string;
  status: number;
}

export default function DepositForm({
  vaultAddress,
  teamAName,
  teamBName,
  status,
}: DepositFormProps) {
  const { address, isConnected } = useAccount();
  const [selectedTeam, setSelectedTeam] = useState<1 | 2 | null>(null);
  const [amount, setAmount] = useState("");

  const {
    approve,
    deposit,
    isApproving,
    isDepositing,
    approveHash,
    depositHash,
  } = useDeposit(vaultAddress as `0x${string}`);

  // Only render when status is Open (0)
  if (status !== 0) {
    return null;
  }

  if (!isConnected) {
    return (
      <div className="bg-[#1A2634] clip-corner-lg p-6 border-2 border-[#FF4655]/30">
        <p className="text-[#768079] text-center font-bold uppercase tracking-wider">
          Connect Wallet to Deposit
        </p>
      </div>
    );
  }

  const amountBigInt = amount ? parseUSDC(amount) : 0n;
  const isValidAmount = amountBigInt > 0n;

  const handleApprove = async () => {
    if (!isValidAmount) return;
    await approve(amountBigInt);
  };

  const handleDeposit = async () => {
    if (!isValidAmount || !selectedTeam) return;
    await deposit(selectedTeam, amountBigInt);
  };

  const setQuickAmount = (value: number) => {
    setAmount(value.toString());
  };

  const getTeamInitial = (name: string) => name.charAt(0).toUpperCase();

  return (
    <div className="bg-[#1A2634] clip-corner-lg p-6 space-y-6 border border-[#768079]/20">
      <h3 className="text-xl font-black uppercase tracking-widest text-[#ECE8E1]">
        Make Prediction
      </h3>

      {/* Info box explaining process */}
      <div className="bg-[#0F1923] clip-corner-sm p-4 border-l-2 border-[#00E6C3]">
        <p className="text-[#768079] text-xs leading-relaxed">
          <span className="text-[#00E6C3] font-bold">Step 1:</span> Approve USDC contract access
          <br />
          <span className="text-[#00E6C3] font-bold">Step 2:</span> Deposit funds to predict winner
        </p>
      </div>

      {/* Team Selection - Toggle cards */}
      <div className="space-y-3">
        <label className="text-xs text-[#768079] uppercase tracking-widest font-bold">
          Select Team
        </label>
        <div className="grid grid-cols-2 gap-4">
          {/* Team A Card */}
          <button
            onClick={() => setSelectedTeam(1)}
            className={`
              relative overflow-hidden py-5 px-4 clip-corner font-black uppercase text-sm
              transition-all duration-300 border-2
              ${
                selectedTeam === 1
                  ? "bg-[#00E6C3] text-[#0F1923] border-[#00E6C3] shadow-[0_0_20px_rgba(0,230,195,0.5)] scale-105"
                  : "bg-[#0F1923] text-[#00E6C3] border-[#00E6C3]/30 hover:bg-[#00E6C3]/10 hover:border-[#00E6C3]/60"
              }
            `}
          >
            {selectedTeam === 1 && (
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
            )}
            <div className="flex items-center justify-center gap-3">
              <div className={`w-8 h-8 rounded-sm flex items-center justify-center text-xs font-black ${selectedTeam === 1 ? 'bg-[#0F1923] text-[#00E6C3]' : 'bg-[#00E6C3]/20 text-[#00E6C3]'}`}
                style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%)" }}>
                {getTeamInitial(teamAName)}
              </div>
              <span className="tracking-wider">{teamAName}</span>
            </div>
          </button>

          {/* Team B Card */}
          <button
            onClick={() => setSelectedTeam(2)}
            className={`
              relative overflow-hidden py-5 px-4 clip-corner font-black uppercase text-sm
              transition-all duration-300 border-2
              ${
                selectedTeam === 2
                  ? "bg-[#FF4655] text-[#ECE8E1] border-[#FF4655] shadow-[0_0_20px_rgba(255,70,85,0.5)] scale-105"
                  : "bg-[#0F1923] text-[#FF4655] border-[#FF4655]/30 hover:bg-[#FF4655]/10 hover:border-[#FF4655]/60"
              }
            `}
          >
            {selectedTeam === 2 && (
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
            )}
            <div className="flex items-center justify-center gap-3">
              <div className={`w-8 h-8 rounded-sm flex items-center justify-center text-xs font-black ${selectedTeam === 2 ? 'bg-[#ECE8E1] text-[#FF4655]' : 'bg-[#FF4655]/20 text-[#FF4655]'}`}
                style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 6px 100%, 0 calc(100% - 6px))" }}>
                {getTeamInitial(teamBName)}
              </div>
              <span className="tracking-wider">{teamBName}</span>
            </div>
          </button>
        </div>
      </div>

      {/* Amount Input with USDC suffix */}
      <div className="space-y-3">
        <label className="text-xs text-[#768079] uppercase tracking-widest font-bold">
          Amount
        </label>
        <div className="relative">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full bg-[#0F1923] text-[#ECE8E1] text-2xl font-bold px-4 py-4 pr-20 clip-corner-sm
                       border-2 border-[#768079]/30 focus:border-[#00E6C3] focus:outline-none
                       focus:shadow-[0_0_15px_rgba(0,230,195,0.3)]
                       transition-all placeholder:text-[#768079]/40"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#768079] text-sm font-black uppercase tracking-widest">
            USDC
          </div>
        </div>
      </div>

      {/* Quick Amount Buttons - more tactile */}
      <div className="grid grid-cols-4 gap-2">
        {[10, 50, 100, 500].map((value) => (
          <button
            key={value}
            onClick={() => setQuickAmount(value)}
            className={`
              py-3 px-3 clip-corner-sm font-black text-sm
              border-2 transition-all duration-200
              ${
                amount === value.toString()
                  ? "bg-[#00E6C3] text-[#0F1923] border-[#00E6C3] shadow-[0_0_10px_rgba(0,230,195,0.4)]"
                  : "bg-[#0F1923] text-[#768079] border-[#768079]/30 hover:bg-[#223040] hover:text-[#ECE8E1] hover:border-[#768079]/60"
              }
            `}
          >
            {value}
          </button>
        ))}
      </div>

      {/* Action Buttons - clear hierarchy */}
      <div className="space-y-3 pt-2">
        {/* Approve button - secondary feel */}
        <button
          onClick={handleApprove}
          disabled={!isValidAmount || isApproving}
          className="w-full py-3 px-6 clip-corner font-bold uppercase tracking-wider text-sm
                     bg-[#0F1923] text-[#768079] border-2 border-[#768079]/30
                     hover:bg-[#223040] hover:text-[#ECE8E1] hover:border-[#768079]/60
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#0F1923]
                     transition-all duration-200"
        >
          {isApproving ? "Approving..." : "1. Approve USDC"}
        </button>

        {/* Deposit button - primary exciting feel */}
        <button
          onClick={handleDeposit}
          disabled={!isValidAmount || !selectedTeam || isDepositing}
          className="relative w-full py-4 px-6 clip-corner font-black uppercase tracking-wider text-base
                     bg-gradient-to-r from-[#FF4655] to-[#FF4655]/80 text-[#ECE8E1]
                     border-2 border-[#FF4655]
                     hover:shadow-[0_0_25px_rgba(255,70,85,0.6)] hover:scale-[1.02]
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none disabled:hover:scale-100
                     transition-all duration-200 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
          <span className="relative z-10">
            {isDepositing ? "Depositing..." : "2. Deposit & Predict"}
          </span>
        </button>
      </div>

      {/* Transaction Status - nicer toast-like display */}
      {(approveHash || depositHash) && (
        <div className="space-y-2">
          {approveHash && (
            <div className="bg-[#00E6C3]/10 border-l-2 border-[#00E6C3] clip-corner-sm p-3">
              <div className="text-[#00E6C3] text-xs font-bold uppercase tracking-wider mb-1">
                Approval Transaction
              </div>
              <div className="text-[#768079] text-xs break-all font-mono">
                {approveHash}
              </div>
            </div>
          )}
          {depositHash && (
            <div className="bg-[#00E6C3]/10 border-l-2 border-[#00E6C3] clip-corner-sm p-3">
              <div className="text-[#00E6C3] text-xs font-bold uppercase tracking-wider mb-1">
                Deposit Transaction
              </div>
              <div className="text-[#768079] text-xs break-all font-mono">
                {depositHash}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
