import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ListLayout } from '@/components/page-layouts/ListLayout';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Alert } from '@/components/molecules/Alert';
import {
  BalanceTable,
  BalanceFilters,
  UpdateBalanceDialog,
  BulkUpdateDialog,
  BalanceStatsCard,
} from '@/features/balances/components';
import {
  useBalances,
  useUpdateBalance,
  useBulkUpdateBalance,
} from '@/features/balances/hooks';
import type {
  Balance,
  BalanceFilters as Filters,
  UpdateBalanceRequest,
  BulkUpdateBalanceRequest
} from '@/features/balances/types';

export const BalancesListPage = () => {
  const navigate = useNavigate();

  // State
  const [filters, setFilters] = useState<Filters>({});
  const [selectedBalance, setSelectedBalance] = useState<Balance | null>(null);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showBulkDialog, setShowBulkDialog] = useState(false);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  // Hooks
  const { balances, loading, error, refetch } = useBalances({
    filters,
    autoFetch: true,
  });

  const {
    updateUserBalance,
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = useUpdateBalance();

  const {
    bulkUpdate,
    loading: bulkLoading,
    error: bulkError,
    success: bulkSuccess,
  } = useBulkUpdateBalance();

  // Handlers
  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({});
  };

  const handleViewDetail = (balance: Balance) => {
    navigate(`/balances/${balance.user_id}`);
  };

  const handleUpdateBalance = (balance: Balance) => {
    setSelectedBalance(balance);
    setShowUpdateDialog(true);
  };

  const handleUpdateSubmit = async (data: UpdateBalanceRequest) => {
    if (!selectedBalance) return;

    try {
      await updateUserBalance(selectedBalance.user_id, data);
      setShowUpdateDialog(false);
      setSelectedBalance(null);
      refetch();
    } catch {
      // Error handled by hook
    }
  };

  const handleBulkUpdateSubmit = async (data: BulkUpdateBalanceRequest) => {
    try {
      await bulkUpdate(data);
      setShowBulkDialog(false);
      setSelectedUserIds([]);
      refetch();
    } catch {
      // Error handled by hook
    }
  };

  const handleOpenBulkUpdate = () => {
    if (selectedUserIds.length === 0) {
      alert('Please select at least one user');
      return;
    }
    setShowBulkDialog(true);
  };

  return (
    <ListLayout
      title="User Balances"
      actions={
        <div className="flex gap-2">
          {selectedUserIds.length > 0 && (
            <Button variant="primary" onClick={handleOpenBulkUpdate}>
              <Icon name="Edit" size="sm" className="mr-2" />
              Bulk Update ({selectedUserIds.length})
            </Button>
          )}
          <Button variant="secondary" onClick={refetch}>
            <Icon name="RefreshCw" size="sm" className="mr-2" />
            Refresh
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Stats */}
        <BalanceStatsCard />

        {/* Filters */}
        <BalanceFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />

        {/* Error Alert */}
        {error && (
          <Alert variant="error" onClose={() => {}}>
            {error}
          </Alert>
        )}

        {/* Success Alerts */}
        {updateSuccess && (
          <Alert variant="success" onClose={() => {}}>
            Balance updated successfully!
          </Alert>
        )}

        {bulkSuccess && (
          <Alert variant="success" onClose={() => {}}>
            Bulk update completed successfully!
          </Alert>
        )}

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200">
          <BalanceTable
            balances={balances}
            loading={loading}
            onUpdate={handleUpdateBalance}
            onViewDetail={handleViewDetail}
          />
        </div>
      </div>

      {/* Update Balance Dialog */}
      <UpdateBalanceDialog
        isOpen={showUpdateDialog}
        balance={selectedBalance}
        onClose={() => {
          setShowUpdateDialog(false);
          setSelectedBalance(null);
        }}
        onUpdate={handleUpdateSubmit}
        loading={updateLoading}
        error={updateError}
      />

      {/* Bulk Update Dialog */}
      <BulkUpdateDialog
        isOpen={showBulkDialog}
        selectedUserIds={selectedUserIds}
        onClose={() => {
          setShowBulkDialog(false);
        }}
        onBulkUpdate={handleBulkUpdateSubmit}
        loading={bulkLoading}
        error={bulkError}
      />
    </ListLayout>
  );
};