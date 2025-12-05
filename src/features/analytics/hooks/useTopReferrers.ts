import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchTopReferrers } from '@redux/slices/analyticsSlice';
import type { ReferralAnalyticsFilters } from '../types';

export const useTopReferrers = (filters?: ReferralAnalyticsFilters) => {
  const dispatch = useAppDispatch();
  const { topReferrers, loading, error } = useAppSelector(
    (state) => state.analytics
  );

  // Destructure filter values for stable dependencies
  const startDate = filters?.start_date;
  const endDate = filters?.end_date;
  const campaignId = filters?.campaign_id;
  const limit = filters?.limit;

  useEffect(() => {
    const filterParams: ReferralAnalyticsFilters = {};
    if (startDate) filterParams.start_date = startDate;
    if (endDate) filterParams.end_date = endDate;
    if (campaignId) filterParams.campaign_id = campaignId;
    if (limit) filterParams.limit = limit;
    
    dispatch(fetchTopReferrers(Object.keys(filterParams).length > 0 ? filterParams : undefined));
  }, [dispatch, startDate, endDate, campaignId, limit]);

  return {
    referrers: topReferrers,
    loading: loading.topReferrers,
    error: error.topReferrers,
  };
};
