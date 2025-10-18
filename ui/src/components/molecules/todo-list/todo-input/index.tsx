import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomButton from "../../../atoms/custom-button";
import { todoSchema, type TTodoInputData } from "./todo-input.schema";
import { useEffect } from "react";
import type { TTodoInputProps } from "./todo-input.type";
import PlusIcon from "../../../atoms/icons/plus-icon";
import CustomTextarea from "../../custom-textarea";

const TodoInput: React.FC<TTodoInputProps> = ({
  onAdd,
  placeholder = "Input Text",
  disabled = false,
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
      className="w-full max-w-full flex items-center gap-2 xs:gap-3 sm:gap-4 mb-4 xs:mb-6 sm:mb-8"
    >
      <div className="relative flex-1 min-w-full sm:min-w-[500px]">
        <CustomTextarea
          className="max-h-48"
          {...register("task")}
          id="task"
          placeholder={placeholder}
          error={errors.task?.message}
          disabled={disabled}
          showCharCount
          maxLength={255}
        />
      </div>

      <CustomButton
        type="submit"
        className="
          flex items-center justify-center gap-1 
          px-2 xs:px-3 sm:px-4 
          py-2 
          flex-shrink-0
          text-xs xs:text-sm sm:text-base
        "
        disabled={disabled}
        isLoading={isSubmitting}
      >
        <span className="hidden xs:inline">{isEdited ? "Edit" : "Add"}</span>
        <PlusIcon className="w-4 h-4 xs:w-5 xs:h-5" />
      </CustomButton>
    </form>
  );
};

export default TodoInput;
