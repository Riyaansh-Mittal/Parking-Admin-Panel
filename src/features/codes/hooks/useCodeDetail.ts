import { useState, useCallback } from 'react';
import { codesService } from '@/api/services/codes.service';
import { type ReferralCode } from '../types';

export const useCodeDetail = () => {
  const [code, setCode] = useState<ReferralCode | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDetail = useCallback(async (codeId: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await codesService.getCodeDetail(codeId);
      const adaptedCode = response.data; // ✅ Adapt type
      setCode(adaptedCode);
      return { success: true, data: adaptedCode };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch code details';
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  }, []);

  const refetch = useCallback(() => {
    if (code?.id) {
      fetchDetail(code.id);
    }
  }, [code?.id, fetchDetail]);

  return {
    code,
    loading,
    error,
    fetchDetail,
    refetch,
  };
};
