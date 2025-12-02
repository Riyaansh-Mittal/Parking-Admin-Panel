import { useMemo } from 'react';
import { DataTable } from '@/components/organisms/DataTable';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { formatDateTime, formatNumber, formatPercentage } from '@/utils/formatters';
import type { ReferralCode } from '../types';
import type { TableColumn } from '@/types/table.types';
import type { SortDirection } from '@/types/common.types';

interface CodesTableProps {
  codes: ReferralCode[];
  loading?: boolean;
  selectedRows: string[];
  onRowSelect: (selectedIds: string[]) => void;
  onViewDetail: (code: ReferralCode) => void;
  sortConfig?: { field: string; direction: SortDirection };
  onSort?: (field: string) => void;
}

const getStatusBadgeVariant = (status: string): 'success' | 'neutral' | 'warning' | 'error' => {
  switch (status) {
    case 'active':
      return 'success';
    case 'inactive':
      return 'neutral';
    case 'expired':
      return 'warning';
    case 'exhausted':
      return 'error';
    default:
      return 'neutral';
  }
};

const getCodeTypeBadgeVariant = (type: string): 'info' | 'neutral' => {
  return type === 'campaign' ? 'info' : 'neutral';
};

export const CodesTable = ({
  codes,
  loading,
  selectedRows,
  onRowSelect,
  onViewDetail,
  sortConfig,
  onSort,
}: CodesTableProps) => {
  const columns: TableColumn<ReferralCode>[] = useMemo(
    () => [
      {
        key: 'code',
        label: 'Code',
        sortable: true,
        render: (_value: unknown, row: ReferralCode) => (
          <div className="flex items-center gap-2">
            <span className="font-mono font-semibold text-slate-900">{row.code}</span>
            {!row.is_valid && (
              <Icon name="AlertCircle" size="sm" className="text-amber-600" />
            )}
          </div>
        ),
      },
      {
        key: 'code_type',
        label: 'Type',
        sortable: true,
        render: (_value: unknown, row: ReferralCode) => (
          <Badge variant={getCodeTypeBadgeVariant(row.code_type)}>
            {row.code_type === 'campaign' ? 'Campaign' : 'User'}
          </Badge>
        ),
      },
      {
        key: 'status',
        label: 'Status',
        sortable: true,
        render: (_value: unknown, row: ReferralCode) => (
          <Badge variant={getStatusBadgeVariant(row.status)}>
            {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
          </Badge>
        ),
      },
      {
        key: 'campaign_name',
        label: 'Campaign',
        render: (_value: unknown, row: ReferralCode) => (
          <span className="text-sm text-slate-900">
            {row.campaign_name || <span className="text-slate-400">—</span>}
          </span>
        ),
      },
      {
        key: 'owner_email',
        label: 'Owner',
        render: (_value: unknown, row: ReferralCode) => (
          <span className="text-sm text-slate-600">
            {row.owner_email || <span className="text-slate-400">—</span>}
          </span>
        ),
      },
      {
        key: 'usage_count',
        label: 'Usage',
        sortable: true,
        render: (_value: unknown, row: ReferralCode) => (
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-900">
                {formatNumber(row.usage_count)} / {formatNumber(row.max_usage)}
              </span>
              <span className="text-xs text-slate-500">
                ({formatPercentage(row.usage_percentage)})
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full bg-indigo-500 transition-all"
                style={{ width: `${Math.min(row.usage_percentage, 100)}%` }}
              />
            </div>
          </div>
        ),
      },
      {
        key: 'valid_until',
        label: 'Valid Until',
        sortable: true,
        render: (_value: unknown, row: ReferralCode) => (
          <div className="space-y-0.5">
            <span className="text-sm text-slate-900">
              {row.valid_until ? (
                formatDateTime(row.valid_until)
              ) : (
                <span className="text-slate-400">No expiry</span>
              )}
            </span>
            {row.days_until_expiry !== null && row.days_until_expiry > 0 && (
              <p className="text-xs text-slate-500">
                {row.days_until_expiry} {row.days_until_expiry === 1 ? 'day' : 'days'} left
              </p>
            )}
          </div>
        ),
      },
      {
        key: 'created_at',
        label: 'Created',
        sortable: true,
        render: (_value: unknown, row: ReferralCode) => (
          <span className="text-sm text-slate-600">{formatDateTime(row.created_at)}</span>
        ),
      },
      {
        key: 'actions',
        label: '',
        render: (_value: unknown, row: ReferralCode) => (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewDetail(row)}
            leftIcon={<Icon name="Eye" size="sm" />}
          >
            View
          </Button>
        ),
      },
    ],
    [onViewDetail]
  );

  return (
    <DataTable<ReferralCode>
      columns={columns}
      data={codes}
      loading={loading}
      selectable
      selectedRows={selectedRows}
      onRowSelect={onRowSelect}
      sortConfig={sortConfig}
      onSort={onSort}
      emptyMessage="No codes found. Try adjusting your filters or create a new code."
      rowKey="id"
    />
  );
};

CodesTable.displayName = 'CodesTable';
