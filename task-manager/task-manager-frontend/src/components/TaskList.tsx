import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks, deleteTask, setCurrentPage } from "../features/tasks/taskSlice";
import { RootState, AppDispatch } from "../store";
import TaskForm from "./TaskForm";
import { Task } from "../features/tasks/types";
import Pagination from "./Pagination";
import ConfirmationModal from "./ConfirmationModal";
import "../styles/TaskList.css";

const TaskList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const status = useSelector((state: RootState) => state.tasks.status);
  const error = useSelector((state: RootState) => state.tasks.error);
  const currentPage = useSelector((state: RootState) => state.tasks.currentPage);
  const totalPages = useSelector((state: RootState) => state.tasks.totalPages);
  const itemsPerPage = useSelector((state: RootState) => state.tasks.itemsPerPage);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchTasks({ page: currentPage, limit: itemsPerPage }));
  }, [dispatch, currentPage, itemsPerPage]);

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setTaskToDelete(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      dispatch(deleteTask(taskToDelete));
      setTaskToDelete(null);
      setShowConfirmModal(false);
    }
  };

  const cancelDelete = () => {
    setTaskToDelete(null);
    setShowConfirmModal(false);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedTask(null);
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    dispatch(fetchTasks({ page, limit: itemsPerPage }));
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h1>Tasks</h1>
        <button
          className="add-task-button"
          onClick={() => {
            setSelectedTask(null);
            setShowForm(true);
          }}
        >
          Add New Task
        </button>
      </div>
      {showForm && <TaskForm task={selectedTask || undefined} onClose={handleFormClose} />}
      {showConfirmModal && (
        <ConfirmationModal
          message="Are you sure you want to delete this task?"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="task-item">
            <div>
              <strong>{task.title}</strong> - {task.description}
            </div>
            <div>
              <button className="edit-button" onClick={() => handleEdit(task)}>
                Edit
              </button>
              <button className="delete-button" onClick={() => handleDelete(task._id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default TaskList;
