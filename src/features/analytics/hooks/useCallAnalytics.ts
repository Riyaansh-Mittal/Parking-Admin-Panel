import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCallAnalytics } from '@redux/slices/analyticsSlice';
import type { AnalyticsFilters } from '../types';

export const useCallAnalytics = (filters?: AnalyticsFilters) => {
  const dispatch = useAppDispatch();
  
  const { callAnalytics, loading, error } = useAppSelector(
    (state) => state.analytics
  );

  useEffect(() => {
    dispatch(fetchCallAnalytics(filters));
  }, [dispatch, filters]);

  return {
    analytics: callAnalytics,
    loading: loading.callAnalytics,
    error: error.callAnalytics,
  };
};
