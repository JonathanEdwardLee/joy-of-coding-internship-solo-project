import React from "react";

interface TaskItemProps {
  id: number;
  name: string;
  description: string;
  dueDate: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  name,
  description,
  dueDate,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="p-4 border rounded-md shadow-sm">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <p className="text-sm text-gray-600">
        Due: {new Date(dueDate).toLocaleDateString()}
      </p>
      <div className="mt-2 space-x-2">
        <button
          onClick={() => onEdit(id)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(id)}
          className="px-4 py-2 bg-red-500 text-white rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
