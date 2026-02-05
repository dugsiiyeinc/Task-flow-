import { CreateTaskType, TaskStatus, TaskType, UpdateTaskType } from "@/app/types/task";
import { getTaskCollection } from "./db";
import { ObjectId } from "mongodb";

export async function fetchTasks(
  status?: TaskStatus,
): Promise<TaskType[]> {
  try {
    const collection = await getTaskCollection();

    const query: any = {};

    if (status) {
      query.status = status;
    }

    const tasks = await collection
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return tasks.map((task) => ({
      _id: task._id.toString(),
      title: task.title,
      description: task.description,
      status: task.status,
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString(),
    }));
  } catch (err) {
    console.error("error fetching tasks:", err);
    return [];
  }
}

export async function fetchTaskById(
  id: string
): Promise<TaskType | null> {
  try {
    const collection = await getTaskCollection();

    const task = await collection.findOne({
      _id: new ObjectId(id),
    });

    if (!task) return null;

    return {
      _id: task._id.toString(),
      title: task.title,
      description: task.description,
      status: task.status,
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString(),
    };
  } catch (err) {
    console.error("error fetching task by id:", err);
    return null;
  }
}

export async function createTask(
  task: CreateTaskType
): Promise<string | null> {
  try {
    const collection = await getTaskCollection();

    const now = new Date();

    const result = await collection.insertOne({
      title: task.title,
      description: task.description ?? "",
      status: task.status ?? "pending",
      createdAt: now,
      updatedAt: now,
    });

    return result.insertedId.toString();
  } catch (err) {
    console.error("error creating task:", err);
    return null;
  }
}

export async function updateTask(
  id: string,
  task: UpdateTaskType
): Promise<boolean> {
  try {
    const collection = await getTaskCollection();

    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...task,
          updatedAt: new Date(),
        },
      }
    );

    return result.modifiedCount > 0;
  } catch (err) {
    console.error("error updating task:", err);
    return false;
  }
}
export async function deleteTask(
  id: string
): Promise<boolean> {
  try {
    const collection = await getTaskCollection();

    const result = await collection.deleteOne({
      _id: new ObjectId(id),
    });

    return result.deletedCount === 1;
  } catch (err) {
    console.error("error deleting task:", err);
    return false;
  }
}

