import React from "react";
import PaginationItem from "./pagination-item";
import CustomSelect from "../custom-select";
import { PAGINATION_SIZE_OPTIONS } from "../../../configs/pagination.config";
import type { TPaginationProps } from "./pagination.type";

const Pagination: React.FC<TPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onChangePageSize,
  pageSize,
  hasPrev = true,
  hasNext = true,
  className = "",
  selectProps,
}) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    // Mobile: Show fewer pages
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
        return pages;
      }

      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        if (i !== 1 && i !== totalPages) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }

      return pages;
    }

    // Desktop: Show more pages
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className={`space-y-3 sm:space-y-4 w-full ${className}`}>
      {/* Page Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-2 w-full">
        {/* Page buttons row */}
        <div className="flex items-center justify-center gap-1 xs:gap-2 w-full sm:w-auto">
          {hasPrev && (
            <PaginationItem
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
              className="flex-shrink-0"
            >
              <span className="hidden xs:inline">Previous</span>
              <span className="inline xs:hidden">Prev</span>
            </PaginationItem>
          )}

          <div className="flex items-center gap-1 xs:gap-2 overflow-x-auto max-w-full scrollbar-hide">
            {pages.map((page, index) => {
              if (page === "...") {
                return (
                  <span
                    key={`ellipsis-${index}`}
                    className="px-2 xs:px-3 py-1 text-gray-500 flex-shrink-0 text-xs xs:text-sm"
                  >
                    ...
                  </span>
                );
              }

              return (
                <PaginationItem
                  key={page}
                  onClick={() => onPageChange(page as number)}
                  className={`
                    px-2.5 xs:px-3.5 
                    py-1 xs:py-1.5
                    text-xs xs:text-sm
                    min-w-[32px] xs:min-w-[36px]
                    flex-shrink-0
                    ${
                      currentPage === page
                        ? "bg-primary text-white font-semibold"
                        : "bg-gray-200 hover:bg-gray-300"
                    }
                  `}
                  aria-label={`Page ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                >
                  {page}
                </PaginationItem>
              );
            })}
          </div>

          {hasNext && (
            <PaginationItem
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
              className="flex-shrink-0"
            >
              Next
            </PaginationItem>
          )}
        </div>

        {/* CustomSelect - separate row on mobile */}
        <div className="w-full sm:w-auto flex justify-center mt-3 sm:mt-0 sm:justify-start">
          <CustomSelect<number>
            value={pageSize}
            onChange={onChangePageSize}
            options={PAGINATION_SIZE_OPTIONS}
            label={selectProps?.label || "Items per page"}
            className="w-fit max-w-[200px] sm:max-w-none sm:w-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
