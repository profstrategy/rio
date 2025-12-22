'use client';
import { AppHeading } from "@/components/reusables/app-heading";
import NavigateButton from "@/components/reusables/navigate-button";
import AppButton from "@/components/ui/app-button";
import { useSession } from "next-auth/react";
import Metrics from "./metrics";
import Contents from "./contents";

const Overview = () => {
  const session = useSession()

  const parentDivStyle = {
    background: 'radial-gradient(ellipse at top right, #0284c7 0%, #0369a1 40%, #0c4a6e 100%)',
    minHeight: '100vh',
    paddingTop: '4rem',
    paddingBottom: '1rem',
  }
  const headerDivStyle = {
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(184, 235, 254, 0.05) 100%)',
    border: '1px solid rgba(56, 189, 248, 0.2)',
    backdropFilter: 'blur(20px)',
    animation: 'fadeInUp 0.4s ease-out',
    padding: '1rem',
  }
  return (
    <div className=""
      style={parentDivStyle}>
      <div className="container mx-auto flex flex-col gap-6 my-2">
        {/* Header */}
        <div className=" rounded-2xl"
          style={headerDivStyle}>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div>
                <AppHeading className=" text-2xl sm:text-3xl font-bold text-white">
                  Dashboard
                </AppHeading>
                <p className="text-sm mt-1" style={{ color: '#b8ebfe' }}>
                  {session?.data?.user.username || 'User'}'s Activity Overview
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full justify-end">
              <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-offset-2"
                style={{
                  background: 'linear-gradient(135deg, #00B4DB 0%, #0284c7 100%)'
                }}
              >
                <div className="w-full h-full flex items-center justify-center text-white font-bold">
                  U
                </div>
              </div>
              <AppButton
                variant="primary"
                className="text-white font-semibold hover:scale-105 w-32 transition-all"
              >
                Sign Out
              </AppButton>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <Metrics />
        
        {/* Main Content Grid */}
        <Contents />
      </div>
      <style>{`
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
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .logo-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
      <NavigateButton />
    </div>
  );
};

export default Overview;