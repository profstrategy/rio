import TaskCard from "@/components/ui/task-card";
import { getTasks } from "../../actions/tasks";
import { Target, AlertCircle, Layers } from "lucide-react";

export default async function TasksPage() {
  const tasks = await getTasks();

  // Calculate active count for the header badge
  const activeCount = tasks.filter(t => !t.isCompleted).length;

  return (
    <div className="space-y-8 pb-10 relative">
      
      {/* Ambient Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00D2FF]/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-8">
        <div>
           <h1 className="text-4xl font-extrabold font-sync text-white mb-3 uppercase tracking-wide">
             Active <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00D2FF] to-[#3AFFAD]">Protocols</span>
           </h1>
           <p className="text-gray-400 font-space text-sm max-w-2xl leading-relaxed">
             Execute daily missions to accumulate Dream Points (PTS). Consistency is required to elevate your clearance level.
           </p>
        </div>
        
        {/* Status Badge */}
        <div className="px-5 py-2.5 rounded-xl bg-[#0f172a]/60 backdrop-blur-md border border-white/10 flex items-center gap-3 shadow-[0_0_20px_rgba(0,0,0,0.2)]">
            <div className="p-1.5 rounded-lg bg-[#00D2FF]/10 text-[#00D2FF]">
                <Target size={16} />
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] font-bold font-sync text-gray-500 uppercase tracking-widest">Available</span>
                <span className="text-sm font-bold font-mono text-white">{activeCount} Missions</span>
            </div>
        </div>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 gap-5">
        {tasks.length > 0 ? (
            tasks.map((task) => (
            <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                rewardPoints={task.rewardPoints}
                actionUrl={task.actionUrl}
                category={task.category}
                isCompleted={task.isCompleted}
            />
            ))
        ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-24 text-center border-2 border-dashed border-white/5 rounded-[30px] bg-[#020617]/30 hover:border-white/10 transition-colors">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 text-gray-600 border border-white/5 shadow-inner">
                    <Layers size={32} />
                </div>
                <h3 className="text-white font-sync font-bold uppercase tracking-widest text-sm mb-2">System Standby</h3>
                <p className="text-gray-500 font-space text-sm max-w-md mx-auto">
                    No active protocols detected at this time. <br/> 
                    Check back later for new mission parameters.
                </p>
            </div>
        )}
      </div>
    </div>
  );
}