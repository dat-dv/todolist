import React from "react";
import CustomSelect from "../../custom-select";
import type { TTodoFilterProps } from "./todo-filter.type";
import { EFIlterValue } from "../../../../types/filter.enum";

const TODO_FILTER_OPTIONS = [
  { value: EFIlterValue.ALL, label: "All" },
  { value: EFIlterValue.NOT_COMPLETE, label: "Not Complete" },
  { value: EFIlterValue.COMPLETED, label: "Completed" },
];
const TodoFilter: React.FC<TTodoFilterProps> = ({
  filter,
  onFilterChange,
  totalCount,
  activeCount,
  completedCount,
}) => {
  return (
    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b">
      {/* Stats */}
      <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-600">
        <span className="font-medium">
          Total:{" "}
          <span className="text-primary font-semibold">{totalCount}</span>
        </span>
        <span className="text-gray-400">•</span>
        <span className="font-medium">
          Not Complete:{" "}
          <span className="text-blue-600 font-semibold">{activeCount}</span>
        </span>
        <span className="text-gray-400">•</span>
        <span className="font-medium">
          Completed:{" "}
          <span className="text-green-600 font-semibold">{completedCount}</span>
        </span>
      </div>

      {/* Filter */}
      <CustomSelect<EFIlterValue>
        value={filter}
        onChange={onFilterChange}
        options={TODO_FILTER_OPTIONS}
        label="Status:"
      />
    </div>
  );
};

export default TodoFilter;
