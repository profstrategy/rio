import { MetricCardProps } from "@/constants/types";
import { TrendingUp } from "lucide-react";

const MetricCard = ({ icon: Icon, label, value, trend, delay = 0 }: MetricCardProps) => {
    return (
        <div
            className="group relative overflow-hidden rounded-[24px] bg-[#0f172a]/60 backdrop-blur-xl border border-white/5 p-6 transition-all duration-500 hover:border-white/20 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(0,210,255,0.15)]"
            style={{
                animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s both`,
            }}
        >
            {/* Background Decorative Blob (Neon Blue) */}
            <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: '#00D2FF',
                    filter: 'blur(50px)'
                }}
            />
            
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                    {/* Icon Container with Neon Glow */}
                    <div className="p-3 rounded-2xl bg-[#00D2FF]/10 border border-[#00D2FF]/20 shadow-[0_0_15px_rgba(0,210,255,0.15)] group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,210,255,0.3)] transition-all duration-300">
                        <Icon className="w-6 h-6 text-[#00D2FF]" />
                    </div>

                    {/* Trend Badge (Neon Green) */}
                    {trend && (
                        <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-[#3AFFAD]/10 border border-[#3AFFAD]/20 text-[10px] font-bold text-[#3AFFAD] font-space tracking-wide">
                            <TrendingUp className="w-3 h-3" />
                            {trend}
                        </div>
                    )}
                </div>

                <div className="space-y-1">
                    {/* Value */}
                    <p className="text-3xl font-bold text-white font-space tracking-tight">
                        {typeof value === 'number' ? value.toLocaleString() : value}
                    </p>
                    
                    {/* Label */}
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 font-sync group-hover:text-gray-300 transition-colors">
                        {label}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default MetricCard