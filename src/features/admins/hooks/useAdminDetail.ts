import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchAdminDetail, clearCurrentAdmin } from '@/redux/slices/adminsSlice';

export const useAdminDetail = (adminId?: string) => {
  const dispatch = useAppDispatch();
  const { currentAdmin, loading, error } = useAppSelector((state) => state.admins);

  const loadAdminDetail = useCallback(
    (id: string) => {
      dispatch(fetchAdminDetail(id));
    },
    [dispatch]
  );

  const clearAdmin = useCallback(() => {
    dispatch(clearCurrentAdmin());
  }, [dispatch]);

  useEffect(() => {
    if (adminId) {
      loadAdminDetail(adminId);
    }

    return () => {
      clearAdmin();
    };
  }, [adminId, loadAdminDetail, clearAdmin]);

  return {
    admin: currentAdmin,
    loading,
    error,
    loadAdminDetail,
    clearAdmin,
  };
};
