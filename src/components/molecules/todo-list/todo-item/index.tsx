import React from "react";
import type { TTodoItemProps } from "./todo-item.type";
import DeleteIcon from "../../../atoms/icons/delete-icon";
import CheckIcon from "../../../atoms/icons/check-icon";
import CancelEditIcon from "../../../atoms/icons/cancel-edit-icon";
import EditIcon from "../../../atoms/icons/edit-icon";
import ButtonWrapper from "../../../atoms/icons/button-wrapper-icon";

const TodoItem: React.FC<TTodoItemProps> = ({
  todo,
  onClickDelete,
  onToggle,
  handleClickEdit,
  idTaskEdited,
  className,
  ...rest
}) => {
  const isCompleted = !!todo?.isCompleted;
  const isEditing = idTaskEdited === todo?.id && !!todo?.id;
  const disabled = !!idTaskEdited;

  if (!todo?.id) return null;

  return (
    <div
      className={`
        flex flex-row 
        items-start
        gap-3 sm:gap-4 
        px-4 py-3
        transition-all duration-200 
        hover:shadow-md
        w-full
        ${className}
      `}
      {...rest}
    >
      <div className="flex items-start gap-2 sm:gap-3 flex-shrink-0 pt-0.5 sm:flex-row flex-col">
        <ButtonWrapper
          onClick={() => onClickDelete(todo)}
          disabled={disabled}
          ariaLabel="Delete"
          className="bg-red-500 hover:bg-red-600 text-white w-9 h-9 sm:w-10 sm:h-10"
        >
          <DeleteIcon />
        </ButtonWrapper>

        <ButtonWrapper
          onClick={() => onToggle(todo.id, !isCompleted)}
          disabled={disabled}
          ariaLabel={isCompleted ? "Mark active" : "Mark completed"}
          className={`border-2 w-9 h-9 sm:w-10 sm:h-10 ${
            isCompleted
              ? "bg-green-600 hover:bg-green-700 border-green-600 text-white"
              : "bg-gray-200 hover:bg-gray-300 border-gray-400 text-gray-600"
          }`}
        >
          {isCompleted && <CheckIcon />}
        </ButtonWrapper>
      </div>

      <div
        className={`
          flex-1 
          min-w-0
          max-w-full
          font-mono 
          text-sm sm:text-base md:text-lg 
          leading-relaxed
          ${isCompleted ? "line-through text-gray-400" : "text-gray-900"}
        `}
      >
        <div className="break-words whitespace-pre-wrap overflow-wrap-anywhere">
          {todo?.title}
        </div>
      </div>

      <div className="flex items-start flex-shrink-0 pt-0.5">
        {isEditing ? (
          <ButtonWrapper
            onClick={() => handleClickEdit(undefined)}
            ariaLabel="Cancel Edit"
            className="bg-gray-500 hover:bg-gray-600 text-white w-9 h-9 sm:w-10 sm:h-10"
          >
            <CancelEditIcon />
          </ButtonWrapper>
        ) : (
          <ButtonWrapper
            onClick={() => handleClickEdit(todo.id)}
            disabled={disabled}
            ariaLabel="Edit"
            className="bg-blue-500 hover:bg-blue-600 text-white w-9 h-9 sm:w-10 sm:h-10"
          >
            <EditIcon />
          </ButtonWrapper>
        )}
      </div>
    </div>
  );
};

export default TodoItem;
