"use server";

import { updateTask } from "@/lib/db/task";
import { revalidatePath } from "next/cache";
import { TaskStatus } from "../types/task";

export async function updateTaskStatusAction(id: string, status: TaskStatus) {
  await updateTask(id, { status });
  revalidatePath("/"); // your tasks page route
}
