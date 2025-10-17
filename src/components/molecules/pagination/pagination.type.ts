export type TPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  hasNext?: boolean;
  hasPrev?: boolean;
};
