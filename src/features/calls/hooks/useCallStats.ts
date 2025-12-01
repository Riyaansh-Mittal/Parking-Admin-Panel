import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchCallStats } from '@/redux/slices/callsSlice';
import type { StatsDateRange } from '@/features/calls/types';

export const useCallStats = (initialDateRange?: StatsDateRange) => {
  const dispatch = useAppDispatch();
  const { stats, loading, error } = useAppSelector((state) => state.calls);
  const [dateRange, setDateRange] = useState<StatsDateRange | undefined>(initialDateRange);

  const loadStats = useCallback(
    (params?: StatsDateRange) => {
      dispatch(fetchCallStats(params));
    },
    [dispatch]
  );

  const updateDateRange = useCallback(
    (newRange: StatsDateRange) => {
      setDateRange(newRange);
      loadStats(newRange);
    },
    [loadStats]
  );

  useEffect(() => {
    loadStats(dateRange);
  }, [loadStats, dateRange]);

  return {
    stats,
    loading,
    error,
    dateRange,
    loadStats,
    updateDateRange,
  };
};
