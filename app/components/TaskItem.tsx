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
    <div className="my-4 p-4 border rounded-md shadow-sm bg-gray-700 text-white">
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-lg">{description}</p>
      <p className="text-md">Due: {new Date(dueDate).toLocaleDateString()}</p>
      <div className="mt-2 space-x-2">
        <button
          onClick={() => onEdit({ id, name, description, dueDate })}
          className="px-4 py-2 bg-blue-500 text-white text-lg rounded-md"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(id)}
          className="px-4 py-2 bg-red-500 text-white text-lg rounded-md"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
