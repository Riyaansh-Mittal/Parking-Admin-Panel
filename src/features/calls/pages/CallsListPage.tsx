import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListLayout } from '@/components/page-layouts/ListLayout';
import { CallsTable } from '../components/CallsTable';
import { CallFilters } from '../components/CallFilters';
import { BulkCallActions } from '../components/BulkCallActions';
import { CallStatsCards } from '../components/CallStatsCards';
import { Pagination } from '@/components/molecules/Pagination';
import { SearchBar } from '@/components/molecules/SearchBar';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Alert } from '@/components/molecules/Alert';
import { useCalls } from '../hooks/useCalls';
import { useCallStats } from '../hooks/useCallStats';
import { useBulkCallActions } from '../hooks/useBulkCallActions';
import { useDebounce } from '@/hooks/useDebounce';
import type { CallSummaryStats } from '../types';

export const CallsListPage = () => {
  const navigate = useNavigate();
  const { calls, pagination, filters, loading, error, applyFilters, resetFilters, refreshCalls } =
    useCalls();
  const { stats, loading: statsLoading } = useCallStats();
  const bulkActions = useBulkCallActions(refreshCalls);

  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Apply search filter
  useEffect(() => {
    if (debouncedSearch !== undefined) {
      applyFilters({ search: debouncedSearch || undefined });
    }
  }, [debouncedSearch, applyFilters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handlePageChange = (page: number) => {
    applyFilters({ page });
  };

  const handlePageSizeChange = (pageSize: number) => {
    applyFilters({ page_size: pageSize, page: 1 });
  };

  const handleViewDetail = (callId: string) => {
    navigate(`/calls/${callId}`);
  };

  const handleSelectCall = (callId: string, selected: boolean) => {
    if (selected) {
      bulkActions.selectCall(callId);
    } else {
      bulkActions.deselectCall(callId);
    }
  };

  return (
    <ListLayout
      title="Call Records"
      description="View and manage all call records"
      actions={
        <Button
          variant="secondary"
          onClick={() => navigate('/calls/stats')}
          leftIcon={<Icon name="BarChart2" size="sm" />}
        >
          View Analytics
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <CallStatsCards stats={stats as CallSummaryStats | null} loading={statsLoading} />

        {/* Error Alert */}
        {error && <Alert variant="error">{error}</Alert>}

        {/* Bulk Actions */}
        <BulkCallActions
          selectedCount={bulkActions.selectedCallIds.length}
          loading={bulkActions.loading}
          error={bulkActions.error}
          success={bulkActions.success}
          onDelete={bulkActions.deleteSelected}
          onUpdateStatus={bulkActions.updateStatusSelected}
          onClearSelection={bulkActions.clearSelection}
          onClearMessages={bulkActions.clearMessages}
        />

        {/* Filters and Search */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search by call ID, email, or user ID..."
              fullWidth={false}
            />
          </div>
          <CallFilters filters={filters} onFiltersChange={applyFilters} onReset={resetFilters} />
        </div>

        {/* Calls Table */}
        <CallsTable
          calls={calls}
          loading={loading}
          selectable
          selectedIds={bulkActions.selectedCallIds}
          onSelect={handleSelectCall}
          onSelectAll={bulkActions.selectAllCalls}
          onViewDetail={handleViewDetail}
        />

        {/* Pagination */}
        {pagination && pagination.totalPages > 0 && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            pageSize={pagination.pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        )}
      </div>
    </ListLayout>
  );
};
