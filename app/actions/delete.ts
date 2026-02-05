"use server";

import { deleteTask } from "@/lib/db/task";
import { revalidatePath } from "next/cache";

export async function deleteTaskAction(id: string) {
  if (!id) return;

  const success = await deleteTask(id);

  if (!success) return;

  revalidatePath("/dashboard");
}
