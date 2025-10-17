export type TPaginationReq = {
  page: number;
  pageSize: number;
};

export type TPagiantionRes<T> = {
  count: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  page: number;
  pageSize: number;
  totalPages: number;
  value: T[];
};
