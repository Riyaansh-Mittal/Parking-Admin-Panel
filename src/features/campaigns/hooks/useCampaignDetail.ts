import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCampaignDetail, clearCurrentCampaign } from '@/redux/slices/campaignsSlice';

export const useCampaignDetail = (campaignId: string) => {
  const dispatch = useAppDispatch();
  const { currentCampaign, loading, error } = useAppSelector(
    (state) => state.campaigns
  );

  useEffect(() => {
    if (campaignId) {
      dispatch(fetchCampaignDetail(campaignId));
    }

    return () => {
      dispatch(clearCurrentCampaign());
    };
  }, [dispatch, campaignId]);

  const refetch = () => {
    if (campaignId) {
      dispatch(fetchCampaignDetail(campaignId));
    }
  };

  return {
    campaign: currentCampaign,
    loading,
    error,
    refetch,
  };
};
