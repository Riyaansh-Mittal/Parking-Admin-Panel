import { useState, useCallback } from 'react';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { ListLayout } from '@/components/page-layouts/ListLayout';
import { Pagination } from '@/components/molecules/Pagination';
import {
  CodeStatsCard,
  CodeFilters,
  CodesTable,
  CodeDetailModal,
  CreateStandaloneCodeDialog,
  BulkDeactivateDialog,
  BulkExtendValidityDialog,
  BulkIncreaseUsageDialog,
} from '../components';
import { useCodes, useCodeDetail } from '../hooks';
import type { ReferralCode, CodeFilters as CodeFiltersType } from '../types';
import type { SortDirection } from '@/types/common.types';

export const CodesListPage = () => {
  const [filters, setFilters] = useState<CodeFiltersType>({});
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [sortConfig, setSortConfig] = useState<{ field: string; direction: SortDirection }>({
    field: 'created_at',
    direction: 'desc',
  });
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectedCode, setSelectedCode] = useState<ReferralCode | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isBulkDeactivateOpen, setIsBulkDeactivateOpen] = useState(false);
  const [isBulkExtendOpen, setIsBulkExtendOpen] = useState(false);
  const [isBulkIncreaseOpen, setIsBulkIncreaseOpen] = useState(false);

  const { codes, stats, loading, pagination, refetch } = useCodes({
    filters,
    page,
    page_size: pageSize,
    ordering: sortConfig.direction === 'desc' ? `-${sortConfig.field}` : sortConfig.field,
  });

  const { fetchDetail } = useCodeDetail();

  const handleFilterChange = (newFilters: CodeFiltersType) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleClearFilters = () => {
    setFilters({});
    setPage(1);
  };

  const handleSort = (field: string) => {
    setSortConfig((prev) => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleViewDetail = useCallback(
    async (code: ReferralCode) => {
      const result = await fetchDetail(code.id);
      if (result.success && result.data) {
        setSelectedCode(result.data);
        setIsDetailModalOpen(true);
      }
    },
    [fetchDetail]
  );

  const handleBulkActionSuccess = () => {
    setSelectedRows([]);
    refetch();
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedCode(null);
  };

  return (
    <>
      <ListLayout
        title="Referral Codes"
        description="Manage and monitor all referral codes across campaigns"
        actions={
          <>
            {selectedRows.length > 0 && (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsBulkExtendOpen(true)}
                  leftIcon={<Icon name="Clock" size="sm" />}
                >
                  Extend Validity
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setIsBulkIncreaseOpen(true)}
                  leftIcon={<Icon name="Plus" size="sm" />}
                >
                  Increase Usage
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => setIsBulkDeactivateOpen(true)}
                  leftIcon={<Icon name="Ban" size="sm" />}
                >
                  Deactivate ({selectedRows.length})
                </Button>
              </>
            )}
            <Button
              variant="primary"
              onClick={() => setIsCreateDialogOpen(true)}
              leftIcon={<Icon name="Plus" size="sm" />}
            >
              Create Code
            </Button>
          </>
        }
      >
        <div className="space-y-6">
          {/* Stats */}
          <CodeStatsCard stats={stats} loading={loading && !codes.length} />

          {/* Filters */}
          <CodeFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onClear={handleClearFilters}
          />

          {/* Table */}
          <CodesTable
            codes={codes}
            loading={loading}
            selectedRows={selectedRows}
            onRowSelect={setSelectedRows}
            onViewDetail={handleViewDetail}
            sortConfig={sortConfig}
            onSort={handleSort}
          />

          {/* Pagination */}
          {pagination && pagination.total_pages > 1 && (
            <div className="flex justify-center">
              <Pagination
                currentPage={page}
                totalPages={pagination.total_pages}
                onPageChange={setPage}
                pageSize={pageSize}
              />
            </div>
          )}
        </div>
      </ListLayout>

      {/* Modals */}
      <CodeDetailModal
        code={selectedCode}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
      />

      <CreateStandaloneCodeDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSuccess={refetch}
      />

      <BulkDeactivateDialog
        isOpen={isBulkDeactivateOpen}
        onClose={() => setIsBulkDeactivateOpen(false)}
        selectedCodeIds={selectedRows}
        onSuccess={handleBulkActionSuccess}
      />

      <BulkExtendValidityDialog
        isOpen={isBulkExtendOpen}
        onClose={() => setIsBulkExtendOpen(false)}
        selectedCodeIds={selectedRows}
        onSuccess={handleBulkActionSuccess}
      />

      <BulkIncreaseUsageDialog
        isOpen={isBulkIncreaseOpen}
        onClose={() => setIsBulkIncreaseOpen(false)}
        selectedCodeIds={selectedRows}
        onSuccess={handleBulkActionSuccess}
      />
    </>
  );
};

CodesListPage.displayName = 'CodesListPage';
