'use client'; // Ensure this is at the top
import { useState } from 'react';
import AppButton from '../ui/app-button';
import { Spinner } from '../ui/spinner';
import { useTwitterOAuth } from '@/hooks/use-twitter-oauth';
import { useRouter } from 'next/navigation';

// 1. Define the type for your props (if using TypeScript)
interface NavbarProps {
  openDialog?: () => void; // Optional function
}

// 2. Add curly braces { } to destructure openDialog from props
const Navbar = ({ openDialog }: NavbarProps) => {
  const [idoModalOpen, setIdoModalOpen] = useState(false);
  const { session, handleConnectTwitter, handleDashboard } = useTwitterOAuth();
  const router =useRouter()

  return (
    <>
    <nav className="fixed top-0 w-full z-[100] px-6 py-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center glass-premium rounded-full px-8 py-3">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="/logo.png" className="w-10 h-10 rounded-full border border-blue-500 shadow-lg" alt="Logo" />
          <span className="font-sync text-xl font-bold tracking-tighter">$RIO</span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.4em] font-bold text-gray-400">
          <a href="#home" className="hover:text-white transition">Home</a>
          <a href="#ido" className="hover:text-white transition">IDO</a>
          <a href="#tokenomics" className="hover:text-white transition">Economics</a>
          <a href="#roadmap" className="hover:text-white transition">Path</a>
        </div>

        {/* Connect Button */}
        <AppButton 
            // 3. Cleaned up classes: removed invalid 'w-50' and fixed height
            className="px-6 py-2 text-white text-sm font-medium border-b-2 border-white/20 min-w-[140px] !h-auto !p-0"
           onClick={session.status === 'authenticated' ? () => router.push('/user-task/dashboard') : handleConnectTwitter}
            // 4. Pass loading state to AppButton so it disables itself
            loading={session.status === 'loading'}
        >
            {session.status === 'loading' ? <Spinner /> : session.status === 'authenticated' ? 'Dashboard' : 'Connect X'}
        </AppButton>

      </div>
    </nav>

     {/* --- MODAL --- */}
      {idoModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIdoModalOpen(false)}
          ></div>

          {/* Modal Content */}
          <div className="relative glass-premium p-8 md:p-12 rounded-[40px] max-w-md w-full text-center border border-blue-500/30 shadow-[0_0_100px_rgba(0,210,255,0.2)] animate-float">
            <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-blue-400 text-blue-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
              </svg>
            </div>
            <h3 className="font-sync text-2xl md:text-3xl font-bold mb-2 uppercase">Systems Cooling</h3>
            <p className="text-blue-400 text-xs font-bold uppercase tracking-[0.2em] mb-6">Launchpad Initiating...</p>
            <p className="text-gray-400 leading-relaxed mb-8">
              The portal is currently fueling up. Wallet connections will go live immediately upon <strong>IDO Launch (Jan 20)</strong>.
            </p>
            <button 
              onClick={() => setIdoModalOpen(false)}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-green-400 rounded-xl font-bold text-black uppercase tracking-widest hover:scale-105 transition-transform btn-glow"
            >
              Roger That
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;