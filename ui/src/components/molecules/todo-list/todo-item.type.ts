import type { TTask } from "../../../types/entities/task.entity";
import type { EFIlterValue, ESortOrder } from "../../../types/filter.enum";

export type TTodoItemProps = {
  todo: TTask;
  onRemove: (id: string) => void;
  onToggle: (id: string) => void;
  onUpdate: (id: string, text: string) => void;
};

export type TFilterTask = {
  page: number;
  pageSize: number;
  isCompleted: EFIlterValue;
  search: string;
  sortOrder: ESortOrder;
};
