"use server";

import { createTask, fetchTaskById } from "@/lib/db/task";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type State = {
  error?: string;
};

export async function createTaskAction(
  prevState: State | null,
  formData: FormData
): Promise<State | null> {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string | null;

  if (!title || title.trim().length === 0) {
    return { error: "Title is required" };
  }

  const taskId = await createTask({
    title: title.trim(),
    description: description ?? "",
    status: "pending",
  });

  if (!taskId) {
    return { error: "Failed to create task" };
  }

   revalidatePath("/dashboard");
   redirect("/dashboard");

}
