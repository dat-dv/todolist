import type { TPaginationProps } from "./pagination.type";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
  hasNext,
  hasPrev,
}: TPaginationProps) => {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    // Mobile: Show fewer pages
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      if (totalPages <= 5) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current
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

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }

      return pages;
    }

    // Desktop: Show more pages
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
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
    <div
      className={`flex items-center justify-center gap-1 xs:gap-2 mt-4 sm:mt-6 px-2 ${className}`}
    >
      {hasPrev && (
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="
            px-2 xs:px-3 py-1.5 xs:py-2 
            text-xs xs:text-sm
            rounded-md 
            bg-gray-200 hover:bg-gray-300 
            disabled:opacity-50 disabled:cursor-not-allowed
            flex-shrink-0
            transition-colors
          "
          aria-label="Previous page"
        >
          <span className="hidden xs:inline">Previous</span>
          <span className="inline xs:hidden">Prev</span>
        </button>
      )}

      <div className="flex items-center gap-1 xs:gap-2 overflow-x-auto max-w-full scrollbar-hide">
        {pages.map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 xs:px-3 py-1 text-gray-500 flex-shrink-0"
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`
                px-2.5 xs:px-3.5 
                py-1 xs:py-1.5
                text-xs xs:text-sm
                rounded-md 
                flex-shrink-0
                transition-colors
                min-w-[32px] xs:min-w-[36px]
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
            </button>
          );
        })}
      </div>

      {hasNext && (
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="
            px-2 xs:px-3 py-1.5 xs:py-2 
            text-xs xs:text-sm
            rounded-md 
            bg-gray-200 hover:bg-gray-300 
            disabled:opacity-50 disabled:cursor-not-allowed
            flex-shrink-0
            transition-colors
          "
          aria-label="Next page"
        >
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
