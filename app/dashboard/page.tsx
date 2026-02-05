import { fetchTasks } from "@/lib/db/task";
import { CreateTaskFormCard } from "@/lib/modules/ui/dashboard/view/create-task-command";
import { DashboardStatsView } from "@/lib/modules/ui/dashboard/view/dashboard-stats-view";
import { TaskTabsView } from "@/lib/modules/ui/dashboard/view/task-tabs-view"; 
// ⬆️ adjust path if needed

export default async function DashboardPage() {
  const tasks = await fetchTasks();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Track and manage your tasks
          </p>
        </div>

        {/* ✅ Create Task Button */}
        <CreateTaskFormCard/>
      </div>

      <DashboardStatsView tasks={tasks} />
      <TaskTabsView tasks={tasks} />
    </div>
  );
}
