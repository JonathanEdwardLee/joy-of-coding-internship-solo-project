import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface TaskFormProps {
  task?: { id?: number; name?: string; description: string; dueDate: string };
  onSave: (task: {
    id?: number;
    name: string;
    description: string;
    dueDate: string;
  }) => void;
}

export default function TaskForm({ task, onSave }: TaskFormProps) {
  const [name, setName] = useState(task?.name || "");
  const [description, setDescription] = useState(task?.description || "");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");
  const router = useRouter();

  useEffect(() => {
    if (task) {
      setName(task.name || "");
      setDescription(task.description);
      setDueDate(task.dueDate);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !dueDate) {
      alert("Please fill in all fields.");
      return;
    }
    onSave({ name, description, dueDate });
    router.push("/tasks");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-2xl font-medium text-gray-700">
          Task Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl"
        />
      </div>
      <div>
        <label className="block text-2xl font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl"
        />
      </div>
      <div>
        <label className="block text-2xl font-medium text-gray-700">
          Due Date
        </label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl"
        />
      </div>
      <div className="flex space-x-4">
        <button
          type="submit"
          className="px-4 py-2 bg-purple-900 text-white text-2xl rounded-md hover:bg-purple-700"
        >
          Save Task
        </button>
        <button
          type="button"
          onClick={() => router.push("/tasks")}
          className="px-4 py-2 bg-purple-900 text-white text-2xl rounded-md hover:bg-purple-700"
        >
          View Tasks
        </button>
      </div>
    </form>
  );
}
