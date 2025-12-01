import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchAdminStats } from '@/redux/slices/adminsSlice';

export const useAdminStats = () => {
  const dispatch = useAppDispatch();
  const { stats, loading, error } = useAppSelector((state) => state.admins);

  const loadStats = useCallback(() => {
    dispatch(fetchAdminStats());
  }, [dispatch]);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return {
    stats,
    loading,
    error,
    reload: loadStats,
  };
};
