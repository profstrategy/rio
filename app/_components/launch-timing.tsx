import React from 'react';

// LaunchTiming Component
export const LaunchTiming = () => {
    const [timeLeft, setTimeLeft] = React.useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const [ isExpired, setExpired ] = React.useState(false)

    React.useEffect(() => {
        // jan 20 at 12am
        const timeTarget = new Date('2026-01-20T00:00:00').getTime();

        const calculateTime = () => {
            const now = new Date().getTime()
            const difference = timeTarget - now;

            if(difference <= 0){
                setExpired(true)
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
                return
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24))
            const hours = Math.floor(difference % (1000 * 60 * 60 * 24)/ (1000 * 60 * 60))
            const minutes = Math.floor(difference % (1000 * 60 * 60) / (1000 * 60))
            const seconds = Math.floor(difference % (1000 * 60) / 1000)

            // set the specific date
            setTimeLeft({ days: days, hours: hours, minutes: minutes, seconds: seconds })
        }

        //calculate immediately on mount
        calculateTime()

        //update every seconds
        const timer = setInterval(() => {calculateTime()}, 1000);

        return () => clearInterval(timer);
    }, []);



    const timeUnits = [
        { label: 'Days', value: timeLeft.days, key: 'days' },
        { label: 'Hours', value: timeLeft.hours, key: 'hours' },
        { label: 'Minutes', value: timeLeft.minutes, key: 'minutes' },
        { label: 'Seconds', value: timeLeft.seconds, key: 'seconds' }
    ];

    return (
        <div className="w-full px-2 py-6" style={{ margin: '1.5rem 0' }}>
            <div className="grid grid-cols-4 gap-2 lg:gap-3">
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