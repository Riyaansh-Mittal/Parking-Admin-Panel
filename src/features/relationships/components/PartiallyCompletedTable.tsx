import { DataTable } from '@/components/organisms/DataTable';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { formatDate } from '@/utils/formatters';
import type { PartiallyCompletedRelationship } from '../types';
import type { TableColumn } from '@/types/table.types';

interface PartiallyCompletedTableProps {
  relationships: PartiallyCompletedRelationship[];
  loading?: boolean;
  onFix?: (relationship: PartiallyCompletedRelationship) => void;
}

export const PartiallyCompletedTable = ({
  relationships,
  loading = false,
  onFix,
}: PartiallyCompletedTableProps) => {
  const columns: TableColumn<PartiallyCompletedRelationship>[] = [
    {
      key: 'referrer_email',
      label: 'Referrer',
      sortable: true,
      render: (_value: unknown, rel: PartiallyCompletedRelationship) => (
        <span className="font-medium text-slate-900">{rel.referrer_email}</span>
      ),
    },
    {
      key: 'referred_email',
      label: 'Referred User',
      sortable: true,
      render: (_value: unknown, rel: PartiallyCompletedRelationship) => (
        <span className="font-medium text-slate-900">{rel.referred_email}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (_value: unknown, rel: PartiallyCompletedRelationship) => (
        <Badge variant="warning">
          <Icon name="AlertTriangle" size="sm" />
          {rel.status}
        </Badge>
      ),
    },
    {
      key: 'reward_status',
      label: 'Reward Status',
      render: (_value: unknown, rel: PartiallyCompletedRelationship) => (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-xs text-slate-600">Referrer:</span>
            {rel.referrer_reward_credited ? (
              <Icon name="CheckCircle" size="sm" className="text-emerald-600" />
            ) : (
              <Icon name="XCircle" size="sm" className="text-rose-600" />
            )}
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-slate-600">Referred:</span>
            {rel.referred_reward_credited ? (
              <Icon name="CheckCircle" size="sm" className="text-emerald-600" />
            ) : (
              <Icon name="XCircle" size="sm" className="text-rose-600" />
            )}
          </div>
        </div>
      ),
    },
    {
      key: 'failed_reason',
      label: 'Failure Reason',
      render: (_value: unknown, rel: PartiallyCompletedRelationship) => (
        <span className="text-sm text-rose-600">
          {rel.failed_reason || 'Unknown'}
        </span>
      ),
    },
    {
      key: 'created_at',
      label: 'Created',
      sortable: true,
      render: (_value: unknown, rel: PartiallyCompletedRelationship) => (
        <span className="text-sm text-slate-600">{formatDate(rel.created_at)}</span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      align: 'center',
      render: (_value: unknown, rel: PartiallyCompletedRelationship) => (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onFix?.(rel)}
          className="text-emerald-600 hover:text-emerald-700 border-emerald-300"
        >
          <Icon name="Wrench" size="sm" /> {/* ✅ Changed from "Tool" */}
          Fix Reward
        </Button>
      ),
    },
  ];

  return (
    <DataTable<PartiallyCompletedRelationship> // ✅ Explicitly set generic type
      columns={columns}
      data={relationships}
      loading={loading}
      emptyMessage="No partially completed relationships found"
      rowKey="id"
    />
  );
};
