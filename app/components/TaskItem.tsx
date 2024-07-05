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
  onDelete,
}) => {
  return (
    <div className="my-10 p-4 border rounded-md shadow-sm">
      <h3 className="text-lg font-semibold">{name}</h3>
      <p className="text-2xl text-gray-600">{description}</p>
      <p className="text-2xl text-gray-600">
        Due: {new Date(dueDate).toLocaleDateString()}
      </p>
      <div className="mt-2 space-x-2">
        <button
          onClick={() => onDelete(id)}
          className="px-4 py-2 bg-red-900 text-white text-2xl rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
