import { useState, useEffect } from "react";

interface EditTaskPopupProps {
  task: { id: number; name: string; description: string; dueDate: string };
  onSave: (task: {
    id: number;
    name: string;
    description: string;
    dueDate: string;
  }) => void;
  onClose: () => void;
}

export default function EditTaskPopup({
  task,
  onSave,
  onClose,
}: EditTaskPopupProps) {
  const [name, setName] = useState(task.name);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.dueDate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: task.id, name, description, dueDate });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-gray-800 p-8 rounded-md shadow-md text-white">
        <h2 className="text-5xl mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-2xl font-medium text-gray-400">
              Task Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl"
              required
            />
          </div>
          <div>
            <label className="block text-2xl font-medium text-gray-400">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl"
              required
            />
          </div>
          <div>
            <label className="block text-2xl font-medium text-gray-400">
              Due Date
            </label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-2xl"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-900 text-2xl rounded-md"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 text-2xl rounded-md"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
