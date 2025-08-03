import { useQueryClient, QueryKey } from '@tanstack/react-query';
import { useCallback } from 'react';

/**
 * Utility hooks for common React Query patterns
 */

/**
 * Provides helper functions for cache invalidation and optimistic updates
 */
export function useQueryHelpers() {
  const queryClient = useQueryClient();

  const invalidateQueries = useCallback((queryKey: QueryKey) => {
    return queryClient.invalidateQueries({ queryKey });
  }, [queryClient]);

  const removeQueries = useCallback((queryKey: QueryKey) => {
    return queryClient.removeQueries({ queryKey });
  }, [queryClient]);

  const setQueryData = useCallback(<T>(queryKey: QueryKey, data: T) => {
    return queryClient.setQueryData(queryKey, data);
  }, [queryClient]);

  const getQueryData = useCallback(<T>(queryKey: QueryKey): T | undefined => {
    return queryClient.getQueryData(queryKey);
  }, [queryClient]);

  const prefetchQuery = useCallback(async (queryKey: QueryKey, queryFn: () => Promise<any>) => {
    return queryClient.prefetchQuery({ queryKey, queryFn });
  }, [queryClient]);

  const invalidateAll = useCallback((baseKey: readonly string[]) => {
    return queryClient.invalidateQueries({ queryKey: baseKey });
  }, [queryClient]);

  return {
    invalidateQueries,
    removeQueries,
    setQueryData,
    getQueryData,
    prefetchQuery,
    invalidateAll,
  };
}

/**
 * Common query configuration defaults
 */
export const QueryDefaults = {
  staleTime: {
    short: 2 * 60 * 1000,   // 2 minutes
    medium: 5 * 60 * 1000,  // 5 minutes
    long: 10 * 60 * 1000,   // 10 minutes
  },
  cacheTime: {
    short: 5 * 60 * 1000,   // 5 minutes
    medium: 10 * 60 * 1000, // 10 minutes
    long: 30 * 60 * 1000,   // 30 minutes
  },
  retry: {
    none: false,
    minimal: 1,
    standard: 3,
    aggressive: 5,
  },
} as const;

/**
 * Common error handler for queries
 */
export function createQueryErrorHandler(context?: string) {
  return (error: Error) => {
    const message = context ? `${context}: ${error.message}` : error.message;
    console.error(message, error);
    
    // In a production app, you might want to send this to an error tracking service
    // errorReportingService.captureException(error, { context });
  };
}

/**
 * Hook for creating optimistic updates
 */
export function useOptimisticUpdate<T>(
  queryKey: QueryKey,
  updater: (oldData: T | undefined) => T
) {
  const queryClient = useQueryClient();

  return useCallback(() => ({
    onMutate: async () => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey });
      
      // Snapshot the previous value
      const previousData = queryClient.getQueryData<T>(queryKey);
      
      // Optimistically update
      queryClient.setQueryData<T>(queryKey, updater);
      
      // Return context with snapshotted value
      return { previousData };
    },
    onError: (_error: Error, _variables: any, context: any) => {
      // Rollback on error
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey });
    },
  }), [queryClient, queryKey, updater]);
}