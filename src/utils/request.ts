import type { SWRConfiguration } from "swr";
import type { TFilterField, TFilterCondition } from "src/utils/query-builder";
import type { TAxiosMethod, TBaseFetcherOptions } from "src/types/axios.types";
import type {
  TTransformResponse,
  TTransformPagination,
} from "src/types/entities/base";

import useSWR from "swr";
import useSWRMutation from "swr/mutation";

import QueryBuilder from "src/utils/query-builder";
import {
  getFetcher,
  putFetcher,
  postFetcher,
  patchFetcher,
  deleteFetcher,
  getBlobFetcher,
  getTriggerFetcher,
} from "src/utils/axios";

import { usePermissionAPI } from "../common/use-check-permission";

type TSWRWithPermissionParams<T extends string = TFilterField<string>> = {
  shouldFetch?: boolean;
  params?: Record<string, any>;
  filterConditions?: TFilterCondition<T>[];
  config?: SWRConfiguration;
};

class REQUEST {
  private static usePermissionAPI = usePermissionAPI;

  private static useSWR = useSWR;

  private static useSWRMutation = useSWRMutation;

  private static MUTATION_FETCHER = {
    PUT: putFetcher,
    PATCH: patchFetcher,
    DELETE: deleteFetcher,
    POST: postFetcher,
    GET: getTriggerFetcher,
  };

  private static useSWRWithPermission<
    T,
    TFilter extends string = string,
    D = any
  >({
    baseUrl,
    params,
    config = {},
    filterConditions = [],
  }: {
    baseUrl?: string | null;
    params: Record<string, any>;
    config?: SWRConfiguration;
    filterConditions?: TFilterCondition<TFilter>[];
  }) {
    // const allowPermission = this.usePermissionAPI({
    //   path: baseUrl,
    //   method: 'GET',
    // });
    const allowPermission = true;
    const allowFetch = allowPermission && !!baseUrl;
    const url = allowFetch
      ? QueryBuilder.buildQuery({ params, filterConditions, baseUrl })
      : null;

    return this.useSWR(allowFetch ? url : null, getFetcher<T, D>, config);
  }

  private static useSWRMutationWithPermission<
    T,
    TFilter extends string = string,
    D = TBaseFetcherOptions<any>
  >({
    baseUrl,
    params,
    method,
    filterConditions = [],
  }: {
    baseUrl?: string | null;
    params: Record<string, any>;
    method: TAxiosMethod;
    filterConditions: TFilterCondition<TFilter>[];
  }) {
    const fetcher = this.MUTATION_FETCHER[method];
    const allowFetch = true;
    // TODO: Uncomment
    // this.usePermissionAPI({
    //   path: baseUrl,
    //   method,
    // });
    const url =
      allowFetch && baseUrl
        ? QueryBuilder.buildQuery({ params, filterConditions, baseUrl })
        : null;
    return this.useSWRMutation(url, fetcher<T, D>);
  }

  public static get<
    TRes,
    TFilter extends TFilterField<string> = string,
    TReq = any
  >(baseUrl: string) {
    return ({
      shouldFetch = true,
      params = {},
      filterConditions,
    }: TSWRWithPermissionParams<TFilter> = {}) =>
      this.useSWRWithPermission<TTransformResponse<TRes>, TFilter, TReq>({
        baseUrl: shouldFetch ? baseUrl : null,
        params,
        filterConditions,
      });
  }

  public static getList<
    TRes,
    TFilter extends TFilterField<string> = string,
    TReq = any
  >(baseUrl: string) {
    return ({
      shouldFetch = true,
      params = {},
      filterConditions,
      config,
    }: TSWRWithPermissionParams<TFilter> = {}) =>
      this.useSWRWithPermission<TTransformPagination<TRes>, TFilter, TReq>({
        baseUrl: shouldFetch ? baseUrl : null,
        params,
        filterConditions,
        config,
      });
  }

  public static triggerGetBlob<
    TFilter extends TFilterField<string> = string,
    TReq = any
  >(baseUrl: string) {
    return ({
      shouldFetch = true,
      params = {},
      filterConditions = [],
    }: TSWRWithPermissionParams<TFilter> = {}) => {
      const allowFetch = true;
      // TODO: Uncomment
      // this.usePermissionAPI({
      //   path: baseUrl,
      //   method,
      // });
      const url =
        allowFetch && baseUrl
          ? QueryBuilder.buildQuery({ params, filterConditions, baseUrl })
          : null;

      return this.useSWRMutation(url, getBlobFetcher);
    };
  }

  public static trigger<
    TRes,
    TFilter extends TFilterField<string> = string,
    TReq = TBaseFetcherOptions<any>
  >(baseUrl: string, method: TAxiosMethod) {
    return ({
      shouldFetch = true,
      params = {},
      filterConditions,
    }: TSWRWithPermissionParams<TFilter>) =>
      this.useSWRMutationWithPermission<TRes, TFilter, TReq>({
        baseUrl: shouldFetch ? baseUrl : null,
        params,
        method,
        filterConditions: filterConditions ?? [],
      });
  }
}

export default REQUEST;
