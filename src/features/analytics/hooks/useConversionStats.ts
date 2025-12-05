import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchConversionStats } from '@redux/slices/analyticsSlice';
import type { ReferralAnalyticsFilters } from '../types';

export const useConversionStats = (filters?: ReferralAnalyticsFilters) => {
  const dispatch = useAppDispatch();
  
  const { conversionStats, loading, error } = useAppSelector(
    (state) => state.analytics
  );

  useEffect(() => {
    dispatch(fetchConversionStats(filters));
  }, [dispatch, filters]);

  return {
    stats: conversionStats,
    loading: loading.conversionStats,
    error: error.conversionStats,
  };
};
