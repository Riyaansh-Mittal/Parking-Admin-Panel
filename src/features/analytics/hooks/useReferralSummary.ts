import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchReferralSummary } from '@redux/slices/analyticsSlice';
import type { ReferralAnalyticsFilters } from '../types';

export const useReferralSummary = (filters?: ReferralAnalyticsFilters) => {
  const dispatch = useAppDispatch();
  
  const { referralSummary, loading, error } = useAppSelector(
    (state) => state.analytics
  );

  useEffect(() => {
    dispatch(fetchReferralSummary(filters));
  }, [dispatch, filters]);

  return {
    summary: referralSummary,
    loading: loading.referralSummary,
    error: error.referralSummary,
  };
};
