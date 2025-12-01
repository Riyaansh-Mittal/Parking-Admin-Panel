import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCalls, setFilters, clearFilters } from '@/redux/slices/callsSlice';
import type { CallFilters } from '@/features/calls/types';

export const useCalls = () => {
  const dispatch = useAppDispatch();
  const { calls, pagination, filters, loading, error } = useAppSelector(
    (state) => state.calls
  );

  const loadCalls = useCallback(
    (page?: number, pageSize?: number) => {
      const newFilters: CallFilters = {
        ...filters,
        page: page ?? filters.page ?? 1,
        page_size: pageSize ?? filters.page_size ?? 20,
      };
      dispatch(fetchCalls(newFilters));
    },
    [dispatch, filters]
  );

  const applyFilters = useCallback(
    (newFilters: Partial<CallFilters>) => {
      dispatch(setFilters({ ...newFilters, page: 1 }));
    },
    [dispatch]
  );

  const resetFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  const refreshCalls = useCallback(() => {
    dispatch(fetchCalls(filters));
  }, [dispatch, filters]);

  // Reload when filters change
  useEffect(() => {
    dispatch(fetchCalls(filters));
  }, [dispatch, filters]);

  return {
    calls,
    pagination,
    filters,
    loading,
    error,
    loadCalls,
    applyFilters,
    resetFilters,
    refreshCalls,
  };
};
