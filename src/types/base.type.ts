import type { TPagiantionRes } from "./pagination.type";

export type TTransformResponse<T> = T;

export type TTransformPagination<T> = TPagiantionRes<T>;

export type TErrorResponse = {
  code: string;
  codeMinor: number;
  message: string;
};
