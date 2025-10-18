import type { ComponentPropsWithoutRef } from "react";
import type { TTask } from "../../../../types/entities/task.entity";

export type TTodoItemProps = {
  todo?: TTask;
  onClickDelete: (task: TTask) => void;
  onToggle: (id: number, isCompleted: boolean) => void;
  handleClickEdit: (id?: number) => void;
  idTaskEdited?: number | null;
  title?: string;
} & Omit<ComponentPropsWithoutRef<"div">, "onToggle">;
