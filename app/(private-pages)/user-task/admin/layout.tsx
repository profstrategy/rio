import Link from "next/link";
import { ArrowLeft, ShieldCheck, LayoutGrid, Users } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-white p-6 md:p-10 relative">
      
      {/* Admin Background: Slightly darker/grid-like to distinguish from User Dashboard */}
      <div className="fixed inset-0 bg-obsidian-950 -z-20" />
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] -z-10" />
      
      {/* Top Command Bar */}
      <nav className="glass-panel rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
        
        {/* Logo / Identity */}
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.5)]">
            <ShieldCheck className="text-white" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-widest uppercase">Admin<span className="text-red-500">Console</span></h1>
            <p className="text-[10px] text-gray-400 font-mono tracking-widest">SYSTEM_ACCESS_GRANTED_Lvl_99</p>
          </div>
        </div>

        {/* Navigation Modules */}
        <div className="flex items-center gap-2 bg-black/30 p-1 rounded-xl border border-white/5">
          <Link href="/" className="px-4 py-2 rounded-lg text-sm font-bold text-gray-300 hover:bg-white/10 hover:text-white flex items-center gap-2 transition-all">
            <LayoutGrid size={16} /> Quests
          </Link>
          <Link href="/users" className="px-4 py-2 rounded-lg text-sm font-bold text-gray-300 hover:bg-white/10 hover:text-white flex items-center gap-2 transition-all">
            <Users size={16} /> Dreamers
          </Link>
        </div>

        {/* Exit Button */}
        <Link href="/" className="px-4 py-2 text-xs font-bold text-gray-400 hover:text-neon-cyan flex items-center gap-2 transition-colors border border-transparent hover:border-neon-cyan/30 rounded-lg">
          <ArrowLeft size={14} /> EXIT TO APP
        </Link>
      </nav>

      {/* Main Content Render */}
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}