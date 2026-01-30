import TaskCard from "@/components/ui/task-card";
import { getTasks } from "../../actions/tasks";

export default async function TasksPage() {
  const tasks = await getTasks();

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 text-glow">Dream Quests</h1>
        <p className="text-gray-400">Complete actions to earn Dream Points and elevate your status.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            description={task.description}
            rewardPoints={task.rewardPoints}
            actionUrl={task.actionUrl}
            category={task.category} // <--- IMPORTANT: Pass the category
            isCompleted={task.isCompleted}
          />
        ))}

        {tasks.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            No active quests right now. Check back later.
          </div>
        )}
      </div>
    </div>
  );
}