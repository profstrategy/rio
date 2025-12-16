import { DashboardCardProps } from "@/constants/types";

const DashboardCard = ({ title, children, delay = 0, height = 'h-full' }:DashboardCardProps) => {
    return (
  <div 
    className={`relative overflow-hidden rounded-2xl p-6 ${height} transition-all duration-300 hover:shadow-2xl`}
    style={{
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(184, 235, 254, 0.1) 100%)',
      border: '1px solid rgba(56, 189, 248, 0.3)',
      backdropFilter: 'blur(10px)',
      animation: `fadeInUp 0.6s ease-out ${delay}s both`
    }}
  >
    <div className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-5"
      style={{
        background: 'radial-gradient(circle, #00B4DB 0%, transparent 70%)',
        filter: 'blur(30px)'
      }}
    />
    
    <div className="relative z-10 h-full flex flex-col">
      <h3 className="text-lg font-bold mb-4" style={{ color: '#0284c7' }}>
        {title}
      </h3>
      <div className="flex-1">
        {children}
      </div>
    </div>
  </div>
)
}

export default DashboardCard