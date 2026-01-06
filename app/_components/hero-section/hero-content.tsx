import { HowToParticipate } from "../how-to-participate";
import { IdoEnd } from "../ido-end-date";
import { IdoLaunch } from "../ido-launch";
import { ParticipationAmount } from "../participation-amount";
import About from "./about";

// Main Demo Component
const HeroIdoComponents = () => {
    return (
        <div className="min-h-68 pb-4 grid lg:items-center items-start lg:min-h-100 bg-linear-to-br from-slate-950 via-indigo-950 to-slate-950 container">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                    <div className="lg:flex lg:flex-col hidden justify-center">
                        <About />
                    </div>


                    <div className="flex flex-col items-center gap-6">
                        <div className="w-full flex flex-col gap-2">
                            <IdoLaunch />
                            <ParticipationAmount />
                            <IdoEnd />
                        </div>
                        {/* <div className="w-full flex flex-col gap-2">
                            <HowToParticipate />
                        </div> */}
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
};

export default HeroIdoComponents;