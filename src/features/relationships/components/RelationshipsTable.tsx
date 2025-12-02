import { DataTable } from '@/components/organisms/DataTable';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { formatDate, formatCurrency } from '@/utils/formatters';
import { getRelationshipStatus } from '../types';
import type { Relationship } from '../types';
import type { TableColumn } from '@/types/table.types';

interface RelationshipsTableProps {
  relationships: Relationship[];
  loading?: boolean;
  onViewDetail?: (relationship: Relationship) => void;
  onFixPartial?: (relationship: Relationship) => void;
  onReverse?: (relationship: Relationship) => void;
}

export const RelationshipsTable = ({
  relationships,
  loading = false,
  onViewDetail,
  onFixPartial,
  onReverse,
}: RelationshipsTableProps) => {
  const columns: TableColumn<Relationship>[] = [
    {
      key: 'referrer_email',
      label: 'Referrer',
      sortable: true,
      render: (_value: unknown, relationship: Relationship) => (
        <span className="font-medium text-slate-900">{relationship.referrer_email}</span>
      ),
    },
    {
      key: 'referred_email',
      label: 'Referred User',
      sortable: true,
      render: (_value: unknown, relationship: Relationship) => (
        <span className="font-medium text-slate-900">{relationship.referred_email}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (_value: unknown, relationship: Relationship) => {
        const statusConfig = getRelationshipStatus(relationship);
        return (
          <Badge variant={statusConfig.variant}>
            <Icon name={statusConfig.icon} size="sm" />
            {statusConfig.label}
          </Badge>
        );
      },
    },
    {
      key: 'reward_for_referrer',
      label: 'Referrer Reward',
      align: 'right',
      render: (_value: unknown, relationship: Relationship) => (
        <div className="flex flex-col items-end gap-1">
          <span className="font-medium text-slate-900">
            {formatCurrency(relationship.reward_for_referrer)}
          </span>
          {relationship.referrer_reward_credited ? (
            <Badge variant="success" size="sm">
              <Icon name="CheckCircle" size="xs" />
              Credited
            </Badge>
          ) : (
            <Badge variant="warning" size="sm">
              <Icon name="Clock" size="xs" />
              Pending
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: 'reward_for_referred',
      label: 'Referred Reward',
      align: 'right',
      render: (_value: unknown, relationship: Relationship) => (
        <div className="flex flex-col items-end gap-1">
          <span className="font-medium text-slate-900">
            {formatCurrency(relationship.reward_for_referred)}
          </span>
          {relationship.referred_reward_credited ? (
            <Badge variant="success" size="sm">
              <Icon name="CheckCircle" size="xs" />
              Credited
            </Badge>
          ) : (
            <Badge variant="warning" size="sm">
              <Icon name="Clock" size="xs" />
              Pending
            </Badge>
          )}
        </div>
      ),
    },
    {
      key: 'created_at',
      label: 'Created',
      sortable: true,
      render: (_value: unknown, relationship: Relationship) => (
        <span className="text-sm text-slate-600">{formatDate(relationship.created_at)}</span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      align: 'center',
      render: (_value: unknown, relationship: Relationship) => (
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onViewDetail?.(relationship)}
          >
            <Icon name="Eye" size="sm" />
            View
          </Button>
          
          {/* ✅ Fixed: Use is_partially_completed flag instead of status comparison */}
          {relationship.is_partially_completed && (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onFixPartial?.(relationship)}
              className="text-emerald-600 hover:text-emerald-700"
            >
              <Icon name="Wrench" size="sm" /> {/* ✅ Changed from "Tool" */}
              Fix
            </Button>
          )}
          
          {relationship.status === 'completed' && (
            <Button
              variant="danger"
              size="sm"
              onClick={() => onReverse?.(relationship)}
            >
              <Icon name="RotateCcw" size="sm" />
              Reverse
            </Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <DataTable<Relationship> // ✅ Explicitly set generic type
      columns={columns}
      data={relationships}
      loading={loading}
      emptyMessage="No relationships found"
      rowKey="id"
    />
  );
};
