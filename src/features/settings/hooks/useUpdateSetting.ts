import { useState, useCallback } from 'react';
import { updateSetting, type PlatformSetting } from '@api/services/settings.service';

interface UseUpdateSettingReturn {
  updateSettingValue: (
    key: string,
    value: string | number | boolean,
    changeReason?: string
  ) => Promise<PlatformSetting>;
  loading: boolean;
  error: string | null;
  success: boolean;
  clearMessages: () => void;
}

export const useUpdateSetting = (): UseUpdateSettingReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateSettingValue = useCallback(
    async (
      key: string,
      value: string | number | boolean,
      changeReason?: string
    ): Promise<PlatformSetting> => {
      try {
        setLoading(true);
        setError(null);
        setSuccess(false);

        const response = await updateSetting(key, value, changeReason);
        setSuccess(true);
        return response.data;
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to update setting';
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const clearMessages = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return {
    updateSettingValue,
    loading,
    error,
    success,
    clearMessages,
  };
};
