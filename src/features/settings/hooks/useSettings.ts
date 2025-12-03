import { useState, useEffect, useCallback } from 'react';
import { getSettings, type PlatformSetting } from '@api/services/settings.service';
import type { SettingFilters } from '../types';
import type { PaginationMeta } from '@/types/pagination.types';

interface UseSettingsReturn {
  settings: PlatformSetting[];
  pagination: PaginationMeta | null;
  loading: boolean;
  error: string | null;
  fetchSettings: (filters?: SettingFilters) => Promise<void>;
  refetch: () => Promise<void>;
}

export const useSettings = (initialFilters?: SettingFilters): UseSettingsReturn => {
  const [settings, setSettings] = useState<PlatformSetting[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<SettingFilters | undefined>(initialFilters);

  const fetchSettings = useCallback(async (newFilters?: SettingFilters) => {
    try {
      setLoading(true);
      setError(null);
      const appliedFilters = newFilters || filters;
      setFilters(appliedFilters);

      const response = await getSettings(appliedFilters);
      setSettings(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch settings');
      setSettings([]);
      setPagination(null);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const refetch = useCallback(() => fetchSettings(filters), [fetchSettings, filters]);

  useEffect(() => {
    fetchSettings(initialFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  return {
    settings,
    pagination,
    loading,
    error,
    fetchSettings,
    refetch,
  };
};
