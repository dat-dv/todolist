import type { TTask } from "../../../types/entities/task.entity";

export type TTodoItemProps = {
  todo: TTask;
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
};
