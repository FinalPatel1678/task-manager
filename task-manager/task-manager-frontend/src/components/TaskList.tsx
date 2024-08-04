import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask } from "../features/tasks/taskSlice";
import { RootState, AppDispatch } from "../store";
import TaskForm from "./TaskForm";
import { Task } from "../features/tasks/types";

const TaskList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const status = useSelector((state: RootState) => state.tasks.status);
  const error = useSelector((state: RootState) => state.tasks.error);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTasks());
    }
  }, [dispatch, status]);

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteTask(id));
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedTask(null);
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Tasks</h1>
      <button
        onClick={() => {
          setSelectedTask(null);
          setShowForm(true);
        }}
      >
        Add New Task
      </button>
      {showForm && <TaskForm task={selectedTask || undefined} onClose={handleFormClose} />}
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title} - {task.description}
            <button onClick={() => handleEdit(task)}>Edit</button>
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
