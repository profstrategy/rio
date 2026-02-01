import { prisma } from "@/lib/prisma";
import { Trash2, Plus, Sparkles, Link as LinkIcon, Layers } from "lucide-react";
import { createTask, deleteTask } from "../actions/admin";

export default async function AdminTasksPage() {
  const tasks = await prisma.task.findMany({ orderBy: { createdAt: 'desc' } });

  // STYLES CONSTANTS
  const styles = {
    input: "w-full bg-[#020617]/50 border border-white/10 focus:border-[#00D2FF]/50 focus:ring-1 focus:ring-[#00D2FF]/50 rounded-xl p-3 text-white placeholder-gray-600 transition-all outline-none font-space text-sm",
    label: "text-[10px] font-bold font-sync text-gray-400 uppercase tracking-widest ml-1 mb-1 block",
    glassPanel: "bg-[#0f172a]/60 backdrop-blur-xl border border-white/5"
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      
      {/* LEFT COLUMN: The "Quest Fabricator" (Form) */}
      <div className="xl:col-span-1 space-y-6">
        <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-[#00D2FF]/10 border border-[#00D2FF]/30 text-[#00D2FF]">
                <Sparkles size={18} />
            </div>
            <h2 className="text-lg font-bold font-sync text-white uppercase tracking-wide">Fabricate Quest</h2>
        </div>

        <form action={createTask} className={`${styles.glassPanel} p-6 rounded-[24px] space-y-5 relative overflow-hidden`}>
          {/* Subtle Form Background Effect */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D2FF]/10 blur-[50px] rounded-full pointer-events-none" />

          <div className="relative z-10">
            <label className={styles.label}>Mission Title</label>
            <input 
                name="title" 
                required 
                className={styles.input} 
                placeholder="e.g. Protocol Initialization" 
            />
          </div>
          
          <div className="relative z-10">
            <label className={styles.label}>Briefing</label>
            <textarea 
                name="description" 
                required 
                rows={3}
                className={`${styles.input} resize-none`} 
                placeholder="Describe the objective..." 
            />
          </div>

          <div className="grid grid-cols-2 gap-4 relative z-10">
            <div>
              <label className={styles.label}>Reward</label>
              <div className="relative">
                <input 
                    name="points" 
                    type="number" 
                    required 
                    className={`${styles.input} pl-3 font-mono`} 
                    placeholder="100" 
                />
                <span className="absolute right-3 top-3 text-[10px] text-[#00D2FF] font-bold tracking-wider">PTS</span>
              </div>
            </div>
            <div>
              <label className={styles.label}>Type</label>
              <select name="category" className={`${styles.input} appearance-none cursor-pointer`}>
                <option value="Social">Social</option>
                <option value="Daily">Daily</option>
                <option value="Partner">Partner</option>
                <option value="Referral">Referral</option>
              </select>
            </div>
          </div>

          <div className="relative z-10">
            <label className={styles.label}>Target URL</label>
            <div className="relative">
                <LinkIcon size={14} className="absolute left-3 top-3.5 text-gray-500" />
                <input 
                    name="url" 
                    className={`${styles.input} pl-9 font-mono text-xs`} 
                    placeholder="https://..." 
                />
            </div>
          </div>

          <button type="submit" className="w-full group relative overflow-hidden bg-gradient-to-r from-[#00D2FF] to-[#0099ff] p-3.5 rounded-xl font-bold font-sync text-[#020617] uppercase tracking-wider shadow-[0_0_20px_rgba(0,210,255,0.3)] hover:shadow-[0_0_30px_rgba(0,210,255,0.5)] hover:scale-[1.02] transition-all mt-2">
            <span className="relative z-10 flex items-center justify-center gap-2">
                <Plus size={18} /> Initialize Quest
            </span>
            <div className="absolute inset-0 bg-white/30 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </form>
      </div>

      {/* RIGHT COLUMN: The "Database Grid" (List) */}
      <div className="xl:col-span-2 space-y-6">
        <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400">
                    <Layers size={18} />
                </div>
                <h2 className="text-lg font-bold font-sync text-white uppercase tracking-wide">
                    Active Database 
                    <span className="text-gray-500 text-xs font-space normal-case ml-3 tracking-normal">({tasks.length} entries)</span>
                </h2>
            </div>
        </div>

        <div className={`${styles.glassPanel} rounded-[24px] overflow-hidden p-1`}>
            <div className="max-h-[80vh] overflow-y-auto space-y-1 pr-1 custom-scrollbar">
            {tasks.map((task) => (
                <div key={task.id} className="group flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                
                <div className="flex items-center gap-5">
                    {/* Points Badge */}
                    <div className="w-14 h-14 rounded-xl bg-[#020617] border border-white/10 flex flex-col items-center justify-center text-[#00D2FF] group-hover:border-[#00D2FF]/50 group-hover:shadow-[0_0_15px_rgba(0,210,255,0.15)] transition-all">
                        <span className="font-bold font-space text-lg">{task.rewardPoints}</span>
                        <span className="text-[8px] font-sync uppercase tracking-widest text-gray-500">PTS</span>
                    </div>

                    <div>
                        <h4 className="font-bold font-sync text-white text-sm md:text-base uppercase tracking-wide group-hover:text-[#00D2FF] transition-colors">
                            {task.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-3 mt-1.5">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 uppercase tracking-widest">
                                {task.category}
                            </span>
                            <span className="text-xs text-gray-600 truncate max-w-[150px] md:max-w-[300px] font-mono hover:text-gray-400 transition-colors">
                                {task.actionUrl || "No Link Attached"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 pl-4">
                    <form action={deleteTask}>
                        <input type="hidden" name="id" value={task.id} />
                        <button 
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-gray-600 bg-white/5 border border-white/5 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-all"
                            title="Terminate Quest"
                        >
                            <Trash2 size={18} />
                        </button>
                    </form>
                </div>

                </div>
            ))}
            
            {tasks.length === 0 && (
                <div className="p-12 text-center border-2 border-dashed border-white/5 rounded-2xl m-4 flex flex-col items-center justify-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-600">
                        <Layers size={24} />
                    </div>
                    <p className="text-gray-500 font-space text-sm">Database Empty. Initialize new protocols.</p>
                </div>
            )}
            </div>
        </div>
      </div>
      
    </div>
  );
}