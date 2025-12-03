import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/redux/store';
import { fetchResetLogs, clearResetLogs } from '@/redux/slices/balancesSlice';
import type { ResetLogFilters } from '@/features/balances/types';
import { useDeepCompareMemoize } from './useDeepCompareMemoize';

interface UseResetLogsParams {
  filters?: ResetLogFilters;
  page?: number;
  pageSize?: number;
  autoFetch?: boolean;
}

export const useResetLogs = ({
  filters = {},
  page = 1,
  pageSize = 20,
  autoFetch = true,
}: UseResetLogsParams = {}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { resetLogs, pagination, logsLoading, error } = useSelector(
    (state: RootState) => state.balances
  );

  const stableFilters = useDeepCompareMemoize(filters);

  const fetchData = useCallback(() => {
    // Remove empty filters
    const cleanFilters: ResetLogFilters = {};
    Object.entries(stableFilters).forEach(([key, value]) => {
      if (value !== '' && value !== undefined && value !== null) {
        cleanFilters[key as keyof ResetLogFilters] = value as never;
      }
    });

    dispatch(fetchResetLogs({ filters: cleanFilters, page, pageSize }));
  }, [dispatch, stableFilters, page, pageSize]);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }

    return () => {
      dispatch(clearResetLogs());
    };
  }, [autoFetch, fetchData, dispatch]);

  return {
    resetLogs,
    pagination,
    loading: logsLoading,
    error,
    refetch: fetchData,
  };
};
