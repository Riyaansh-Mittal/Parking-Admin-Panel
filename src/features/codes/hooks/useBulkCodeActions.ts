import { useState, useCallback } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import {
  bulkDeactivateCodes,
  bulkExtendValidity,
  bulkIncreaseUsage,
} from '@/redux/slices/codesSlice';
import type {
  BulkDeactivatePayload,
  BulkExtendValidityPayload,
  BulkIncreaseUsagePayload,
} from '@/features/codes/types';

export const useBulkCodeActions = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deactivate = useCallback(
    async (payload: BulkDeactivatePayload) => {
      setLoading(true);
      setError(null);

      try {
        const result = await dispatch(bulkDeactivateCodes(payload)).unwrap();
        return { success: true, data: result };
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to deactivate codes';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  const extendValidity = useCallback(
    async (payload: BulkExtendValidityPayload) => {
      setLoading(true);
      setError(null);

      try {
        const result = await dispatch(bulkExtendValidity(payload)).unwrap();
        return { success: true, data: result };
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to extend validity';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  const increaseUsage = useCallback(
    async (payload: BulkIncreaseUsagePayload) => {
      setLoading(true);
      setError(null);

      try {
        const result = await dispatch(bulkIncreaseUsage(payload)).unwrap();
        return { success: true, data: result };
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to increase usage limit';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  return {
    deactivate,
    extendValidity,
    increaseUsage,
    loading,
    error,
  };
};
