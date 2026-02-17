const USDC_DECIMALS = 6;

export function formatUSDC(amount: bigint): string {
  const whole = amount / BigInt(10 ** USDC_DECIMALS);
  const frac = amount % BigInt(10 ** USDC_DECIMALS);
  const fracStr = frac.toString().padStart(USDC_DECIMALS, "0").replace(/0+$/, "");
  if (fracStr === "") return whole.toLocaleString();
  return `${whole.toLocaleString()}.${fracStr}`;
}

export function parseUSDC(amount: string): bigint {
  const [whole, frac = ""] = amount.split(".");
  const fracPadded = frac.padEnd(USDC_DECIMALS, "0").slice(0, USDC_DECIMALS);
  return BigInt(whole || "0") * BigInt(10 ** USDC_DECIMALS) + BigInt(fracPadded);
}

export function shortenAddress(addr: string): string {
  if (!addr || addr.length < 10) return addr;
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "open":
      return "text-emerald-400 bg-emerald-400/10 border-emerald-400/30";
    case "locked":
      return "text-amber-400 bg-amber-400/10 border-amber-400/30";
    case "finished":
      return "text-[#FF4655] bg-[#FF4655]/10 border-[#FF4655]/30";
    case "cancelled":
      return "text-gray-400 bg-gray-400/10 border-gray-400/30";
    default:
      return "text-gray-400 bg-gray-400/10 border-gray-400/30";
  }
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case "open":
      return "OPEN";
    case "locked":
      return "LOCKED";
    case "finished":
      return "RESOLVED";
    case "cancelled":
      return "CANCELLED";
    default:
      return status.toUpperCase();
  }
}

// On-chain status: 0=Open, 1=Locked, 2=Resolved
export function getOnChainStatusLabel(status: number): string {
  switch (status) {
    case 0:
      return "OPEN";
    case 1:
      return "LOCKED";
    case 2:
      return "RESOLVED";
    default:
      return "UNKNOWN";
  }
}

// Team enum: 1=TeamA, 2=TeamB
export function getTeamEnum(team: "A" | "B"): number {
  return team === "A" ? 1 : 2;
}

export function getWinnerLabel(winner: number, teamAName: string, teamBName: string): string {
  switch (winner) {
    case 1:
      return teamAName;
    case 2:
      return teamBName;
    default:
      return "TBD";
  }
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
