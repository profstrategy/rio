import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  subValue?: string;
  icon: LucideIcon;
  trend?: "up" | "down" | "neutral";
}

export default function StatCard({ label, value, subValue, icon: Icon }: StatCardProps) {
  return (
    <div className="glass-card p-6 relative overflow-hidden group">
      {/* Background Gradient Glow (Hidden until hover) */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative z-10 flex justify-between items-start mb-4">
        {/* Icon with Neon Glow */}
        <div className="p-3 bg-neon-blue/10 rounded-xl border border-neon-blue/20 shadow-[0_0_15px_rgba(59,130,246,0.15)] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all">
          <Icon size={24} className="text-neon-cyan" />
        </div>
      </div>
      
      <div className="relative z-10">
        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{label}</h3>
        <p className="text-3xl font-bold text-white tracking-tight drop-shadow-md">{value}</p>
        {subValue && (
          <p className="text-xs text-neon-blue mt-2 font-medium flex items-center gap-1">
            {subValue}
          </p>
        )}
      </div>
    </div>
  );
}