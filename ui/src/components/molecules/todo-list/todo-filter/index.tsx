import CustomSelect from "../../custom-select";
import type { TTodoFilterProps } from "./todo-filter.type";
import { EFIlterValue, ESortOrder } from "../../../../types/filter.enum";
import { useEffect, useState } from "react";
import { useDebounce } from "../../../../hooks/use-debounce";
import SearchIcon from "../../../atoms/icons/search-icon";
import FilterIcon from "../../../atoms/icons/filter-icon";
import CustomInput from "../../custom-input";
import Drawer from "../../drawer";
import StatsBadge from "../../../atoms/stats-badge.tsx";

const TODO_FILTER_OPTIONS = [
  { value: EFIlterValue.ALL, label: "All" },
  { value: EFIlterValue.NOT_COMPLETE, label: "Not Complete" },
  { value: EFIlterValue.COMPLETED, label: "Completed" },
];

const SORT_ORDER_OPTIONS = [
  { value: ESortOrder.OLDEST, label: "Oldest First" },
  { value: ESortOrder.NEWEST, label: "Newest First" },
];

const TodoFilter: React.FC<TTodoFilterProps> = ({
  filter,
  onFilterChange,
  totalCount,
  activeCount,
  completedCount,
}) => {
  const [searchInput, setSearchInput] = useState(filter.search || "");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const debouncedSearch = useDebounce(searchInput, 300);

  const isCompleted = filter.isCompleted === EFIlterValue.COMPLETED;
  const isDoing = filter.isCompleted !== EFIlterValue.NOT_COMPLETE;
  const isAllStatus = filter.isCompleted === EFIlterValue.ALL;
  const isTodo = isCompleted || isAllStatus;

  useEffect(() => {
    onFilterChange({ search: debouncedSearch });
  }, [debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const onSortOrderChange = (value: ESortOrder) => {
    onFilterChange({ sortOrder: value });
  };

  return (
    <>
      {/* Main Bar */}
      <div className="w-full flex items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
        {/* Stats */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <StatsBadge label="Total" value={totalCount} color="primary" />
          {isTodo && (
            <>
              <div className="w-px h-4 bg-gray-300"></div>
              <StatsBadge label="Todo" value={activeCount} color="blue" />
            </>
          )}
          {isDoing && (
            <>
              <div className="w-px h-4 bg-gray-300"></div>
              <StatsBadge
                label="Completed"
                value={completedCount}
                color="green"
              />
            </>
          )}
        </div>

        {/* Filter Button */}
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          <FilterIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Filter & Sort</span>
        </button>
      </div>

      {/* Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Filter & Sort Options"
      >
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <CustomInput
              label="Search Todos"
              className="pl-10 h-11"
              id="todo-search"
              type="text"
              value={searchInput}
              onChange={handleSearchChange}
              placeholder="Input Text..."
            />
            <SearchIcon className="mt-4 absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          {/* Filter by Status */}
          <CustomSelect<EFIlterValue>
            label="Filter by Status"
            options={TODO_FILTER_OPTIONS}
            value={filter.isCompleted}
            onChange={(value) => onFilterChange({ isCompleted: value })}
            variant="vertical"
          />

          {/* Sort Order */}
          <CustomSelect<ESortOrder>
            options={SORT_ORDER_OPTIONS}
            value={filter.sortOrder}
            onChange={onSortOrderChange}
            label="Sort by"
            variant="vertical"
            placeholder="Sort by"
          />
        </div>
      </Drawer>
    </>
  );
};

export default TodoFilter;
