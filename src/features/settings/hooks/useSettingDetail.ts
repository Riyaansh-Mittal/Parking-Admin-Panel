import { useState, useEffect, useCallback } from 'react';
import { getSettingDetail, type PlatformSetting } from '@api/services/settings.service';

interface UseSettingDetailReturn {
  setting: PlatformSetting | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useSettingDetail = (key: string): UseSettingDetailReturn => {
  const [setting, setSetting] = useState<PlatformSetting | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSetting = useCallback(async () => {
    if (!key) return;

    try {
      setLoading(true);
      setError(null);
      const response = await getSettingDetail(key);
      setSetting(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch setting');
      setSetting(null);
    } finally {
      setLoading(false);
    }
  }, [key]);

  useEffect(() => {
    fetchSetting();
  }, [fetchSetting]);

  return {
    setting,
    loading,
    error,
    refetch: fetchSetting,
  };
};
