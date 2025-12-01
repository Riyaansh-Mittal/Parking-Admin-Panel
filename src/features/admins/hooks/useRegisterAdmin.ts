import { useState, useCallback } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { registerAdmin } from '@/redux/slices/adminsSlice';
import type { RegisterAdminPayload } from '@/features/admins/types';

export const useRegisterAdmin = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const register = useCallback(
    async (data: RegisterAdminPayload) => {
      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
        const result = await dispatch(registerAdmin(data)).unwrap();
        setSuccess(true);
        return result;
      } catch (err) {
        const errorMessage = err as string;
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return {
    register,
    loading,
    error,
    success,
    reset,
  };
};
