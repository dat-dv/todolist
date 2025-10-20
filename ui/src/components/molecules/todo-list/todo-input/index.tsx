import { Controller, useForm } from "react-hook-form";
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
  className,
  ...rest
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm<TTodoInputData>({
    resolver: zodResolver(todoSchema),
  });

  useEffect(() => {
    if (task?.id) {
      reset({ task: task?.title || "" });
    }
  }, [reset, task]);

  const onSubmit = async (data: TTodoInputData) => {
    const isEdit = !!task?.id;
    const isSubmitSucces = await onAdd({
      ...(isEdit ? task || {} : {}),
      title: data.task,
    });
    if (isSubmitSucces) {
      reset({ task: "" });
    }
  };

  const isDisableSubmit = disabled || isSubmitting || !isDirty || !isValid;
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`w-full max-w-full flex items-center justify-center gap-2 xs:gap-3 sm:gap-4 mb-4 xs:mb-6 sm:mb-8 ${className}`}
      {...rest}
    >
      <div className="relative flex-1">
        <Controller
          name="task"
          control={control}
          render={({ field }) => {
            return (
              <CustomTextarea
                className="max-h-48"
                {...field}
                id="task"
                placeholder={placeholder}
                error={errors.task?.message}
                disabled={disabled}
                showCharCount
                maxLength={255}
                absoluteError
              />
            );
          }}
        />
      </div>

      <CustomButton
        type="submit"
        className="
            flex items-center justify-center gap-1 
            px-2
            py-2 
            flex-shrink-0
            text-md 
          "
        disabled={isDisableSubmit}
        isLoading={isSubmitting}
      >
        <span>{isEdited ? "Edit" : "Add"}</span>
        <PlusIcon className="w-4 h-4" />
      </CustomButton>
    </form>
  );
};

export default TodoInput;
