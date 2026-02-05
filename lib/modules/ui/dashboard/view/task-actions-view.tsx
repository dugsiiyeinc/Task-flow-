"use client";

import { MoreVertical, Pencil, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { TaskType } from "@/app/types/task";
import { useTransition } from "react";
import { deleteTaskAction } from "@/app/actions/delete";

export function TaskActions({ task, onDelete }: { task: TaskType; onDelete: (id:string)=>void }) {
  const [pending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(() => {
      deleteTaskAction(task._id);
      onDelete(task._id); 
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={handleDelete}
          disabled={pending}
          className="text-destructive"
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
