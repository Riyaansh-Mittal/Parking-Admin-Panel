import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchStatusBreakdown } from '@redux/slices/analyticsSlice';
import type { ReferralAnalyticsFilters } from '../types';

export const useStatusBreakdown = (filters?: ReferralAnalyticsFilters) => {
  const dispatch = useAppDispatch();
  
  const { statusBreakdown, loading, error } = useAppSelector(
    (state) => state.analytics
  );

  useEffect(() => {
    dispatch(fetchStatusBreakdown(filters));
  }, [dispatch, filters]);

  return {
    breakdown: statusBreakdown,
    loading: loading.statusBreakdown,
    error: error.statusBreakdown,
  };
};
