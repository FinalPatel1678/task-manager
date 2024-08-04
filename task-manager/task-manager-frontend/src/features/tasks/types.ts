export interface Task {
  _id: string;
  title: string;
  description: string;
}

export interface TaskState {
  tasks: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface AddTaskPayload {
  title: string;
  description: string;
}

export interface UpdateTaskPayload {
  _id: string;
  title: string;
  description: string;
}

export interface DeleteTaskPayload {
  _id: string;
}
