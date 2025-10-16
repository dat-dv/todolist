export type TPaginationReq = {
  page: number;
  pageSize: number;
};

export type TPagiantionRes<T> = {
  count: number;
  items: T[];
  limit: number;
  offset: number;
  totalCount: number;
};
