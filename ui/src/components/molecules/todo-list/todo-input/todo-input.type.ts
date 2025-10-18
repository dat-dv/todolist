import type { ComponentPropsWithoutRef } from "react";
import type { TTask } from "../../../../types/entities/task.entity";

export type TTodoInputProps = {
  onAdd: (task: Partial<TTask>) => void;
  placeholder?: string;
  disabled?: boolean;
  maxWidth?: string;
  isSubmitting?: boolean;
  task?: Partial<TTask>;
  isEdited?: boolean;
} & Omit<ComponentPropsWithoutRef<"form">, "onSubmit">;
