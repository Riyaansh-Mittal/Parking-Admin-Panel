import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCampaignPerformance } from '@redux/slices/analyticsSlice';
import type { ReferralAnalyticsFilters } from '../types';

export const useCampaignPerformance = (filters?: ReferralAnalyticsFilters) => {
  const dispatch = useAppDispatch();
  
  const { campaignPerformance, loading, error } = useAppSelector(
    (state) => state.analytics
  );

  useEffect(() => {
    dispatch(fetchCampaignPerformance(filters));
  }, [dispatch, filters]);

  return {
    campaigns: campaignPerformance,
    loading: loading.campaignPerformance,
    error: error.campaignPerformance,
  };
};
