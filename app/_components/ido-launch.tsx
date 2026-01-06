import { LaunchTiming } from "./launch-timing";

// IdoLaunch Component
export const IdoLaunch = () => {
    return (
        <section className='flex flex-col w-full z-0'>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2 lg:mb-3 text-center tracking-tight">
                RIOONBONK <span className="text-3xl lg:text-4xl font-bold bg-linear-to-r from-orange-400 to-cyan-400 bg-clip-text text-transparent tracking-tight">IDO LAUNCH </span>
            </h2>
            <h4 className="text-base lg:text-lg font-medium text-sky-200/90 text-center" style={{ marginBottom: 'mb-4' }}>
                JOIN THE IDO & GET IN EARLY
            </h4>
            <LaunchTiming />
        </section>
    );
};