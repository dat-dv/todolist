import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "../../custom-input";
import CustomButton from "../../../atoms/custom-button";
import { todoSchema, type TTodoInputData } from "./todo-input.schema";
import { useEffect } from "react";
import type { TTodoInputProps } from "./todo-input.type";

const TodoInput: React.FC<TTodoInputProps> = ({
  onAdd,
  placeholder = "Input Text",
  disabled = false,
  maxWidth = "780px",
  isSubmitting = false,
  task,
  isEdited,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TTodoInputData>({
    resolver: zodResolver(todoSchema),
  });

  useEffect(() => {
    if (task?.id) {
      reset({ task: task?.title || "" });
    }
  }, [reset, task]);

  const onSubmit = (data: TTodoInputData) => {
    const isEdit = !!task?.id;
    onAdd({
      ...(isEdit ? task || {} : {}),
      title: data.task,
    });
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex items-center gap-4 mb-8"
      style={{ maxWidth }}
    >
      <div className="relative flex-1">
        <CustomInput
          id="task"
          placeholder={placeholder}
          {...register("task")}
          error={errors.task?.message}
        />
        {errors.task && (
          <p className="text-red-500 text-sm mt-1">{errors.task.message}</p>
        )}
      </div>

      <CustomButton
        type="submit"
        className="flex gap-1 px-2 py-2"
        disabled={disabled}
        isLoading={isSubmitting}
      >
        {isEdited ? "Edit" : "Add"}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </CustomButton>
    </form>
  );
};

export default TodoInput;
