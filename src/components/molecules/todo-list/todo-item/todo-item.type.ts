import type { ComponentPropsWithoutRef } from "react";
import type { TTask } from "../../../../types/entities/task.entity";

export type TTodoItemProps = {
  todo?: TTask;
  onRemove: (id: number) => void;
  onToggle: (id: number, isCompleted: boolean) => void;
  handleClickEdit: (id?: number) => void;
  idTaskEdited?: number | null;
} & Omit<ComponentPropsWithoutRef<"div">, "onToggle">;
