import { useState, useCallback } from 'react';
import type { SortDirection, SortConfig } from '@types';

export interface UseSortOptions {
  initialField?: string;
  initialDirection?: SortDirection;
  onSortChange?: (sortConfig: SortConfig) => void;
}

export interface UseSortReturn {
  sortConfig: SortConfig;
  sortField: string;
  sortDirection: SortDirection;
  handleSort: (field: string) => void;
  toggleDirection: () => void;
  setSortConfig: (config: SortConfig) => void;
}

export function useSort({
  initialField = '',
  initialDirection = 'asc',
  onSortChange,
}: UseSortOptions = {}): UseSortReturn {
  const [sortConfig, setSortConfigState] = useState<SortConfig>({
    field: initialField,
    direction: initialDirection,
  });

  const handleSort = useCallback(
    (field: string) => {
      setSortConfigState((prev) => {
        // If clicking the same field, toggle direction
        const newDirection: SortDirection =
          prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc';

        const newConfig = { field, direction: newDirection };
        onSortChange?.(newConfig);
        return newConfig;
      });
    },
    [onSortChange]
  );

  const toggleDirection = useCallback(() => {
    setSortConfigState((prev) => {
      const newConfig = {
        ...prev,
        direction: (prev.direction === 'asc' ? 'desc' : 'asc') as SortDirection,
      };
      onSortChange?.(newConfig);
      return newConfig;
    });
  }, [onSortChange]);

  const setSortConfig = useCallback(
    (config: SortConfig) => {
      setSortConfigState(config);
      onSortChange?.(config);
    },
    [onSortChange]
  );

  return {
    sortConfig,
    sortField: sortConfig.field,
    sortDirection: sortConfig.direction,
    handleSort,
    toggleDirection,
    setSortConfig,
  };
}
