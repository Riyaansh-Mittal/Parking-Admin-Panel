import { useState, useCallback, useMemo } from 'react';

export interface UsePaginationOptions {
  totalItems?: number;
  itemsPerPage?: number;
  initialPage?: number;
  initialPageSize?: number;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
}

export interface UsePaginationReturn {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  canGoNext: boolean;
  canGoPrevious: boolean;
  goToPage: (page: number) => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToFirstPage: () => void;
  goToLastPage: () => void;
  setPageSize: (size: number) => void;
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (size: number) => void;
}

export function usePagination({
  totalItems = 0,
  itemsPerPage = 20,
  initialPage = 1,
  initialPageSize,
  onPageChange,
  onPageSizeChange,
}: UsePaginationOptions): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSizeState] = useState(initialPageSize || itemsPerPage);

  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / pageSize) || 1;
  }, [totalItems, pageSize]);

  const canGoNext = currentPage < totalPages;
  const canGoPrevious = currentPage > 1;

  const goToPage = useCallback(
    (page: number) => {
      const validPage = Math.max(1, Math.min(page, totalPages));
      setCurrentPage(validPage);
      onPageChange?.(validPage);
    },
    [totalPages, onPageChange]
  );

  const goToNextPage = useCallback(() => {
    if (canGoNext) {
      goToPage(currentPage + 1);
    }
  }, [canGoNext, currentPage, goToPage]);

  const goToPreviousPage = useCallback(() => {
    if (canGoPrevious) {
      goToPage(currentPage - 1);
    }
  }, [canGoPrevious, currentPage, goToPage]);

  const goToFirstPage = useCallback(() => {
    goToPage(1);
  }, [goToPage]);

  const goToLastPage = useCallback(() => {
    goToPage(totalPages);
  }, [goToPage, totalPages]);

  const setPageSize = useCallback(
    (size: number) => {
      setPageSizeState(size);
      setCurrentPage(1); // Reset to first page when changing page size
      onPageChange?.(1);
      onPageSizeChange?.(size);
    },
    [onPageChange, onPageSizeChange]
  );

  // Aliases for backward compatibility
  const handlePageChange = goToPage;
  const handlePageSizeChange = setPageSize;

  return {
    currentPage,
    totalPages,
    pageSize,
    canGoNext,
    canGoPrevious,
    goToPage,
    goToNextPage,
    goToPreviousPage,
    goToFirstPage,
    goToLastPage,
    setPageSize,
    handlePageChange,
    handlePageSizeChange,
  };
}
