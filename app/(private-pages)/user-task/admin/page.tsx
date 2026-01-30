import prisma from "@/lib/prisma";
import { Trash2, Plus, Sparkles, Link as LinkIcon } from "lucide-react";
import { createTask, deleteTask } from "@/actions/admin";

export default async function AdminTasksPage() {
  const tasks = await prisma.task.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      
      {/* LEFT COLUMN: The "Quest Fabricator" (Form) */}
      <div className="xl:col-span-1 space-y-6">
        <div className="flex items-center gap-2 mb-2">
            <Sparkles className="text-neon-cyan" size={20} />
            <h2 className="text-xl font-bold text-white">Fabricate Quest</h2>
        </div>

        <form action={createTask} className="glass-panel p-6 rounded-2xl space-y-5 relative overflow-hidden">
          {/* Subtle Form Background Effect */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-neon-cyan/10 blur-[50px] rounded-full pointer-events-none" />

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Mission Title</label>
            <input 
                name="title" 
                required 
                className="w-full bg-obsidian-950/50 border border-white/10 focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 rounded-xl p-3 text-white placeholder-gray-600 transition-all outline-none" 
                placeholder="e.g. Protocol Initialization" 
            />
          </div>
          
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Briefing</label>
            <textarea 
                name="description" 
                required 
                rows={3}
                className="w-full bg-obsidian-950/50 border border-white/10 focus:border-neon-cyan/50 focus:ring-1 focus:ring-neon-cyan/50 rounded-xl p-3 text-white placeholder-gray-600 transition-all outline-none resize-none" 
                placeholder="Describe the objective..." 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Reward</label>
              <div className="relative">
                <input 
                    name="points" 
                    type="number" 
                    required 
                    className="w-full bg-obsidian-950/50 border border-white/10 focus:border-neon-cyan/50 rounded-xl p-3 pl-3 text-white transition-all outline-none font-mono" 
                    placeholder="100" 
                />
                <span className="absolute right-3 top-3 text-xs text-neon-cyan font-bold">PTS</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Type</label>
              <select name="category" className="w-full bg-obsidian-950/50 border border-white/10 focus:border-neon-cyan/50 rounded-xl p-3 text-white transition-all outline-none appearance-none">
                <option value="Social">Social</option>
                <option value="Daily">Daily</option>
                <option value="Partner">Partner</option>
                <option value="Referral">Referral</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Target URL</label>
            <div className="relative">
                <LinkIcon size={16} className="absolute left-3 top-3.5 text-gray-500" />
                <input 
                    name="url" 
                    className="w-full bg-obsidian-950/50 border border-white/10 focus:border-neon-cyan/50 rounded-xl p-3 pl-10 text-white placeholder-gray-600 transition-all outline-none font-mono text-sm" 
                    placeholder="https://..." 
                />
            </div>
          </div>

          <button type="submit" className="w-full group relative overflow-hidden bg-gradient-to-r from-neon-cyan to-neon-blue p-3 rounded-xl font-bold text-obsidian-950 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all">
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
            <h2 className="text-xl font-bold text-white">Active Database <span className="text-gray-500 text-sm font-normal ml-2">({tasks.length} entries)</span></h2>
        </div>

        <div className="glass-panel rounded-2xl overflow-hidden p-1">
            <div className="max-h-[80vh] overflow-y-auto space-y-1 pr-1 custom-scrollbar">
            {tasks.map((task) => (
                <div key={task.id} className="group flex items-center justify-between p-4 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                
                <div className="flex items-center gap-4">
                    {/* Points Badge */}
                    <div className="w-12 h-12 rounded-lg bg-obsidian-950 border border-white/10 flex flex-col items-center justify-center text-neon-cyan group-hover:border-neon-cyan/50 transition-colors">
                        <span className="font-bold text-lg">{task.rewardPoints}</span>
                        <span className="text-[8px] uppercase tracking-wider text-gray-500">PTS</span>
                    </div>

                    <div>
                        <h4 className="font-bold text-white text-lg group-hover:text-neon-cyan transition-colors">{task.title}</h4>
                        <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 uppercase tracking-wide">
                                {task.category}
                            </span>
                            <span className="text-xs text-gray-500 truncate max-w-[200px] font-mono">
                                {task.actionUrl || "No URL"}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <form action={deleteTask}>
                        <input type="hidden" name="id" value={task.id} />
                        <button 
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all"
                            title="Terminate Quest"
                        >
                            <Trash2 size={18} />
                        </button>
                    </form>
                </div>

                </div>
            ))}
            
            {tasks.length === 0 && (
                <div className="p-10 text-center text-gray-500 border-2 border-dashed border-white/5 rounded-xl m-4">
                    Database Empty. Initialize new protocols.
                </div>
            )}
            </div>
        </div>
      </div>
      
    </div>
  );
}