import type { SWRConfiguration } from "swr";

import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import {
  deleteFetcher,
  getFetcher,
  getTriggerFetcher,
  patchFetcher,
  postFetcher,
  putFetcher,
} from "./fetcher";
import type { TAxiosMethod, TBaseFetcherOptions } from "../types/axios.type";
import type {
  TTransformPagination,
  TTransformResponse,
} from "../types/base.type";
import { buildParams } from "./build-params";

type TSWRWithPermissionParams = {
  shouldFetch?: boolean;
  params?: Record<string, unknown>;
  config?: SWRConfiguration;
};

class REQUEST {
  private static useSWR = useSWR;

  private static useSWRMutation = useSWRMutation;

  private static MUTATION_FETCHER = {
    PUT: putFetcher,
    PATCH: patchFetcher,
    DELETE: deleteFetcher,
    POST: postFetcher,
    GET: getTriggerFetcher,
  };

  private static useSWRWithPermission<T, D = unknown>({
    url,
    config = {},
    params = {},
  }: {
    url?: string | null;
    params?: Record<string, unknown>;
    config?: SWRConfiguration;
  }) {
    const fullUrl = buildParams({ url, queryParams: params });
    return this.useSWR(fullUrl, getFetcher<T, D>, config);
  }

  private static useSWRMutationWithPermission<
    T,
    D = TBaseFetcherOptions<unknown>
  >({
    url,
    method,
  }: {
    url?: string | null;
    params: Record<string, unknown>;
    method: TAxiosMethod;
  }) {
    const fetcher = this.MUTATION_FETCHER[method];
    return this.useSWRMutation(url, fetcher<T, D>);
  }

  public static get<TRes, TReq = unknown>(url: string) {
    return ({
      shouldFetch = true,
      params = {},
    }: TSWRWithPermissionParams = {}) =>
      this.useSWRWithPermission<TTransformResponse<TRes>, TReq>({
        url: shouldFetch ? url : null,
        params,
      });
  }

  public static getList<TRes, TReq = unknown>(url: string) {
    return ({
      shouldFetch = true,
      params = {},
      config,
    }: TSWRWithPermissionParams = {}) =>
      this.useSWRWithPermission<TTransformPagination<TRes>, TReq>({
        url: shouldFetch ? url : null,
        params,
        config,
      });
  }

  public static trigger<TRes, TReq = TBaseFetcherOptions<unknown>>(
    url: string,
    method: TAxiosMethod
  ) {
    return ({ shouldFetch = true, params = {} }: TSWRWithPermissionParams) =>
      this.useSWRMutationWithPermission<TRes, TReq>({
        url: shouldFetch ? url : null,
        params,
        method,
      });
  }
}

export default REQUEST;
