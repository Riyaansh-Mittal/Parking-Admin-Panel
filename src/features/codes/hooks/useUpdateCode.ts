import { useState } from 'react';
import { useAppDispatch } from '@/redux/hooks';
import { updateCode } from '@/redux/slices/codesSlice';
import type { UpdateCodePayload } from '../types';

export const useUpdateCode = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = async (codeId: string, payload: UpdateCodePayload) => {
    setLoading(true);
    setError(null);

    try {
      // ✅ Use 'data' not 'payload' as parameter name
      await dispatch(updateCode({ codeId, payload })).unwrap();
      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update code';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  return {
    update,
    loading,
    error,
  };
};
