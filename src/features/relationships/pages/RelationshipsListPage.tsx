import { useState } from 'react';
import { ListLayout } from '@components/page-layouts/ListLayout';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Alert } from '@/components/molecules/Alert';
import { Pagination } from '@/components/molecules/Pagination';
import {
  RelationshipsTable,
  RelationshipDetailModal,
  RelationshipFilters,
  FixPartialRewardDialog,
  ReverseReferralDialog,
} from '../components';
import { useRelationships, useRelationshipDetail } from '../hooks';
import type { Relationship, PartiallyCompletedRelationship } from '../types';

export const RelationshipsListPage = () => {
  const {
    relationships,
    loading,
    error,
    pagination,
    filters,
    updateFilters,
    changePage,
    refresh,
  } = useRelationships({ page: 1, page_size: 20, ordering: '-created_at' });

  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [fixDialogRelationship, setFixDialogRelationship] =
    useState<PartiallyCompletedRelationship | null>(null);
  const [reverseDialogRelationship, setReverseDialogRelationship] =
    useState<Relationship | null>(null);

  const { relationship: detailRelationship, loading: detailLoading } =
    useRelationshipDetail(selectedId);

  const handleSearch = (search: string) => {
    updateFilters({ search });
  };

  const handleViewDetail = (relationship: Relationship) => {
    setSelectedId(relationship.id);
  };

  const handleFixPartial = (relationship: Relationship) => {
    setFixDialogRelationship({
      id: relationship.id,
      referrer_email: relationship.referrer_email,
      referred_email: relationship.referred_email,
      status: relationship.status,
      referrer_reward_credited: relationship.referrer_reward_credited,
      referred_reward_credited: relationship.referred_reward_credited,
      failed_reason: null,
      created_at: relationship.created_at,
    });
  };

  const handleReverse = (relationship: Relationship) => {
    setReverseDialogRelationship(relationship);
  };

  const handleSuccess = () => {
    refresh();
  };

  const handleResetFilters = () => {
    updateFilters({
      status: undefined,
      code_type: undefined,
      referrer_reward_credited: undefined,
      referred_reward_credited: undefined,
      is_partially_completed: undefined,
    });
  };

  return (
    <>
      <ListLayout
        title="Referral Relationships"
        description="Manage and monitor all referral relationships between users"
        showSearch
        onSearch={handleSearch}
        searchPlaceholder="Search by email or code..."
        loading={loading}
        actions={
          <Button variant="secondary" onClick={refresh} disabled={loading}>
            <Icon name="RefreshCw" size="sm" />
            Refresh
          </Button>
        }
      >
        <div className="space-y-6">
          {error && (
            <Alert variant="error">
              <Icon name="AlertCircle" />
              {error}
            </Alert>
          )}

          <RelationshipFilters
            filters={filters}
            onFilterChange={updateFilters}
            onReset={handleResetFilters}
          />

          <RelationshipsTable
            relationships={relationships}
            loading={loading}
            onViewDetail={handleViewDetail}
            onFixPartial={handleFixPartial}
            onReverse={handleReverse}
          />

          {pagination && pagination.total_pages > 1 && (
            <Pagination
              currentPage={pagination.current_page}
              totalPages={pagination.total_pages}
              pageSize={pagination.page_size}
              onPageChange={changePage}
            />
          )}
        </div>
      </ListLayout>

      <RelationshipDetailModal
        isOpen={!!selectedId}
        onClose={() => setSelectedId(undefined)}
        relationship={detailRelationship}
        loading={detailLoading}
      />

      <FixPartialRewardDialog
        isOpen={!!fixDialogRelationship}
        onClose={() => setFixDialogRelationship(null)}
        relationship={fixDialogRelationship}
        onSuccess={handleSuccess}
      />

      <ReverseReferralDialog
        isOpen={!!reverseDialogRelationship}
        onClose={() => setReverseDialogRelationship(null)}
        relationship={reverseDialogRelationship}
        onSuccess={handleSuccess}
      />
    </>
  );
};
