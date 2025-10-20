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
import CustomButton from "../../../atoms/custom-button/index.tsx";
import { PAGINATION } from "../../../../configs/pagination.config.ts";

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
  totalCount = 0,
}) => {
  const [searchInput, setSearchInput] = useState(filter.search || "");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const debouncedSearch = useDebounce(searchInput, 300);

  useEffect(() => {
    onFilterChange({ search: debouncedSearch, page: PAGINATION.DEFAULT_PAGE });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const onSortOrderChange = (value: ESortOrder) => {
    onFilterChange({ sortOrder: value, page: PAGINATION.DEFAULT_PAGE });
  };

  const handleChangeStatus = (value: EFIlterValue) =>
    onFilterChange({ isCompleted: value, page: PAGINATION.DEFAULT_PAGE });

  return (
    <>
      <div className="w-full flex items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <StatsBadge label="Total" value={totalCount} color="primary" />
        </div>

        {/* Filter Button */}
        <CustomButton
          onClick={() => setIsDrawerOpen(true)}
          className="flex items-center gap-2 px-4 py-2"
        >
          <FilterIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Filter & Sort</span>
        </CustomButton>
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
            onChange={handleChangeStatus}
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
