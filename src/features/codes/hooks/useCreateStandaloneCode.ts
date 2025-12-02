import { useState, useCallback } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { createStandaloneCode } from '@/redux/slices/codesSlice';
import type { CreateStandaloneCodePayload } from '@/features/codes/types';

export const useCreateStandaloneCode = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const create = useCallback(
    async (payload: CreateStandaloneCodePayload) => {
      setLoading(true);
      setError(null);

      try {
        const result = await dispatch(createStandaloneCode(payload)).unwrap();
        return { success: true, data: result };
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to create code';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  return {
    create,
    loading,
    error,
  };
};
