import { Button } from '@components/atoms/Button';
import { Icon } from '@components/atoms/Icon';
import { Dropdown } from '@components/molecules/Dropdown';
import { cn } from '@utils';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize?: number;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  showPageSizeSelector?: boolean;
  className?: string;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize = 20,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
  showPageSizeSelector = true,
  className,
}: PaginationProps) => {
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const handlePrevious = () => {
    if (canGoPrevious) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (canGoNext) {
      onPageChange(currentPage + 1);
    }
  };

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push('...');
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('...');
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4',
        className
      )}
    >
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={handlePrevious}
          disabled={!canGoPrevious}
          leftIcon={<Icon name="ChevronLeft" size="sm" />}
          aria-label="Previous page"
        >
          Previous
        </Button>

        <div className="flex items-center gap-1">
          {pageNumbers.map((page, index) =>
            typeof page === 'number' ? (
              <button
                key={`page-${page}`}
                onClick={() => onPageChange(page)}
                className={cn(
                  'flex h-9 min-w-[36px] items-center justify-center rounded-lg px-3 text-sm font-medium transition-colors',
                  page === currentPage
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-700 hover:bg-slate-100'
                )}
                aria-label={`Go to page ${page}`}
                aria-current={page === currentPage ? 'page' : undefined}
              >
                {page}
              </button>
            ) : (
              <span
                key={`ellipsis-${index}`}
                className="flex h-9 min-w-[36px] items-center justify-center text-slate-400"
              >
                {page}
              </span>
            )
          )}
        </div>

        <Button
          variant="secondary"
          size="sm"
          onClick={handleNext}
          disabled={!canGoNext}
          rightIcon={<Icon name="ChevronRight" size="sm" />}
          aria-label="Next page"
        >
          Next
        </Button>
      </div>

      {showPageSizeSelector && onPageSizeChange && (
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-600">Show</span>
          <Dropdown
            options={pageSizeOptions.map((size) => ({
              label: String(size),
              value: size,
            }))}
            value={pageSize}
            onChange={(value) => onPageSizeChange(Number(value))}
            className="w-20"
          />
          <span className="text-sm text-slate-600">per page</span>
        </div>
      )}
    </div>
  );
};

Pagination.displayName = 'Pagination';
