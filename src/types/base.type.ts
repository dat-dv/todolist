import type { TPagiantionRes } from "./pagination.type";

export type TTransformResponse<T> = {
  isSuccess?: boolean;
  codeMajor?: string;
  codeMinor?: string;
  severity?: string;
  value: T;
  errorCode?: number;
  message?: string;
  details?: { field: string; message: string }[];
};

export type TTransformPagination<T> = TTransformResponse<TPagiantionRes<T>>;

export type TErrorResponse = {
  code: string;
  codeMinor: number;
  message: string;
};
