import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "../../custom-input";
import CustomButton from "../../../atoms/custom-button";
import { todoSchema, type TTodoInputData } from "./todo-input.schema";
import { useEffect } from "react";
import type { TTodoInputProps } from "./todo-input.type";
import PlusIcon from "../../../atoms/icons/plus-icon";

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
      </div>

      <CustomButton
        type="submit"
        className="flex gap-1 px-2 py-2"
        disabled={disabled}
        isLoading={isSubmitting}
      >
        {isEdited ? "Edit" : "Add"}
        <PlusIcon />
      </CustomButton>
    </form>
  );
};

export default TodoInput;
