import { useCallback, useEffect, useState } from 'react';
import * as callsService from '@/api/services/calls.service';
import type { CallEvent, CallEventFilters } from '@/features/calls/types';
import type { PaginationMeta } from '@/types/pagination.types';

export const useCallEvents = (callId: string | undefined) => {
  const [events, setEvents] = useState<CallEvent[]>([]);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [filters, setFilters] = useState<CallEventFilters>({ page: 1, page_size: 50 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadEvents = useCallback(
    async (eventFilters?: CallEventFilters) => {
      if (!callId) return;

      setLoading(true);
      setError(null);

      try {
        const response = await callsService.getCallEvents(callId, eventFilters ?? filters);
        setEvents(response.data);
        setPagination(response.pagination);
      } catch (err) {
        const errorMessage =
          err && typeof err === 'object' && 'message' in err
            ? (err as { message: string }).message
            : 'Failed to load call events';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [callId, filters]
  );

  const applyFilters = useCallback((newFilters: Partial<CallEventFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  }, []);

  const loadPage = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  useEffect(() => {
    if (callId) {
      loadEvents(filters);
    }
  }, [callId, filters, loadEvents]);

  return {
    events,
    pagination,
    filters,
    loading,
    error,
    loadEvents,
    applyFilters,
    loadPage,
  };
};
