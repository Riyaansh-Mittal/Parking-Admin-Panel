import { DataTable } from '@/components/organisms/DataTable';
import { Badge } from '@/components/atoms/Badge';
import { Icon } from '@/components/atoms/Icon';
import { formatCurrency } from '@/utils/formatters';
import type { ResetLog } from '@/features/balances/types';
import type { TableColumn } from '@/types/table.types';
import { getResetTypeConfig } from '@/features/balances/types';

interface ResetLogsTableProps {
  resetLogs: ResetLog[];
  loading?: boolean;
}

export const ResetLogsTable = ({
  resetLogs,
  loading = false,
}: ResetLogsTableProps) => {
  const columns: TableColumn<ResetLog>[] = [
    {
      key: 'timestamp',
      label: 'Date',
      sortable: true,
      render: (_value: unknown, log: ResetLog) => (
        <div className="text-sm font-medium text-slate-900">
          {new Date(log.timestamp).toLocaleDateString()}
          <div className="text-xs text-slate-500">
            {new Date(log.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        </div>
      ),
    },
    {
      key: 'reset_type',
      label: 'Type',
      sortable: true,
      render: (_value: unknown, log: ResetLog) => {
        const config = getResetTypeConfig(log.reset_type);
        return (
          <Badge variant={config.variant} size="sm">
            <Icon name={config.icon} size="xs" className="mr-1" />
            {config.label}
          </Badge>
        );
      },
    },
    {
      key: 'change_amount',
      label: 'Change',
      sortable: true,
      align: 'right',
      render: (_value: unknown, log: ResetLog) => {
        const changeAmount = parseFloat(log.change_amount);
        const isPositive = changeAmount >= 0;
        
        return (
          <div className="text-right space-y-1">
            <div className={`text-lg font-bold ${
              isPositive ? 'text-emerald-600' : 'text-rose-600'
            }`}>
              {isPositive ? '+' : ''}{formatCurrency(changeAmount)}
            </div>
            <div className="text-xs text-slate-500">
              {formatCurrency(parseFloat(log.old_base_balance))} → {formatCurrency(parseFloat(log.new_base_balance))}
            </div>
          </div>
        );
      },
    },
    {
      key: 'notes',
      label: 'Notes',
      render: (_value: unknown, log: ResetLog) => (
        <span className="text-sm text-slate-600">
          {log.notes || '-'}
        </span>
      ),
    },
    {
      key: 'performed_by',
      label: 'Performed By',
      render: (_value: unknown, log: ResetLog) => (
        <span className="text-sm font-medium text-slate-900">
          {log.performed_by || 'System'}
        </span>
      ),
    },
    {
      key: 'user',
      label: 'User',
      render: (_value: unknown, log: ResetLog) => (
        <div>
          <p className="text-sm font-medium text-slate-900">{log.user.user_email}</p>
          <p className="text-xs text-slate-500">{log.user.user_name}</p>
        </div>
      ),
    },
  ];

  return (
    <DataTable<ResetLog>
      columns={columns}
      data={resetLogs}
      loading={loading}
      emptyMessage="No reset logs found"
      rowKey="id"
    />
  );
};
