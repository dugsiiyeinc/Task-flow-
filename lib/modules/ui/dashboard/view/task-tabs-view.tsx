"use client";

import { useState, useTransition } from "react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { TaskListview } from "./task-list-view";
import { TaskType } from "@/app/types/task";
import { updateTaskStatusAction } from "@/app/actions/update-status";

export function TaskTabsView({ tasks }: { tasks: TaskType[] }) {
  const [taskList, setTaskList] = useState(tasks);
  const [pending, startTransition] = useTransition();

  
const handleStatusChange = (id: string) => {
  setTaskList(prev =>
    prev.map(task => {
      if (task._id === id) {
        let newStatus = task.status;

        if (task.status === "pending") newStatus = "in-progress";
        else if (task.status === "in-progress") newStatus = "completed";

        // 🔥 update DB
        startTransition(() => {
          updateTaskStatusAction(id, newStatus);
        });

        return { ...task, status: newStatus };
      }
      return task;
    })
  );
};
const handleDelete = (id: string) => {
  setTaskList(prev => prev.filter(task => task._id !== id));
};


  return (
    <Tabs defaultValue="all" className="my-6">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="in-progress">In Progress</TabsTrigger>
        <TabsTrigger value="completed">Completed</TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        <TaskListview 
           tasks={taskList} 
           onStatusChange={handleStatusChange}
           onDelete={handleDelete} 
        />
      </TabsContent>

      <TabsContent value="pending">
        <TaskListview
          tasks={taskList.filter(t => t.status === "pending")}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      </TabsContent>

      <TabsContent value="in-progress">
        <TaskListview
          tasks={taskList.filter(t => t.status === "in-progress")}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      </TabsContent>

      <TabsContent value="completed">
        <TaskListview
          tasks={taskList.filter(t => t.status === "completed")}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      </TabsContent>
    </Tabs>
  );
}
