import { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@/redux/store';
import { bulkUpdateBalances } from '@/redux/slices/balancesSlice';
import type { BulkUpdateBalanceRequest, BulkUpdateResponse } from '@/features/balances/types';

interface UseBulkUpdateBalanceResult {
  bulkUpdate: (data: BulkUpdateBalanceRequest) => Promise<BulkUpdateResponse>;
  loading: boolean;
  error: string | null;
  success: boolean;
}

export const useBulkUpdateBalance = (): UseBulkUpdateBalanceResult => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const bulkUpdate = useCallback(
    async (data: BulkUpdateBalanceRequest) => {
      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
        const result = await dispatch(bulkUpdateBalances(data)).unwrap();
        setSuccess(true);
        return result;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to bulk update balances';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  return {
    bulkUpdate,
    loading,
    error,
    success,
  };
};
