// IdoEnd Component
export const IdoEnd = () => {
    const end = [
        {
            id: 0,
            text: 'IDO STARTS',
            date: '20 JAN 2026'
        },
        {
            id: 1,
            text: 'IDO ENDS',
            date: '03 FEB 2026'
        }
    ];

    return (
        <div className="w-full px-2">
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
                {end.map((itm, index) => (
                    <div
                        key={itm.id}
                        className="relative group"
                        style={{
                            animation: 'fadeInUp 0.6s ease-out forwards',
                            animationDelay: `${index * 0.15}s`,
                            opacity: 0
                        }}
                    >
                        <div className="relative bg-black/60 backdrop-blur-sm border border-sky-500/20 rounded-xl lg:rounded-2xl p-4 lg:p-5 shadow-xl hover:shadow-2xl hover:border-sky-400/40 transition-all duration-300 hover:scale-105">
                            <div className="absolute inset-0 bg-linear-to-br from-sky-500/0 to-cyan-500/0 group-hover:from-sky-500/10 group-hover:to-cyan-500/10 rounded-xl lg:rounded-2xl transition-all duration-300" />
                            <div className="absolute top-0 right-0 w-8 h-8 lg:w-10 lg:h-10 bg-linear-to-br from-sky-400/20 to-transparent rounded-tr-xl lg:rounded-tr-2xl rounded-bl-full" />
                            
                            <div className="relative z-10 flex flex-col items-center gap-2 lg:gap-3">
                                <div className="text-xs lg:text-sm font-semibold text-sky-300/80 uppercase tracking-wider text-center">
                                    {itm.text}
                                </div>
                                <div className="text-base lg:text-lg font-bold text-white text-center">
                                    {itm.date}
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-linear-to-r from-transparent via-sky-400/50 to-transparent" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
