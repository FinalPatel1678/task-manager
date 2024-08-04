export interface Task {
  _id: string;
  title: string;
  description: string;
}

export interface TaskState {
  tasks: Task[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentPage: number;
  itemsPerPage: number;
  totalTasks: number;
  totalPages: number;
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
