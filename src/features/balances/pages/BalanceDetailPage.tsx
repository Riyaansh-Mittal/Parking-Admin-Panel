import { useParams, useNavigate } from 'react-router-dom';
import { DetailLayout } from '@/components/page-layouts/DetailLayout';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Alert } from '@/components/molecules/Alert';
import {
  BalanceDetailCard,
  UpdateBalanceDialog,
} from '@/features/balances/components';
import { useBalanceDetail, useUpdateBalance } from '@/features/balances/hooks';
import { useState } from 'react';
import { UpdateBalanceRequest } from '../types';

export const BalanceDetailPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  // State
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);

  // Hooks
  const { balance, recentChanges, loading, error, refetch } = useBalanceDetail({
    userId: userId || null,
    autoFetch: true,
  });

  const {
    updateUserBalance,
    loading: updateLoading,
    error: updateError,
    success: updateSuccess,
  } = useUpdateBalance();

  // Handlers
  const handleUpdateBalance = () => {
    setShowUpdateDialog(true);
  };

  const handleUpdateSubmit = async (data: UpdateBalanceRequest) => {
    if (!userId) return;

    try {
      await updateUserBalance(userId, data);
      setShowUpdateDialog(false);
      refetch();
    } catch {
      // Error handled by hook
    }
  };

  const handleViewHistory = () => {
    navigate(`/balances/${userId}/history`);
  };

  if (loading) {
    return (
      <DetailLayout
        title="Loading..."
        breadcrumbs={[
          { label: 'Balances', href: '/balances' },
          { label: 'Loading...' },
        ]}
      >
        <div className="animate-pulse space-y-4">
          <div className="h-64 rounded-lg bg-slate-200"></div>
        </div>
      </DetailLayout>
    );
  }

  if (error || !balance) {
    return (
      <DetailLayout
        title="Error"
        breadcrumbs={[
          { label: 'Balances', href: '/balances' },
          { label: 'Error' },
        ]}
      >
        <Alert variant="error">{error || 'Balance not found'}</Alert>
      </DetailLayout>
    );
  }

  return (
    <DetailLayout
      title={balance.user_name}
      breadcrumbs={[
        { label: 'Balances', href: '/balances' },
        { label: balance.user_name },
      ]}
      actions={
        <div className="flex gap-2">
          <Button variant="secondary" onClick={handleViewHistory}>
            <Icon name="History" size="sm" className="mr-2" />
            View History
          </Button>
          <Button variant="primary" onClick={handleUpdateBalance}>
            <Icon name="Edit" size="sm" className="mr-2" />
            Adjust Balance
          </Button>
          <Button variant="secondary" onClick={refetch}>
            <Icon name="RefreshCw" size="sm" />
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Success Alert */}
        {updateSuccess && (
          <Alert variant="success" onClose={() => {}}>
            Balance updated successfully!
          </Alert>
        )}

        {/* Balance Detail */}
        <BalanceDetailCard
          balance={balance}
          recentChanges={recentChanges}
          loading={false}
        />
      </div>

      {/* Update Balance Dialog */}
      <UpdateBalanceDialog
        isOpen={showUpdateDialog}
        balance={balance}
        onClose={() => setShowUpdateDialog(false)}
        onUpdate={handleUpdateSubmit}
        loading={updateLoading}
        error={updateError}
      />
    </DetailLayout>
  );
};
