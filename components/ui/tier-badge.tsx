import { clsx } from "clsx";

export default function TierBadge({ tier }: { tier: string }) {
  // Map levels to specific luxury colors
  const getStyle = (t: string) => {
    const lower = t.toLowerCase();
    if (lower.includes("diamond") || lower.includes("eternal")) return "bg-cyan-500/10 text-cyan-400 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.3)]";
    if (lower.includes("gold") || lower.includes("master")) return "bg-yellow-500/10 text-yellow-400 border-yellow-500/50 shadow-[0_0_10px_rgba(234,179,8,0.3)]";
    if (lower.includes("silver") || lower.includes("bright")) return "bg-slate-300/10 text-slate-300 border-slate-300/50";
    if (lower.includes("bronze") || lower.includes("rising")) return "bg-orange-700/10 text-orange-400 border-orange-700/50";
    return "bg-slate-700/10 text-slate-400 border-slate-700/50"; // Default
  };

  return (
    <span className={clsx(
      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border backdrop-blur-md",
      getStyle(tier)
    )}>
      {tier}
    </span>
  );
}