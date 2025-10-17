import React from "react";
import type { TTodoItemProps } from "./todo-item.type";

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
        <button
          disabled={disabled}
          onClick={() => onToggle(todo.id, !isCompleted)}
          aria-label={isCompleted ? "Mark active" : "Mark completed"}
          className={`flex items-center justify-center shrink-0 h-8 w-8 sm:h-9 sm:w-9 rounded-md border-2 transition ${
            isCompleted
              ? "bg-green-600 hover:bg-green-700 border-green-600 text-white"
              : "bg-gray-300 hover:bg-gray-400 border-gray-400 text-gray-600"
          }`}
        >
          {isCompleted && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        ) : (
          <button
            disabled={disabled}
            onClick={() => handleClickEdit(todo.id)}
            aria-label="Edit"
            className="flex items-center justify-center shrink-0 h-8 w-8 sm:h-9 sm:w-9 rounded-md bg-blue-500 hover:bg-blue-600 text-white disabled:opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
          </button>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
