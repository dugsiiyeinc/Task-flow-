"use client";

import { useState, useTransition } from "react";
import { createTaskAction } from "@/app/actions/create";
import { Button } from "@/components/ui/button";

export function CreateTaskFormCard() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [pending, startTransition] = useTransition();

  function handleCreate() {
    if (!title.trim()) return;

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    startTransition(() => {
      createTaskAction(null, formData);
    });

    setOpen(false);
    setTitle("");
    setDescription("");
  }

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
      >
        + New Task
      </Button>

      {open && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Create New Task</h2>

            <label className="block mb-2">
              Title
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-1 block w-full border rounded px-3 py-2"
                placeholder="Enter task title"
              />
            </label>

            <label className="block mb-4">
              Description
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-1 block w-full border rounded px-3 py-2"
                placeholder="Enter task description"
              />
            </label>

            <div className="flex justify-end gap-2">
              <Button
                onClick={() => setOpen(false)}
                variant={"ghost"}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreate}
                disabled={pending}
              >
                Create
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
