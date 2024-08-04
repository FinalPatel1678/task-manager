import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Task, TaskState, AddTaskPayload, UpdateTaskPayload, DeleteTaskPayload } from "./types";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const initialState: TaskState = {
  tasks: [],
  status: "idle",
  error: null,
};

export const fetchTasks = createAsyncThunk<Task[]>("tasks/fetchTasks", async () => {
  const response = await fetch(`${BASE_URL}/tasks`);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return response.json();
});

export const addTask = createAsyncThunk<Task, AddTaskPayload>("tasks/addTask", async (task) => {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error("Failed to add task");
  }
  return response.json();
});

export const updateTask = createAsyncThunk<Task, UpdateTaskPayload>("tasks/updateTask", async (task) => {
  const response = await fetch(`${BASE_URL}/tasks/${task._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task),
  });
  if (!response.ok) {
    throw new Error("Failed to update task");
  }
  return response.json();
});

export const deleteTask = createAsyncThunk<DeleteTaskPayload, string>("tasks/deleteTask", async (id) => {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
  return { _id: id };
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch tasks";
      })
      .addCase(addTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex((task) => task._id === action.payload._id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action: PayloadAction<DeleteTaskPayload>) => {
        state.tasks = state.tasks.filter((task) => task._id !== action.payload._id);
      })
      .addMatcher(
        (action): action is PayloadAction<unknown> => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = (action as unknown as { error: { message: string } }).error.message || "An unknown error occurred";
        }
      );
  },
});

export default tasksSlice.reducer;
