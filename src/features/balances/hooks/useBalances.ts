import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/redux/store';
import { fetchBalances } from '@/redux/slices/balancesSlice';
import type { BalanceFilters } from '@/features/balances/types';
import { useDeepCompareMemoize } from './useDeepCompareMemoize';

interface UseBalancesParams {
  filters?: BalanceFilters;
  autoFetch?: boolean;
}

export const useBalances = ({
  filters = {},
  autoFetch = true,
}: UseBalancesParams = {}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { balances, loading, error } = useSelector(
    (state: RootState) => state.balances
  );

  // Stable reference that only changes when filters content changes
  const stableFilters = useDeepCompareMemoize(filters);

  const fetchData = useCallback(() => {
    // Remove empty filters
    const cleanFilters: BalanceFilters = {};
    Object.entries(stableFilters).forEach(([key, value]) => {
      if (value !== '' && value !== undefined && value !== null) {
        cleanFilters[key as keyof BalanceFilters] = value as never;
      }
    });

    dispatch(fetchBalances(cleanFilters));
  }, [dispatch, stableFilters]);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch, fetchData]);

  return {
    balances,
    loading,
    error,
    refetch: fetchData,
  };
};
