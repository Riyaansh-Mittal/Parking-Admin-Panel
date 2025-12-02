import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCodes, fetchCodeStats } from '@redux/slices/codesSlice';
import type { CodeFilters } from '../types';

interface UseCodesParams {
  filters?: CodeFilters;
  page?: number;
  page_size?: number;
  ordering?: string;
}

export const useCodes = (params: UseCodesParams = {}) => {
  const dispatch = useAppDispatch();
  const { codes, stats, loading, error, pagination } = useAppSelector(
    (state) => state.codes
  );

  // ✅ Memoize params to avoid infinite loops
  const memoizedFilters = useMemo(() => params.filters, [params.filters]);

  const memoizedParams = useMemo(
    () => ({
      page: params.page,
      page_size: params.page_size,
      ordering: params.ordering,
      filters: memoizedFilters,
    }),
    [params.page, params.page_size, params.ordering, memoizedFilters]
  );

  useEffect(() => {
    dispatch(fetchCodes(memoizedParams));
  }, [dispatch, memoizedParams]);

  useEffect(() => {
    dispatch(fetchCodeStats()); // ✅ No parameters needed
  }, [dispatch]);

  const refetch = () => {
    dispatch(fetchCodes(memoizedParams));
    dispatch(fetchCodeStats());
  };

  return {
    codes,
    stats,
    loading,
    error,
    pagination,
    refetch,
  };
};
