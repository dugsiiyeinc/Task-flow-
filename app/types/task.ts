export type TaskStatus = "pending" | "in-progress" | "completed";

export type TaskType = {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
};

/**
 * What the CLIENT sends when creating a task
 */
export type CreateTaskType = {
  title: string;
  description?: string;
  status?: TaskStatus;
};

/**
 * What the CLIENT sends when updating a task
 */
export type UpdateTaskType = {
  title?: string;
  description?: string;
  status?: TaskStatus;
};
