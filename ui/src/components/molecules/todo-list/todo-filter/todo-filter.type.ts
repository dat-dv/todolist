import type { TFilterTask } from "../todo-item.type";

export type TTodoFilterProps = {
  filter: TFilterTask;
  onFilterChange: (value: Partial<TFilterTask>) => void;
  totalCount?: number;
};
