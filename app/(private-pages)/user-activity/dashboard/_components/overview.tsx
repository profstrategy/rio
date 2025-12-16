'use client';
import { AppHeading } from "@/components/reusables/app-heading";
import DashboardCard from "@/components/reusables/dashboard-card";
import MetricCard from "@/components/reusables/metric-card";
import AppButton from "@/components/ui/app-button";
import { Heart, MessageCircle, Repeat2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { BsTwitterX } from "react-icons/bs";

const Overview = () => {
  const session = useSession()

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8"
      style={{
        background: 'radial-gradient(ellipse at top right, #0284c7 0%, #0369a1 40%, #0c4a6e 100%)'
      }}>
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
      
      <div className="container mx-auto">
        {/* Header */}
        <div className=" rounded-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(184, 235, 254, 0.05) 100%)',
            border: '1px solid rgba(56, 189, 248, 0.2)',
            backdropFilter: 'blur(20px)',
            animation: 'fadeInUp 0.4s ease-out',
            padding: '1rem',
          }}>
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* <div className="p-3 rounded-xl logo-float"
                style={{
                  background: 'linear-gradient(135deg, #00B4DB 0%, #0284c7 100%)',
                  boxShadow: '0 8px 20px rgba(0, 180, 219, 0.4)'
                }}>
                <BsTwitterX className="w-4 h-4 text-white" />
              </div> */}
              <div>
                <AppHeading className=" text-2xl sm:text-3xl font-bold text-white">
                  Dashboard
                </AppHeading>
                <p className="text-sm mt-1" style={{ color: '#b8ebfe' }}>
                  {session?.data?.user.name || 'User'}'s Activity Overview
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
          <MetricCard 
            icon={BsTwitterX}
            label="Total Tweets"
            value="1,247"
            trend="+12.5%"
            delay={0.1}
          />
          <MetricCard 
            icon={Repeat2}
            label="Total Retweets"
            value="3,892"
            trend="+18.3%"
            delay={0.2}
          />
          <MetricCard 
            icon={Heart}
            label="Total Likes"
            value="15,634"
            trend="+24.7%"
            delay={0.3}
          />
          <MetricCard 
            icon={MessageCircle}
            label="Total Comments"
            value="2,156"
            trend="+9.2%"
            delay={0.4}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 mb-6">
          <div className="lg:col-span-8">
            <DashboardCard title="Engagement Overview" delay={0.5}>
              <div className="h-64 sm:h-80 flex items-center justify-center rounded-xl"
                style={{
                  background: 'linear-gradient(135deg, rgba(184, 235, 254, 0.1) 0%, rgba(56, 189, 248, 0.05) 100%)',
                  border: '2px dashed rgba(56, 189, 248, 0.3)'
                }}>
                <p className="text-sm font-medium" style={{ color: '#64748b' }}>
                  Graph Chart Placeholder
                </p>
              </div>
            </DashboardCard>
          </div>
          
          <div className="lg:col-span-4">
            <DashboardCard title="Recent Comments" delay={0.6}>
              <div className="space-y-3 h-64 sm:h-80 overflow-auto pr-2">
                {[1, 2, 3, 4].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl transition-all hover:scale-102"
                    style={{
                      background: 'linear-gradient(135deg, rgba(184, 235, 254, 0.1) 0%, rgba(56, 189, 248, 0.05) 100%)',
                      border: '1px solid rgba(56, 189, 248, 0.2)'
                    }}>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full shrink-0"
                        style={{ background: 'linear-gradient(135deg, #00B4DB 0%, #0284c7 100%)' }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold mb-1" style={{ color: '#0284c7' }}>
                          User {item}
                        </p>
                        <p className="text-xs" style={{ color: '#64748b' }}>
                          Comment placeholder text...
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </DashboardCard>
          </div>
        </div>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          <div className="lg:col-span-8">
            <DashboardCard title="Recent Tweets (48hrs)" delay={0.7}>
              <div className="space-y-3 h-64 overflow-auto pr-2">
                {[1, 2, 3].map((item, i) => (
                  <div key={i} className="p-4 rounded-xl transition-all hover:scale-102"
                    style={{
                      background: 'linear-gradient(135deg, rgba(184, 235, 254, 0.1) 0%, rgba(56, 189, 248, 0.05) 100%)',
                      border: '1px solid rgba(56, 189, 248, 0.2)'
                    }}>
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full shrink-0"
                        style={{ background: 'linear-gradient(135deg, #00B4DB 0%, #0284c7 100%)' }} />
                      <div className="flex-1">
                        <p className="text-sm font-semibold mb-1" style={{ color: '#0284c7' }}>
                          @user{item}
                        </p>
                        <p className="text-sm mb-2" style={{ color: '#475569' }}>
                          Tweet content about $RIO goes here...
                        </p>
                        <div className="flex gap-4 text-xs" style={{ color: '#94a3b8' }}>
                          <span>❤️ 124</span>
                          <span>🔄 45</span>
                          <span>💬 12</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </DashboardCard>
          </div>
          
          <div className="lg:col-span-4">
            <DashboardCard title="Top Retweeters" delay={0.8}>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl transition-all hover:scale-102"
                    style={{
                      background: 'linear-gradient(135deg, rgba(184, 235, 254, 0.1) 0%, rgba(56, 189, 248, 0.05) 100%)',
                      border: '1px solid rgba(56, 189, 248, 0.2)'
                    }}>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ background: 'linear-gradient(135deg, #00B4DB 0%, #0284c7 100%)' }}>
                        {i + 1}
                      </div>
                      <span className="text-sm font-medium" style={{ color: '#0284c7' }}>
                        @user{item}
                      </span>
                    </div>
                    <span className="text-sm font-bold" style={{ color: '#00B4DB' }}>
                      {Math.floor(Math.random() * 500) + 100}
                    </span>
                  </div>
                ))}
              </div>
            </DashboardCard>
          </div>
        </div>
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
    </div>
  );
};

export default Overview;