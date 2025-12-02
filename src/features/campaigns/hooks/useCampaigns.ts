import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCampaigns } from '@/redux/slices/campaignsSlice';
import type { CampaignFilters } from '../types';

export const useCampaigns = (filters?: CampaignFilters) => {
  const dispatch = useAppDispatch();
  const { campaigns, loading, error, pagination } = useAppSelector(
    (state) => state.campaigns
  );

  const serializedFilters = useMemo(() => JSON.stringify(filters), [filters]);

  useEffect(() => {
    dispatch(fetchCampaigns(filters));
  }, [dispatch, serializedFilters, filters]);

  const refetch = () => {
    dispatch(fetchCampaigns(filters));
  };

  return {
    campaigns,
    loading,
    error,
    pagination,
    refetch,
  };
};
