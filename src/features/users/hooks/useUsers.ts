import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchUsers, setFilters, clearFilters } from '@/redux/slices/usersSlice';
import type { UserFilters } from '@/features/users/types';

export const useUsers = () => {
  const dispatch = useAppDispatch();
  const { users, pagination, filters, loading, error } = useAppSelector((state) => state.users);

  const loadUsers = useCallback(
    (page: number = 1, pageSize: number = 20) => {
      dispatch(fetchUsers({ page, page_size: pageSize, filters }));
    },
    [dispatch, filters]
  );

  const applyFilters = useCallback(
    (newFilters: UserFilters) => {
      dispatch(setFilters(newFilters));
      dispatch(fetchUsers({ page: 1, page_size: 20, filters: newFilters }));
    },
    [dispatch]
  );

  const resetFilters = useCallback(() => {
    dispatch(clearFilters());
    dispatch(fetchUsers({ page: 1, page_size: 20, filters: {} }));
  }, [dispatch]);

  const refetch = useCallback(() => {
    const currentPage = pagination?.current_page || 1;
    const pageSize = pagination?.page_size || 20;
    dispatch(fetchUsers({ page: currentPage, page_size: pageSize, filters }));
  }, [dispatch, pagination, filters]);

  return {
    users,
    pagination,
    filters,
    loading,
    error,
    loadUsers,
    applyFilters,
    resetFilters,
    refetch,
  };
};
