"use client";

import { TaskType } from "@/app/types/task";
import { TaskActions } from "./task-actions-view";
import { Button } from "@/components/ui/button";

type Props = {
  tasks: TaskType[];
  onStatusChange: (id: string) => void;
  onDelete: (id: string) => void;
};

export function TaskListview({ tasks, onStatusChange,onDelete }: Props) {
  if (!tasks.length) {
    return <p className="text-sm text-muted-foreground mt-6">No tasks found</p>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-1 mt-4">
      {tasks.map(task => {
        let btnStatus = "";
        if (task.status === "pending") btnStatus = "Mark In Progress";
        else if (task.status === "in-progress") btnStatus = "Mark Completed";

        return (
          <div key={task._id} className="rounded-lg border p-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{task.title}</h3>
              <TaskActions task={task} onDelete={onDelete}/>
            </div>
            <p>{task.description}</p>
            <p className="text-sm text-muted-foreground mt-2">Status: {task.status}</p>
            {btnStatus && (
              <Button onClick={() => onStatusChange(task._id)}>{btnStatus}</Button>
            )}
          </div>
        );
      })}
    </div>
  );
}
