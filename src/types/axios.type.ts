import type { TErrorResponse, TTransformResponse } from "./entities/base";

export type TTransformData<T> = {
  data: T[];
};

export type TAxiosReqWithExtendUrl<T> = T & { extendUrl?: string };

export type TAxiosMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export type TAxiosInstance = "cms" | "default";

export type TSuccess<T> = {
  status: "success";
  data: TTransformResponse<T>;
  error?: undefined;
};
export type TFailure = {
  status: "failed";
  data?: undefined;
  error: TErrorResponse;
};
export type TBaseFetcherOptions<D> = {
  arg?: D & {
    extendUrl?: string;
    isFormData?: boolean;
    instanceType?: TAxiosInstance;
    withNormalize?: boolean;
  };
};

export type TResponse<T> = TSuccess<T> | TFailure;

export type TBlobResponse = {
  fileName: string;
  url: string;
};
