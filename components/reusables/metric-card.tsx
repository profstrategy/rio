import { MetricCardProps } from "@/constants/types";
import { TrendingUp } from "lucide-react";

const MetricCard = ({ icon: Icon, label, value, trend, delay = 0 }: MetricCardProps) => {
    return (
        <div
            className="relative overflow-hidden rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            style={{
                background: 'linear-gradient(135deg, rgba(184, 235, 254, 0.1) 0%, rgba(14, 165, 233, 0.05) 100%)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                backdropFilter: 'blur(10px)',
                animation: `fadeInUp 0.6s ease-out ${delay}s both`,
                padding: '1rem'
            }}
        >
            <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
                style={{
                    background: 'radial-gradient(circle, #38bdf8 0%, transparent 70%)',
                    filter: 'blur(20px)'
                }}
            />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl" style={{
                        background: 'linear-gradient(135deg, #00B4DB 0%, #0284c7 100%)',
                        boxShadow: '0 4px 12px rgba(0, 180, 219, 0.3)'
                    }}>
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                    {trend && (
                        <div className="flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-semibold"
                            style={{
                                background: 'rgba(56, 189, 248, 0.1)',
                                color: '#00B4DB'
                            }}>
                            <TrendingUp className="w-4 h-4" />
                            {trend}
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    <p className="text-3xl font-bold text-white/70" >
                        {value}
                    </p>
                    <p className="text-sm font-medium text-white/70">
                        {label}
                    </p>
                </div>
            </div>
        </div>
    )
}
export default MetricCard