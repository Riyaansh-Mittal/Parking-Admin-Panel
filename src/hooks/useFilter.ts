import { useState, useCallback, useMemo } from 'react';

export type FilterValue = 
  | string 
  | number 
  | boolean 
  | null
  | string[] 
  | number[]
  | { [key: string]: string | number | boolean | null };

export interface FilterState {
  [key: string]: FilterValue;
}

export interface UseFilterOptions {
  initialFilters?: FilterState;
  onFilterChange?: (filters: FilterState) => void;
}

export interface UseFilterReturn {
  filters: FilterState;
  setFilter: (key: string, value: FilterValue) => void;
  removeFilter: (key: string) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
  activeFilterCount: number;
}

export function useFilter({
  initialFilters = {},
  onFilterChange,
}: UseFilterOptions = {}): UseFilterReturn {
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  const setFilter = useCallback(
    (key: string, value: FilterValue) => {
      setFilters((prev) => {
        const newFilters = { ...prev, [key]: value };
        onFilterChange?.(newFilters);
        return newFilters;
      });
    },
    [onFilterChange]
  );

  const removeFilter = useCallback(
    (key: string) => {
      setFilters((prev) => {
        const { [key]: _, ...rest } = prev;
        onFilterChange?.(rest);
        return rest;
      });
    },
    [onFilterChange]
  );

  const clearFilters = useCallback(() => {
    setFilters({});
    onFilterChange?.({});
  }, [onFilterChange]);

  const hasActiveFilters = useMemo(() => {
    return Object.keys(filters).length > 0;
  }, [filters]);

  const activeFilterCount = useMemo(() => {
    return Object.keys(filters).length;
  }, [filters]);

  return {
    filters,
    setFilter,
    removeFilter,
    clearFilters,
    hasActiveFilters,
    activeFilterCount,
  };
}