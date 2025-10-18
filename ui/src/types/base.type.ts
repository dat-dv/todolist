import type { TPagiantionRes } from "./pagination.type";

export type TTransformResponse<T> = T;

export type TTransformPagination<T> = TPagiantionRes<T>;

export type TErrorResponse = {
  type: string;
  title: string;
  message: string;
  status: number;
  errors: Record<string, string[]>;
  traceId: string;
};
