import React from "react";
import type { TTodoItemProps } from "./todo-item.type";
import DeleteIcon from "../../../atoms/icons/delete-icon";
import CheckIcon from "../../../atoms/icons/check-icon";
import CancelEditIcon from "../../../atoms/icons/cancel-edit-icon";
import EditIcon from "../../../atoms/icons/edit-icon";
import ButtonWrapper from "../../../atoms/icons/button-wrapper-icon";

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
        <ButtonWrapper
          onClick={() => onRemove(todo?.id)}
          disabled={disabled}
          ariaLabel="Delete"
          className="bg-red-500 hover:bg-red-600 text-white"
        >
          <DeleteIcon />
        </ButtonWrapper>

        <ButtonWrapper
          onClick={() => onToggle(todo.id, !isCompleted)}
          disabled={disabled}
          ariaLabel={isCompleted ? "Mark active" : "Mark completed"}
          className={`border-2 ${
            isCompleted
              ? "bg-green-600 hover:bg-green-700 border-green-600 text-white"
              : "bg-gray-300 hover:bg-gray-400 border-gray-400 text-gray-600"
          }`}
        >
          {isCompleted && <CheckIcon />}
        </ButtonWrapper>
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
          <ButtonWrapper
            onClick={() => handleClickEdit(undefined)}
            ariaLabel="Cancel Edit"
            className="bg-gray-500 hover:bg-gray-600 text-white"
          >
            <CancelEditIcon />
          </ButtonWrapper>
        ) : (
          <ButtonWrapper
            onClick={() => handleClickEdit(todo.id)}
            disabled={disabled}
            ariaLabel="Edit"
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            <EditIcon />
          </ButtonWrapper>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
