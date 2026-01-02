'use client'
import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,

} from '@tanstack/react-query';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { getSession, useSession } from 'next-auth/react';
import { ActivityPage, FetchParams, PaginatedResponse } from '@/network/types';
import { network_routes } from './route';
// import { useErrorHandling } from '@/hooks/handle-error';
// import { PaginatedResponse } from './types';

type QueryConfig<TQueryKey, TData> = {
  queryKey: TQueryKey;
  apiRoute: string;
  options?: Omit<AxiosRequestConfig, 'url' | 'method'> & {
    enabled?: boolean;
    retry?: () => void;
    staleTime?: number;
    refetchOnWindowFocus?: boolean;
    refetchOnMount?: boolean;
    refetchOnReconnect?: boolean;
    refetchInterval?: number | false;
    cacheTime?: number;
  };
};

type QueryConfigWithParams<TQueryKey, TData> = QueryConfig<TQueryKey, TData> & {
  params?: Record<string, string | number | boolean | null>;
};

type MutationConfig<TVariables, TData> = {
  apiRoute: string;
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: TVariables;
  options?: Omit<AxiosRequestConfig, 'url' | 'method'> & {
    enabled?: boolean;
  };
};

const axiosInstance = axios.create({
  baseURL: '/api/user/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export function useAppQuery<
  TData = unknown,
  TError = AxiosError,
  TQueryKey extends Array<unknown> = unknown[],
>(config: QueryConfig<TQueryKey, TData>): UseQueryResult<TData, TError> {
  const { queryKey, apiRoute, options } = config;
  const { data: session, status } = useSession()

  const query = useQuery<TData, TError>({
    queryKey,
    queryFn: async () => {
      const session = await getSession();
      const token = session?.user?.accessToken ?? '';
      const response = await axiosInstance.get<TData>(apiRoute, {
        ...options,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response?.data) {
        throw new Error(
          'No data received from server. It may be network issue'
        );
      }

      return response.data;
    },

     retry: (failureCount, error: any) => {
      // Don't retry on auth errors or rate limits
      if (
        error.message?.includes('401') || 
        error.message?.includes('Unauthorized') ||
        error.message?.includes('429') ||
        error.message?.includes('Rate limit')
      ) {
        return false
      }
      return failureCount < 1
    },
    enabled: status === 'authenticated' && !!session?.user,
    retryDelay: 3000,
    gcTime: 10 * 60 * 1000,
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  return query
//   return useErrorHandling(() => query)();
}

export function useAppQueryWithPaginationAndParams<
  TData = unknown,
  TError = AxiosError,
  TQueryKey extends Array<unknown> = unknown[],
>(
  config: QueryConfigWithParams<TQueryKey, TData>
): UseQueryResult<PaginatedResponse<TData>, TError> {
  const { apiRoute, queryKey, options, params } = config;

  const query = useQuery<PaginatedResponse<TData>, TError>({
    queryKey,
    queryFn: async () => {
      const session = await getSession();
      const token = session?.user?.accessToken ?? '';
      const queryParams = params
        ? Object.entries(params).reduce(
            (acc, [key, value]) => {
              if (value !== null && value !== undefined) {
                acc[key] =
                  typeof value === 'string' ? value.toLowerCase() : value;
                // Add the key as an object in queryKey
                queryKey.push({ [key]: value });
              }
              return acc;
            },
            {} as Record<string, any>
          )
        : undefined;

      const response = await axiosInstance.get<PaginatedResponse<TData>>(
        apiRoute,
        {
          ...options,
          params: queryParams,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response?.data) {
        throw new Error(
          'No data received from server. It may be network issue'
        );
      }

      return (
        response.data ?? {
          count: 0,
          next: null,
          previous: null,
          results: [],
        }
      );
    },
    retry: 3,
    staleTime: 1000 * 60 * 5,
  });

  return query
//   return useErrorHandling(() => query)();
}

export function useAppMutation<
  TData = unknown,
  TError = AxiosError,
  TVariables = unknown,
>(
  config: MutationConfig<TVariables, TData>
): UseMutationResult<NonNullable<TData>, TError, TVariables> {
  const { apiRoute, method, body, options } = config;

  const mutation = useMutation<NonNullable<TData>, TError, TVariables>({
    mutationFn: async (variables: TVariables) => {
      const session = await getSession();
      const token = session?.user?.accessToken ?? '';

      const response = await axiosInstance.request<TData>({
        url: apiRoute,
        method,
        data: body ?? variables,
        ...options,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response?.data) {
        throw new Error(
          'No data received from server. It may be network issue'
        );
      }

      return response.data as NonNullable<TData>;
    },
    retry: 0,
  });

  return mutation
//   return useErrorHandling(() => mutation)();
}

export async function fetchActivityMock({
  limit,
  cursor,
  window,
}: FetchParams): Promise<ActivityPage> {
  const res = await axiosInstance.get<ActivityPage>(
    network_routes.user_activity_table_mock,
    {
      params: {
        mock: true,
        limit,
        cursor,
        window,
      },
    }
  )

  return res.data
}
