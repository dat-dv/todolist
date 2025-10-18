import type { TCustomSelectProps } from "../custom-select/custom-select.type";

export type TPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  pageSizeOptions?: number[];
  hasPrev?: boolean;
  hasNext?: boolean;
  className?: string;
  selectProps: Partial<TCustomSelectProps>;
  onChangePageSize?: (pageSize: number) => void;
};
