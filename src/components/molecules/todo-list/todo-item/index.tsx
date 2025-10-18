import React from "react";
import type { TTodoItemProps } from "./todo-item.type";
import DeleteIcon from "../../../atoms/icons/delete-icon";
import CheckIcon from "../../../atoms/icons/check-icon";
import CancelEditIcon from "../../../atoms/icons/cancel-edit-icon";
import EditIcon from "../../../atoms/icons/edit-icon";

const TodoItem: React.FC<TTodoItemProps> = ({
  todo,
  onRemove,
  onToggle,
  handleClickEdit,
  idTaskEdited,
  className,
  ...rest
}) => {
  const isCompleted = !!todo?.isCompleted;
  const isEditing = idTaskEdited === todo?.id && !!todo?.id;
  const disabled = !!idTaskEdited;

  if (!todo?.id) return <></>;

  return (
    <li
      className={`flex flex-wrap sm:flex-nowrap items-start sm:items-center gap-3 sm:gap-4 ${className}`}
      {...rest}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        <button
          disabled={disabled}
          onClick={() => onRemove(todo?.id)}
          aria-label="Delete"
          className="flex items-center justify-center shrink-0 h-8 w-8 sm:h-9 sm:w-9 rounded-md bg-red-500 hover:bg-red-600 text-white disabled:opacity-50"
        >
          <DeleteIcon />
        </button>
        <button
          disabled={disabled}
          onClick={() => onToggle(todo.id, !isCompleted)}
          aria-label={todo.isCompleted ? "Mark active" : "Mark completed"}
          className={`flex items-center justify-center shrink-0 h-8 w-8 sm:h-9 sm:w-9 rounded-md border-2 transition ${
            todo.isCompleted
              ? "bg-green-600 hover:bg-green-700 border-green-600 text-white"
              : "bg-gray-300 hover:bg-gray-400 border-gray-400 text-gray-600"
          }`}
        >
          {isCompleted && <CheckIcon />}
        </button>
      </div>

      <div
        className={`flex-1 min-w-0 font-mono text-base sm:text-lg md:text-[20px] ${
          isCompleted ? "line-through text-gray-400" : "text-gray-900"
        }`}
      >
        <div className="select-none break-all overflow-wrap-anywhere">
          {todo?.title}
        </div>
      </div>

      <div className="flex items-center gap-2 ml-auto">
        {isEditing ? (
          <button
            onClick={() => handleClickEdit(undefined)}
            aria-label="Cancel Edit"
            className="flex items-center justify-center shrink-0 h-8 w-8 sm:h-9 sm:w-9 rounded-md bg-gray-500 hover:bg-gray-600 text-white"
          >
            <CancelEditIcon />
          </button>
        ) : (
          <button
            disabled={disabled}
            onClick={() => handleClickEdit(todo.id)}
            aria-label="Edit"
            className="flex items-center justify-center shrink-0 h-8 w-8 sm:h-9 sm:w-9 rounded-md bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50"
          >
            <EditIcon />
          </button>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
