import { TaskType } from "@/app/types/task";
import { Card, CardContent } from "@/components/ui/card";

export function DashboardStatsView({ tasks }: { tasks: TaskType[] }) {
  const stats = [
    { label: "All Tasks", value: tasks.length },
    {
      label: "Pending",
      value: tasks.filter(t => t.status === "pending").length,
    },
    {
      label: "In Progress",
      value: tasks.filter(t => t.status === "in-progress").length,
    },
    {
      label: "Completed",
      value: tasks.filter(t => t.status === "completed").length,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="px-6 py-4">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <h2 className="text-2xl font-bold">{stat.value}</h2>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
