import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  fetchCallSummary,
  fetchReferralSummary,
} from '@redux/slices/analyticsSlice';
import type { AnalyticsFilters } from '../types';

export const useDashboardStats = (filters?: AnalyticsFilters) => {
  const dispatch = useAppDispatch();
  
  const { callSummary, referralSummary, loading, error } = useAppSelector(
    (state) => state.analytics
  );

  useEffect(() => {
    dispatch(fetchCallSummary(filters));
    dispatch(fetchReferralSummary(filters));
  }, [dispatch, filters]);

  const isLoading = loading.callSummary || loading.referralSummary;
  const hasError = error.callSummary || error.referralSummary;

  return {
    callSummary,
    referralSummary,
    loading: isLoading,
    error: hasError,
  };
};
