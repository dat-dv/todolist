import type { EFIlterValue } from "../../../../types/filter.enum";

export type TTodoFilterProps = {
  filter: EFIlterValue;
  onFilterChange: (value: EFIlterValue) => void;
  totalCount: number;
  activeCount: number;
  completedCount: number;
};
