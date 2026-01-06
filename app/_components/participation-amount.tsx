// ParticipationAmount Component
export const ParticipationAmount = () => {
    const participation = [
        {
            id: 1,
            text: 'MIN PARTICIPATION',
            amount: '$38'
        },
        {
            id: 2,
            text: 'MAX PARTICIPATION',
            amount: '$78'
        },
        {
            id: 3,
            text: 'TOKEN PRICE',
            amount: '$0.001'
        }
    ];

    return (
        <div className="w-full px-2">
            <div className="relative bg-black/60 backdrop-blur-sm border border-sky-500/20 rounded-xl lg:rounded-2xl p-4 lg:p-6 shadow-xl hover:shadow-2xl hover:border-sky-400/40 transition-all duration-300">
                <div className="absolute inset-0 bg-linear-to-br from-sky-500/0 to-cyan-500/0 hover:from-sky-500/10 hover:to-cyan-500/10 rounded-xl lg:rounded-2xl transition-all duration-300" />
                <div className="absolute top-0 right-0 w-10 h-10 lg:w-12 lg:h-12 bg-linear-to-br from-sky-400/20 to-transparent rounded-tr-xl lg:rounded-tr-2xl rounded-bl-full" />
                
                <div className="relative z-10 grid grid-cols-3 gap-4 lg:gap-5">
                    {participation.map((itm) => (
                        <div key={itm.id} className="flex flex-col items-center py-2 border-b border-sky-500/10 last:border-b-0">
                            <div className="text-xs lg:text-sm font-semibold text-sky-300/80 uppercase tracking-wider mb-1 lg:mb-2">
                                {itm.text}
                            </div>
                            <span className="bg-white border-[0.1rem] w-2/6" />
                            <div className="text-2xl lg:text-3xl font-bold text-white tabular-nums">
                                {itm.amount}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-linear-to-r from-transparent via-sky-400/50 to-transparent" />
            </div>
        </div>
    );
};
