import Link from "next/link";
import { ArrowLeft, ShieldCheck, LayoutGrid, Users, Terminal } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#020617] text-white p-6 md:p-10 relative overflow-hidden font-space selection:bg-red-500/30">
      
      {/* Admin Background: Red/Dark Grid to distinguish from User Dashboard */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(220,38,38,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(220,38,38,0.03)_1px,transparent_1px)] bg-[size:40px_40px] -z-10" />
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none -z-10" />
      
      {/* Top Command Bar */}
      <nav className="relative z-50 bg-[#0f172a]/60 backdrop-blur-xl border border-white/5 rounded-[24px] p-4 flex flex-col md:flex-row items-center justify-between mb-10 gap-4 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        
        {/* Logo / Identity */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#020617] border border-red-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.3)]">
            <ShieldCheck className="text-red-500" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold font-sync text-white tracking-widest uppercase">
                Admin<span className="text-red-500">Console</span>
            </h1>
            <p className="text-[10px] text-gray-500 font-mono font-bold tracking-[0.2em] flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                SYSTEM_ACCESS_GRANTED
            </p>
          </div>
        </div>

        {/* Navigation Modules */}
        <div className="flex items-center gap-1 bg-black/40 p-1.5 rounded-xl border border-white/5">
          <Link href="/user-task/admin" className="px-5 py-2.5 rounded-lg text-xs font-bold font-sync uppercase tracking-wide text-gray-400 hover:bg-white/10 hover:text-white flex items-center gap-2 transition-all">
            <LayoutGrid size={14} /> Quests
          </Link>
          <div className="w-px h-6 bg-white/10 mx-1"></div>
          <Link href="/user-task/admin/users" className="px-5 py-2.5 rounded-lg text-xs font-bold font-sync uppercase tracking-wide text-gray-400 hover:bg-white/10 hover:text-white flex items-center gap-2 transition-all">
            <Users size={14} /> Users
          </Link>
        </div>

        {/* Exit Button */}
        <Link href="/user-task/dashboard" className="px-5 py-2.5 text-xs font-bold font-sync uppercase tracking-wider text-gray-400 hover:text-[#00D2FF] flex items-center gap-2 transition-colors border border-transparent hover:border-[#00D2FF]/20 hover:bg-[#00D2FF]/5 rounded-xl group">
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> EXIT TO APP
        </Link>
      </nav>

      {/* Main Content Render */}
      <div className="max-w-[1600px] mx-auto relative z-10">
        {children}
      </div>
    </div>
  );
}