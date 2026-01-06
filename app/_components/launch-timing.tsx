import React from 'react';
import { Wallet, Coins, CheckCircle } from 'lucide-react';

// LaunchTiming Component
export const LaunchTiming = () => {
    const [timeLeft, setTimeLeft] = React.useState({
        days: 15,
        hours: 8,
        minutes: 42,
        seconds: 30
    });

    React.useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                } else if (prev.days > 0) {
                    return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
                }
                return prev;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const timeUnits = [
        { label: 'Days', value: timeLeft.days, key: 'days' },
        { label: 'Hours', value: timeLeft.hours, key: 'hours' },
        { label: 'Minutes', value: timeLeft.minutes, key: 'minutes' },
        { label: 'Seconds', value: timeLeft.seconds, key: 'seconds' }
    ];

    return (
        <div className="w-full px-2 py-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3">
                {timeUnits.map((unit, index) => (
                    <div
                        key={unit.key}
                        className="relative group"
                        style={{
                            animation: 'fadeInUp 0.6s ease-out forwards',
                            animationDelay: `${index * 0.1}s`,
                            opacity: 0
                        }}
                    >
                        <div className="relative bg-black/60 backdrop-blur-sm border border-sky-500/20 rounded-xl lg:rounded-2xl p-3 lg:p-4 shadow-xl hover:shadow-2xl hover:border-sky-400/40 transition-all duration-300 hover:scale-105">
                            <div className="absolute inset-0 bg-linear-to-br from-sky-500/0 to-cyan-500/0 group-hover:from-sky-500/10 group-hover:to-cyan-500/10 rounded-xl lg:rounded-2xl transition-all duration-300" />
                            <div className="absolute top-0 right-0 w-8 h-8 lg:w-12 lg:h-12 bg-linear-to-br from-sky-400/20 to-transparent rounded-tr-xl lg:rounded-tr-2xl rounded-bl-full" />
                            
                            <div className="relative z-10">
                                <div className="text-3xl lg:text-5xl font-bold text-white mb-1 lg:mb-2 text-center tabular-nums tracking-tight">
                                    {unit.value.toString().padStart(2, '0')}
                                </div>
                                <div className="text-xs lg:text-sm font-medium text-sky-300/90 uppercase tracking-wider text-center">
                                    {unit.label}
                                </div>
                            </div>
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-linear-to-r from-transparent via-sky-400/50 to-transparent" />
                        </div>
                        {unit.value > 0 && (
                            <div className="absolute -top-1 -right-1 w-2 h-2 lg:w-3 lg:h-3 bg-linear-to-br from-sky-400 to-cyan-500 rounded-full animate-pulse shadow-lg shadow-sky-400/50" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};