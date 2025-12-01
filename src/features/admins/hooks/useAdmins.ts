import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import {
  fetchAdmins,
  setFilters,
  clearFilters,
  clearError,
} from '@/redux/slices/adminsSlice';
import type { AdminFilters } from '@/features/admins/types';

export const useAdmins = () => {
  const dispatch = useAppDispatch();
  const { admins, pagination, filters, loading, error } = useAppSelector((state) => state.admins);

  const loadAdmins = useCallback(
    (page = 1, pageSize = 20) => {
      dispatch(fetchAdmins({ page, page_size: pageSize, filters }));
    },
    [dispatch, filters]
  );

  const applyFilters = useCallback(
    (newFilters: AdminFilters) => {
      dispatch(setFilters(newFilters));
    },
    [dispatch]
  );

  const resetFilters = useCallback(() => {
    dispatch(clearFilters());
  }, [dispatch]);

  const clearErrorMessage = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  return {
    admins,
    pagination,
    filters,
    loading,
    error,
    loadAdmins,
    applyFilters,
    resetFilters,
    clearErrorMessage,
  };
};
