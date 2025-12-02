import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCampaignPerformance } from '@/redux/slices/campaignsSlice';

interface UsePerformanceParams {
  campaign_id?: string;
  start_date?: string;
  end_date?: string;
}

export const useCampaignPerformance = (params?: UsePerformanceParams) => {
  const dispatch = useAppDispatch();
  const { performance, performanceLoading, performanceError } = useAppSelector(
    (state) => state.campaigns
  );

  const { campaign_id, start_date, end_date } = params || {};

  useEffect(() => {
    dispatch(fetchCampaignPerformance({ campaign_id, start_date, end_date }));
  }, [dispatch, campaign_id, start_date, end_date]);

  const refetch = () => {
    dispatch(fetchCampaignPerformance({ campaign_id, start_date, end_date }));
  };

  return {
    performance,
    loading: performanceLoading,
    error: performanceError,
    refetch,
  };
};
