import React from 'react'

const AppBackground = ({ children }:{ children: React.ReactNode }) => {
    return (
        <div className="min-h-[35rem] h-auto bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden container ">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Floating Particles */}
                {Array.from({ length: 50 }, (_, i) => (
                    <div
                        key={i}
                        className="absolute w-2 h-2 opacity-60 animate-bounce"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    >🦜</div>
                ))}

                {/* Grid Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: `linear-gradient(rgba(255,107,53,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,180,219,0.1) 1px, transparent 1px)`,
                            backgroundSize: '50px 50px'
                        }}
                    />
                </div>

                {/* Glow Effects */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-orange-500/20 to-transparent rounded-full blur-3xl animate-pulse" />
                <div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-l from-cyan-500/20 to-transparent rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: '1s' }}
                />
            </div>
            {children}
        </div>
    )
}

export default AppBackground