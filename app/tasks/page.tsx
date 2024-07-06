"use client";

import { useState, useEffect } from "react";
import TaskItem from "../components/TaskItem";
import EditTaskPopup from "../components/EditTaskPopup";
import { useRouter } from "next/navigation";

interface Task {
  id: number;
  name?: string;
  description: string;
  dueDate: string;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState("");
  const [sortAscending, setSortAscending] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [completedCount, setCompletedCount] = useState(0);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/tasks")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setTasks(data))
      .catch((error) => console.error("Error fetching tasks:", error));

    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }

    const storedCount = localStorage.getItem("completedCount");
    if (storedCount) {
      setCompletedCount(parseInt(storedCount, 10));
    }
  }, []);

  const updateTask = (task: Task) => {
    fetch(`/api/tasks/${task.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.error);
          });
        }
        return response.json();
      })
      .then((updatedTask) => {
        setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
        setEditingTask(null);
      })
      .catch((error) => console.error("Error updating task:", error.message));
  };

  const deleteTask = (id: number) => {
    fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.error);
          });
        }
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((error) => console.error("Error deleting task:", error.message));
  };

  const completeTask = (id: number) => {
    deleteTask(id);
    setCompletedCount(completedCount + 1);
    localStorage.setItem("completedCount", (completedCount + 1).toString());
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
  };

  const handleSaveTask = (task: {
    id: number;
    name: string;
    description: string;
    dueDate: string;
  }) => {
    updateTask(task);
  };

  const filteredTasks = tasks
    .filter(
      (task) =>
        task.name?.toLowerCase().includes(filter.toLowerCase()) ||
        task.description.toLowerCase().includes(filter.toLowerCase())
    )
    .sort((a, b) =>
      sortAscending
        ? new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        : new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()
    );

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">Tasks for {username}</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search tasks"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl"
        />
      </div>
      <div className="mb-4 flex space-x-4">
        <button
          onClick={() => setSortAscending(!sortAscending)}
          className="px-4 py-2 bg-purple-900 text-white text-2xl rounded-md"
        >
          Sort by Due Date {sortAscending ? "(Ascending)" : "(Descending)"}
        </button>
        <button
          onClick={() => router.push("/")}
          className="px-4 py-2 bg-purple-900 text-white text-2xl rounded-md"
        >
          Add New Task
        </button>
      </div>
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          name={task.name || ""}
          description={task.description}
          dueDate={task.dueDate}
          onEdit={handleEditTask}
          onDelete={deleteTask}
          onComplete={completeTask}
        />
      ))}
      {editingTask && (
        <EditTaskPopup
          task={editingTask}
          onSave={handleSaveTask}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  );
}
