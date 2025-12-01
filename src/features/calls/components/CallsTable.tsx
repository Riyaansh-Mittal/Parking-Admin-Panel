import { DataTable } from '@/components/organisms/DataTable';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Checkbox } from '@/components/atoms/Checkbox';
import { formatDateTime, formatDuration } from '@/utils/formatters';
import { CALL_STATE_CONFIG, DEDUCTION_STATUS_CONFIG } from '../types/call.types';
import type { CallListItem, CallState, DeductionStatus } from '../types';
import type { TableColumn } from '@/types/table.types';

interface CallsTableProps {
  calls: CallListItem[];
  loading: boolean;
  selectable?: boolean;
  selectedIds?: string[];
  onSelect?: (callId: string, selected: boolean) => void;
  onSelectAll?: (callIds: string[]) => void;
  onViewDetail?: (callId: string) => void;
}

export const CallsTable = ({
  calls,
  loading,
  selectable = false,
  selectedIds = [],
  onSelect,
  onSelectAll,
  onViewDetail,
}: CallsTableProps) => {
  const allSelected = calls.length > 0 && selectedIds.length === calls.length;
  const someSelected = selectedIds.length > 0 && !allSelected;

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      onSelectAll?.(calls.map((c) => c.call_id));
    } else {
      onSelectAll?.([]);
    }
  };

  const columns: TableColumn<CallListItem>[] = [
    ...(selectable
      ? [
          {
            key: 'select',
            label: '',
            width: '48px',
            headerRender: () => (
              <Checkbox
                checked={allSelected}
                onChange={handleSelectAll}
                className={someSelected ? 'opacity-50' : ''}
              />
            ),
            render: (_value: unknown, call: CallListItem) => (
              <Checkbox
                checked={selectedIds.includes(call.call_id)}
                onChange={(e) => onSelect?.(call.call_id, e.target.checked)}
              />
            ),
          } as TableColumn<CallListItem>,
        ]
      : []),
    {
      key: 'call_id',
      label: 'Call ID',
      sortable: true,
      render: (_value, call) => (
        <span className="font-mono text-xs text-slate-600">
          {call.call_id.substring(0, 12)}...
        </span>
      ),
    },
    {
      key: 'inviter',
      label: 'Inviter',
      sortable: true,
      render: (_value, call) => (
        <div className="flex flex-col">
          <span className="font-medium text-slate-900">{call.inviter.full_name}</span>
          <span className="text-xs text-slate-500">{call.inviter.email}</span>
        </div>
      ),
    },
    {
      key: 'invitee',
      label: 'Invitee',
      sortable: true,
      render: (_value, call) => (
        <div className="flex flex-col">
          <span className="font-medium text-slate-900">{call.invitee.full_name}</span>
          <span className="text-xs text-slate-500">{call.invitee.email}</span>
        </div>
      ),
    },
    {
      key: 'call_type',
      label: 'Type',
      sortable: true,
      render: (_value, call) => (
        <Badge variant={call.call_type === 'video' ? 'info' : 'info'}>
          <Icon name={call.call_type === 'video' ? 'Video' : 'Phone'} size="sm" />
          {call.call_type === 'video' ? 'Video' : 'Audio'}
        </Badge>
      ),
    },
    {
      key: 'state',
      label: 'State',
      sortable: true,
      render: (_value, call) => {
        const config = CALL_STATE_CONFIG[call.state as CallState];
        return (
          <Badge variant={config.variant}>
            <Icon name={config.icon} size="sm" />
            {config.label}
          </Badge>
        );
      },
    },
    {
      key: 'duration',
      label: 'Duration',
      sortable: true,
      render: (_value, call) => (
        <span className="text-sm text-slate-600">
          {call.duration > 0 ? formatDuration(call.duration) : '-'}
        </span>
      ),
    },
    {
      key: 'call_cost',
      label: 'Cost',
      sortable: true,
      render: (_value, call) => (
        <span className="font-medium text-slate-900">{call.call_cost}</span>
      ),
    },
    {
      key: 'deduction_status',
      label: 'Deduction',
      sortable: true,
      render: (_value, call) => {
        const config = DEDUCTION_STATUS_CONFIG[call.deduction_status as DeductionStatus];
        return <Badge variant={config.variant}>{config.label}</Badge>;
      },
    },
    {
      key: 'initiated_at',
      label: 'Initiated',
      sortable: true,
      render: (_value, call) => (
        <span className="text-sm text-slate-600">{formatDateTime(call.initiated_at)}</span>
      ),
    },
    {
      key: 'actions',
      label: '',
      width: '80px',
      render: (_value, call) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewDetail?.(call.call_id)}
          leftIcon={<Icon name="Eye" size="sm" />}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <DataTable
      data={calls as unknown as Record<string, unknown>[]}
      columns={columns as unknown as TableColumn<Record<string, unknown>>[]}
      loading={loading}
      emptyMessage="No calls found"
      rowKey="call_id"
    />
  );
};
