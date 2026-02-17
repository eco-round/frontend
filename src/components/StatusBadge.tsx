import { getStatusColor, getStatusLabel } from "@/lib/utils";

interface StatusBadgeProps {
  status: "open" | "locked" | "finished" | "cancelled";
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const color = getStatusColor(status);
  const label = getStatusLabel(status);
  const isOpen = status === "open";

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 text-xs font-black uppercase tracking-widest border ${color} relative`}
      style={{
        clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))"
      }}
    >
      {isOpen && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E6C3] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E6C3] shadow-[0_0_8px_rgba(0,230,195,0.8)]"></span>
        </span>
      )}
      {label}
    </span>
  );
}
