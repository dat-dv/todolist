import type { AxiosResponse } from "axios";

import type { TBaseFetcherOptions, TResponse } from "../types/axios.type";
import type { TTransformResponse } from "../types/base.type";
import axiosInstance from "./instance";
import { normalizeUrl } from "./normalize-url";

export const getFetcher = async <T, D = unknown>(
  url: string,
  options?: TBaseFetcherOptions<D>
): Promise<T> => {
  const { extendUrl } = options?.arg || {};
  const response: AxiosResponse<T> = await axiosInstance.request<T>({
    url: normalizeUrl(url, extendUrl || ""),
    method: "GET",
  });

  return response.data;
};

export const getTriggerFetcher = async <T, D = unknown>(
  url: string,
  options?: TBaseFetcherOptions<D>
): Promise<TResponse<T>> => {
  try {
    const { extendUrl, withNormalize = true, ...data } = options?.arg || {};
    const response = await axiosInstance.request<TTransformResponse<T>>({
      url: withNormalize
        ? normalizeUrl(url, extendUrl || "")
        : `${url}${extendUrl || ""}`,
      method: "GET",
      data,
    });

    return {
      status: "success",
      data: response.data,
    };
  } catch (error) {
    return {
      status: "failed",
      error,
    };
  }
};

export const postFetcher = async <T, D = unknown>(
  url: string,
  options?: TBaseFetcherOptions<D>
): Promise<TResponse<T>> => {
  try {
    const { extendUrl, ...data } = options?.arg || {};

    const fullUrl = normalizeUrl(url, extendUrl || "");
    const response = await axiosInstance.request<TTransformResponse<T>>({
      url: fullUrl,
      method: "POST",
      data,
    });
    return {
      status: "success",
      data: response.data,
    };
  } catch (error) {
    return {
      status: "failed",
      error,
    };
  }
};

export const putFetcher = async <T, D = unknown>(
  url: string,
  options?: TBaseFetcherOptions<D>
): Promise<TResponse<T>> => {
  try {
    const { extendUrl, ...data } = options?.arg || {};

    const response = await axiosInstance.request<TTransformResponse<T>>({
      url: normalizeUrl(url, extendUrl || ""),
      method: "PUT",
      data,
    });
    return {
      status: "success",
      data: response.data,
    };
  } catch (error) {
    return {
      status: "failed",
      error,
    };
  }
};

export const patchFetcher = async <T, D = object>(
  url: string,
  options?: TBaseFetcherOptions<D>
): Promise<TResponse<T>> => {
  try {
    const { extendUrl, ...data } = options?.arg || {};
    const response = await axiosInstance.request<TTransformResponse<T>>({
      url: normalizeUrl(url, extendUrl || ""),
      method: "PATCH",
      data,
    });

    return {
      status: "success",
      data: response.data,
    };
  } catch (error) {
    return {
      status: "failed",
      error,
    };
  }
};

export const deleteFetcher = async <T, D = unknown>(
  url: string,
  options?: TBaseFetcherOptions<D>
): Promise<TResponse<T>> => {
  try {
    const { extendUrl, ...data } = options?.arg || {};
    const response = await axiosInstance.request<TTransformResponse<T>>({
      url: normalizeUrl(url, extendUrl || ""),
      method: "DELETE",
      data,
    });

    return {
      status: "success",
      data: response.data,
    };
  } catch (error) {
    return {
      status: "failed",
      error,
    };
  }
};
