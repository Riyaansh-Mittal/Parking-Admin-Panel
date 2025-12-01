import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateUser, updateUserStatus } from '@/redux/slices/usersSlice';
import type { UpdateUserPayload, UpdateUserStatusPayload } from '@/features/users/types';

export const useUpdateUser = () => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.users);

  const update = useCallback(
    async (userId: string, data: UpdateUserPayload) => {
      const result = await dispatch(updateUser({ userId, data }));
      return result.meta.requestStatus === 'fulfilled';
    },
    [dispatch]
  );

  const updateStatus = useCallback(
    async (userId: string, data: UpdateUserStatusPayload) => {
      const result = await dispatch(updateUserStatus({ userId, data }));
      return result.meta.requestStatus === 'fulfilled';
    },
    [dispatch]
  );

  return {
    update,
    updateStatus,
    loading,
    error,
  };
};
