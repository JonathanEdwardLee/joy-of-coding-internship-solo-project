import React from "react";

interface TaskItemProps {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  onEdit: (task: {
    id: number;
    name: string;
    description: string;
    dueDate: string;
  }) => void;
  onDelete: (id: number) => void;
  onComplete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  name,
  description,
  dueDate,
  onEdit,
  onDelete,
  onComplete,
}) => {
  return (
    <div className="my-4 p-4 border rounded-md shadow-sm bg-gray-700 text-white">
      <p className="text-3xl font-semibold">Name: {name}</p>
      <p className="text-3xl">Description: {description}</p>
      <p className="text-3xl">Due: {new Date(dueDate).toLocaleDateString()}</p>
      <div className="mt-2 space-x-2">
        <button
          onClick={() => onEdit({ id, name, description, dueDate })}
          className="px-4 py-2 bg-purple-700 text-white text-xl rounded-md"
        >
          Edit
        </button>
        <button
          onClick={() => onComplete(id)}
          className="px-4 py-2 bg-purple-700 text-white text-xl rounded-md"
        >
          Complete
        </button>
        <button
          onClick={() => onDelete(id)}
          className="px-4 py-2 bg-purple-700 text-white text-xl rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
