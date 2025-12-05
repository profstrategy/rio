import React from 'react'

const AppBackground = ({ children }:{ children: React.ReactNode }) => {
    return (
        <div className="min-h-[35rem] h-auto relative overflow-hidden">
            {/* Deep Base Layer for Better Contrast */}
            <div className="absolute overflow-hidden inset-0 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950" />

            {/* Enhanced Dark Gradient Overlay with Rio Sky Colors */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-sky-950 to-indigo-950 animate-pulse"
                style={{ animationDuration: '4s' }} />

            {/* Stronger Color Accent Layer */}
            <div className="absolute inset-0 bg-gradient-to-tr from-sky-900/60 via-transparent to-cyan-900/60" />

            {/* Dynamic Rio Color Waves with Darker Tones */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-sky-700/30 via-transparent to-cyan-700/30 animate-pulse"
                    style={{
                        clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)',
                        animationDuration: '3s',
                        animationDelay: '0.5s'
                    }} />
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-indigo-700/25 via-transparent to-sky-700/25 animate-pulse"
                    style={{
                        clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0% 100%)',
                        animationDuration: '3.5s',
                        animationDelay: '1s'
                    }} />
            </div>

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Floating Particles with Rio Sky Colors */}
                {Array.from({ length: 50 }, (_, i) => (
                    <div
                        key={`particle-${i}`}
                        className="absolute animate-bounce"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 4}s`,
                            animationDuration: `${3 + Math.random() * 4}s`
                        }}
                    >
                        <div className="w-3 h-3 bg-gradient-to-br from-sky-400 to-cyan-500 rounded-full shadow-lg opacity-60" />
                    </div>
                ))}

                {/* Subtle Sparkles */}
                {Array.from({ length: 30 }, (_, i) => (
                    <div
                        key={`sparkle-${i}`}
                        className="absolute w-2 h-2 bg-sky-300 rounded-full opacity-50 animate-ping"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${1 + Math.random() * 2}s`
                        }}
                    />
                ))}

                {/* Animated Grid with Rio Sky Colors */}
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="w-full h-full animate-pulse"
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(0,180,219,0.3) 2px, transparent 2px),
                                linear-gradient(90deg, rgba(14,165,233,0.3) 2px, transparent 2px)
                            `,
                            backgroundSize: '60px 60px',
                            animationDuration: '6s'
                        }}
                    />
                </div>

                {/* Subtle Glow Effects with Rio Sky Colors */}
                <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-radial from-sky-600/20 via-sky-800/10 to-transparent rounded-full blur-3xl animate-pulse"
                    style={{ animationDuration: '4s' }} />
                <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-radial from-cyan-600/20 via-indigo-800/10 to-transparent rounded-full blur-2xl animate-pulse"
                    style={{ animationDuration: '3s', animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-radial from-sky-500/15 via-sky-800/10 to-transparent rounded-full blur-xl animate-pulse"
                    style={{ animationDuration: '5s', animationDelay: '2s' }} />
            </div>

            {/* Dark Overlay for Better Text Contrast */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-950/40 via-transparent to-indigo-950/40 mix-blend-multiply" />

            {/* Subtle Rio Sky Accent Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-700/15 via-transparent to-cyan-700/15 mix-blend-overlay" />

            {/* Subtle Highlight for Depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/3 to-sky-100/5 mix-blend-screen" />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    )
}

export default AppBackground