import { useState, useEffect, useCallback } from 'react';
import { relationshipsService } from '@/api/services/relationships.service';
import type { Relationship, RelationshipFilters } from '../types';
import type { PaginationMeta } from '@/types';

export const useRelationships = (initialFilters?: RelationshipFilters) => {
  const [relationships, setRelationships] = useState<Relationship[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [filters, setFilters] = useState<RelationshipFilters>(
    initialFilters || { page: 1, page_size: 20 }
  );

  const fetchRelationships = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await relationshipsService.getRelationships(filters);
      setRelationships(response.data);
      setPagination(response.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch relationships');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchRelationships();
  }, [fetchRelationships]);

  const updateFilters = (newFilters: Partial<RelationshipFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  const changePage = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  const refresh = () => {
    fetchRelationships();
  };

  return {
    relationships,
    loading,
    error,
    pagination,
    filters,
    updateFilters,
    changePage,
    refresh,
  };
};
