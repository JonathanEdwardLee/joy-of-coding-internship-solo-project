"use client";

import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import AuthPopup from "./components/AuthPopup";
import { useRouter } from "next/navigation";

interface Task {
  id: number;
  description: string;
  dueDate: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(true);
  const [username, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
      setIsAuthenticated(true);
      setShowAuthPopup(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetch("/api/tasks")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => setTasks(data))
        .catch((error) => console.error("Error fetching tasks:", error));
    }
  }, [isAuthenticated]);

  const addTask = (task: {
    name: string;
    description: string;
    dueDate: string;
  }) => {
    fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...task,
        username,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(error.error);
          });
        }
        return response.json();
      })
      .then((newTask) => setTasks([...tasks, newTask]))
      .catch((error) => console.error("Error adding task:", error.message));
  };

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

  const handleSaveTask = (task: {
    name: string;
    description: string;
    dueDate: string;
  }) => {
    if (editingTask) {
      updateTask({ ...editingTask, ...task });
    } else {
      addTask(task);
    }
    router.push("/tasks");
  };

  const handleAuthenticate = (username: string, password: string) => {
    if (username && password) {
      setUsername(username);
      setIsAuthenticated(true);
      setShowAuthPopup(false);
      localStorage.setItem("username", username);
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {showAuthPopup && (
        <AuthPopup
          onClose={() => setShowAuthPopup(false)}
          onAuthenticate={handleAuthenticate}
        />
      )}
      {isAuthenticated && (
        <h2 className="text-2xl font-bold mb-4">Welcome, {username}</h2>
      )}
      <h1 className="text-4xl font-bold mb-4">Enter Your Task</h1>
      <TaskForm task={editingTask} onSave={handleSaveTask} />
    </div>
  );
}
