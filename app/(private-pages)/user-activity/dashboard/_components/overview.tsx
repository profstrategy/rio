'use client';
import { AppHeading } from "@/components/reusables/app-heading";
import NavigateButton from "@/components/reusables/navigate-button";
import AppButton from "@/components/ui/app-button";
import { useSession } from "next-auth/react";
import Metrics from "./metrics";
import Contents from "./contents";
import { RioActivityMetricsResponse } from "@/app/api/user/dashboard-activity-metrics/types";
import { LogOut, User as UserIcon } from "lucide-react"; //  - Optional icon for better UI
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";  

interface OverviewProps {
  overview?: RioActivityMetricsResponse
}

const Overview = ({ overview }: OverviewProps) => {
  const session = useSession();
  const router = useRouter()

  // --- RIO THEME STYLES ---
  const styles = {
    // Deep space background with selection highlight
    pageWrapper: "min-h-screen bg-[#020617] text-white font-space selection:bg-[#00D2FF]/30 pt-20 pb-8 px-4 md:px-8 relative overflow-hidden",
    // Premium glass effect for header
    glassHeader: "bg-[#0f172a]/60 backdrop-blur-xl border border-white/10 rounded-[30px] shadow-[0_0_50px_rgba(0,0,0,0.5)] p-6 md:p-8 animate-fade-in-up",
    // Typography
    title: "font-sync font-bold text-2xl sm:text-4xl text-white uppercase tracking-wider",
    subtitle: "font-space text-sm text-[#00D2FF]/80 mt-1 tracking-wide flex items-center gap-2",
    // Avatar styling
    avatarContainer: "w-14 h-14 rounded-full border-2 border-[#00D2FF] shadow-[0_0_20px_rgba(0,210,255,0.3)] bg-[#00D2FF]/10 flex items-center justify-center overflow-hidden relative",
    avatarText: "font-sync font-bold text-white text-lg",
    // Button styling
    signOutBtn: "px-6 py-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-red-500/50 hover:text-red-400 text-gray-400 font-sync text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-300"
  };

  return (
    <div className={styles.pageWrapper}>
      
      {/* 1. Background Ambience (RIO Globs) */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#00D2FF]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-[#3AFFAD]/5 rounded-full blur-[120px]" />
      </div>

      <div className=" mx-auto flex flex-col gap-8 relative z-10">
        

        
    
      
      {/* --- FIXED HEADER --- */}
      <header className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 py-4 bg-[#020617]/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <button
            onClick={() => router.push(`/`)}
            className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md hover:bg-[#00D2FF]/10 hover:border-[#00D2FF]/50 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
          >
            <ArrowLeft className="w-4 h-4 text-gray-400 group-hover:text-[#00D2FF] transition-colors" />
            <span className="font-sync text-xs font-bold uppercase tracking-widest text-gray-300 group-hover:text-white transition-colors">
              Back to Home
            </span>
          </button>

          {/* Optional: You could add the RIO logo here in the center or right */}
          <div className="hidden md:block font-sync font-bold text-[#00D2FF] tracking-tighter text-xl">
             $RIO
          </div>
        </div>
      </header>



        {/* 2. Header Section */}
        <div className={styles.glassHeader}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            {/* User Info */}
            <div className="flex items-center gap-5">
              {/* Avatar */}
              <div className={styles.avatarContainer}>
                 {session.data?.user?.image ? (
                   <img src={session.data.user.image} alt="Profile" className="w-full h-full object-cover" />
                 ) : (
                   <span className={styles.avatarText}>
                      {session.data?.user?.username?.charAt(0).toUpperCase() || 'U'}
                   </span>
                 )}
                 {/* Online Dot */}
                 <div className="absolute bottom-1 right-1 w-3 h-3 bg-[#3AFFAD] border-2 border-[#020617] rounded-full shadow-[0_0_10px_#3AFFAD]"></div>
              </div>

              <div>
                <AppHeading className={styles.title}>
                  Dashboard
                </AppHeading>
                <p className={styles.subtitle}>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00D2FF] animate-pulse" />
                  {session?.data?.user.username || 'User'}'s Activity Overview
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 w-full md:w-auto justify-end">
              <AppButton
                variant="primary" // Assuming primary maps to a basic style, overriding with className below
                className={styles.signOutBtn}
                // Retaining original Sign Out functionality
                onClick={() => {/* Original Logic would go here if passed down */}} 
              >
                <span className="flex items-center gap-2">
                   Sign Out <LogOut className="w-3 h-3" />
                </span>
              </AppButton>
            </div>
          </div>
        </div>

        {/* 3. Metrics Grid */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
           <Metrics data={overview?.data.metrics} />
        </div>
        
        {/* 4. Main Content Grid */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
           <Contents />
        </div>
      
      </div>

      {/* 5. Custom Animations (Preserved) */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
      `}</style>

      {/* <NavigateButton /> */}
    </div>
  );
};

export default Overview;