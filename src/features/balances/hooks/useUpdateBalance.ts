import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import { updateBalance } from '@/redux/slices/balancesSlice';
import type { UpdateBalanceRequest, Balance } from '@/features/balances/types';

interface UseUpdateBalanceResult {
  updateUserBalance: (userId: string, data: UpdateBalanceRequest) => Promise<Balance>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export const useUpdateBalance = (): UseUpdateBalanceResult => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateUserBalance = useCallback(
    async (userId: string, data: UpdateBalanceRequest) => {
      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
        const result = await dispatch(updateBalance({ userId, data })).unwrap();
        setSuccess(true);
        return result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to update balance';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  return {
    updateUserBalance,
    loading,
    error,
    success,
  };
};
