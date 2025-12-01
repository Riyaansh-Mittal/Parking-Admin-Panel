import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchUserStats } from '@/redux/slices/usersSlice';

export const useUserStats = () => {
  const dispatch = useAppDispatch();
  const { stats, loading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUserStats());
  }, [dispatch]);

  const refetch = useCallback(() => {
    dispatch(fetchUserStats());
  }, [dispatch]);

  return {
    stats,
    loading,
    error,
    refetch,
  };
};
