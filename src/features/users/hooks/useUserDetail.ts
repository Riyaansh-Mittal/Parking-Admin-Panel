import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchUserDetail, clearCurrentUser } from '@/redux/slices/usersSlice';

export const useUserDetail = (userId: string | undefined) => {
  const dispatch = useAppDispatch();
  const { currentUser, loading, error } = useAppSelector((state) => state.users);

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserDetail(userId));
    }

    return () => {
      dispatch(clearCurrentUser());
    };
  }, [userId, dispatch]);

  const refetch = useCallback(() => {
    if (userId) {
      dispatch(fetchUserDetail(userId));
    }
  }, [userId, dispatch]);

  return {
    user: currentUser,
    loading,
    error,
    refetch,
  };
};
