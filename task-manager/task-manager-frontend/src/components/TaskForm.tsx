import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../features/tasks/taskSlice";
import { Task } from "../features/tasks/types";
import { AppDispatch } from "store";

interface TaskFormProps {
  task?: Task;
  onClose: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setIsEditMode(true);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && description) {
      if (isEditMode && task) {
        dispatch(updateTask({ _id: task._id, title, description }));
      } else {
        dispatch(addTask({ title, description }));
      }
      setTitle("");
      setDescription("");
      onClose();
    } else {
      alert("Please provide both title and description.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      <button type="submit">{isEditMode ? "Update Task" : "Add Task"}</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  );
};

export default TaskForm;
