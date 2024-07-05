import { useState, useEffect } from "react";

interface TaskFormProps {
  task?: { name: string; description: string; dueDate: string };
  onSave: (task: {
    name: string;
    description: string;
    dueDate: string;
  }) => void;
}

export default function TaskForm({ task, onSave }: TaskFormProps) {
  const [name, setName] = useState(task ? task.name : "");
  const [description, setDescription] = useState(task ? task.description : "");
  const [dueDate, setDueDate] = useState(task ? task.dueDate : "");

  useEffect(() => {
    if (task) {
      setName(task.name);
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
    console.log("Form submitted:", { name, description, dueDate });
    onSave({ name, description, dueDate });
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
      <button
        type="submit"
        className="px-4 py-2 bg-purple-900 text-white text-2xl rounded-md"
      >
        Save Task
      </button>
    </form>
  );
}
