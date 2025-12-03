import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ListLayout } from '@/components/page-layouts/ListLayout';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Alert } from '@/components/molecules/Alert';
import { Input } from '@/components/atoms/Input';
import { Pagination } from '@/components/molecules/Pagination';
import { ResetLogsTable } from '@/features/balances/components';
import { useResetLogs } from '@/features/balances/hooks';
import type { ResetLogFilters } from '@/features/balances/types';
import { ResetType } from '../types/balance.types';

export const ResetLogsPage = () => {
  const { userId } = useParams<{ userId?: string }>();

  // State
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [filters, setFilters] = useState<ResetLogFilters>({
    ...(userId && { search: userId }), // Pre-filter by user if coming from detail page
  });

  // Hooks
  const { resetLogs, pagination, loading, error, refetch } = useResetLogs({
    filters,
    page,
    pageSize,
    autoFetch: true,
  });

  // Handlers
  const handleSearchChange = (search: string) => {
    setFilters({ ...filters, search });
    setPage(1);
  };

  const handleResetTypeFilter = (resetType: string) => {
    setFilters({
      ...filters,
      reset_type: resetType === '' ? '' : (resetType as ResetType),
    });
    setPage(1);
  };

  const handleResetFilters = () => {
    setFilters({});
    setPage(1);
  };

  const hasActiveFilters = Object.values(filters).some(
    (value) => value !== '' && value !== undefined && value !== null
  );

  return (
    <ListLayout
      title="Reset Logs"
      actions={
        <Button variant="secondary" onClick={refetch}>
          <Icon name="RefreshCw" size="sm" className="mr-2" />
          Refresh
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Filters */}
        <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="md:col-span-2">
              <Input
                placeholder="Search by user email or name..."
                value={filters.search || ''}
                onChange={(e) => handleSearchChange(e.target.value)}
                leftIcon={<Icon name="Search" size="sm" />}
              />
            </div>

            <select
              value={filters.reset_type || ''}
              onChange={(e) => handleResetTypeFilter(e.target.value)}
              className="rounded-lg border border-slate-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Types</option>
              <option value="daily_reset">Daily Reset</option>
              <option value="manual_adjustment">Manual Adjustment</option>
              <option value="bonus_added">Bonus Added</option>
              <option value="bonus_expired">Bonus Expired</option>
              <option value="admin_override">Admin Override</option>
            </select>
          </div>

          {hasActiveFilters && (
            <Button variant="secondary" size="sm" onClick={handleResetFilters}>
              <Icon name="X" size="sm" className="mr-2" />
              Reset Filters
            </Button>
          )}
        </div>

        {/* Error Alert */}
        {error && (
          <Alert variant="error" onClose={() => {}}>
            {error}
          </Alert>
        )}

        {/* Table */}
        <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
          <ResetLogsTable resetLogs={resetLogs} loading={loading} />
        </div>

        {/* Pagination */}
        {pagination && pagination.total_pages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={pagination.total_pages}
            onPageChange={setPage}
            pageSize={pageSize}
          />
        )}
      </div>
    </ListLayout>
  );
};
