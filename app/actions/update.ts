"use server";

import { updateTask } from "@/lib/db/task";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type State = {
  error?: string;
};

export async function updateTaskAction(
  prevState: State | null,
  formData: FormData
): Promise<State | null> {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  if (!id) return { error: "Task ID is missing" };
  if (!title || title.trim().length === 0) {
    return { error: "Title is required" };
  }

  const success = await updateTask(id, {
    title: title.trim(),
    description,
  });

  if (!success) {
    return { error: "Failed to update task" };
  }

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
