import { CheckCircle, Coins, Wallet } from "lucide-react";

// HowToParticipate Component
export const HowToParticipate = () => {
    const howtoparticipate = [
        {
            id: 0,
            icon: Wallet,
            text: 'CONNECT WALLET'
        },
        {
            id: 1,
            icon: Coins,
            text: 'CHOOSE AMOUNT'
        },
        {
            id: 3,
            icon: CheckCircle,
            text: 'CLAIM TOKENS'
        }
    ];

    return (
        <div className="w-full px-2 z-0">
            <h3 className="text-2xl lg:text-3xl font-bold text-white  text-center tracking-tight z-50" style={{ marginBottom: '.5rem' }}>
                HOW TO PARTICIPATE
            </h3>
            
            <div className="flex justify-between gap-3 lg:gap-4">
                {howtoparticipate.map((itm, index) => {
                    const IconComponent = itm.icon;
                    return (
                        <div
                            key={itm.id}
                            className="relative group w-full"
                            style={{
                                animation: 'fadeInUp 0.6s ease-out forwards',
                                animationDelay: `${index * 0.1}s`,
                                opacity: 0
                            }}
                        >
                            <div className="relative bg-black/60 backdrop-blur-sm border border-sky-500/20 rounded-xl lg:rounded-2xl p-4 lg:p-5 shadow-xl hover:shadow-2xl hover:border-sky-400/40 transition-all duration-300 hover:scale-105 h-full flex flex-col items-center justify-center">
                                <div className="absolute inset-0 bg-linear-to-br from-sky-500/0 to-cyan-500/0 group-hover:from-sky-500/10 group-hover:to-cyan-500/10 rounded-xl lg:rounded-2xl transition-all duration-300" />
                                
                                <div className="absolute -top-2 -left-2 w-8 h-8 lg:w-10 lg:h-10 bg-linear-to-br from-sky-400 to-cyan-500 rounded-full flex items-center justify-center shadow-lg shadow-sky-400/50 z-10">
                                    <span className="text-white font-bold text-sm lg:text-base">{index + 1}</span>
                                </div>
                                
                                <div className="relative z-10 flex flex-col items-center gap-2 lg:gap-3">
                                    <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-linear-to-br from-sky-400/20 to-cyan-500/20 flex items-center justify-center border border-sky-400/30">
                                        <IconComponent className="w-6 h-6 lg:w-7 lg:h-7 text-sky-300" />
                                    </div>
                                    <div className="text-xs lg:text-sm font-semibold text-white uppercase tracking-wide text-center leading-tight">
                                        {itm.text}
                                    </div>
                                </div>

                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-0.5 bg-linear-to-r from-transparent via-sky-400/50 to-transparent" />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};