import { DataTable } from '@/components/organisms/DataTable';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { formatCurrency } from '@/utils/formatters';
import type { Balance } from '@/features/balances/types';
import type { TableColumn } from '@/types/table.types';

interface BalanceTableProps {
  balances: Balance[];
  loading?: boolean;
  onUpdate: (balance: Balance) => void;
  onViewDetail: (balance: Balance) => void;
}

export const BalanceTable = ({
  balances,
  loading = false,
  onUpdate,
  onViewDetail,
}: BalanceTableProps) => {
  const columns: TableColumn<Balance>[] = [
    {
      key: 'user_email',
      label: 'User',
      sortable: true,
      render: (_value: unknown, balance: Balance) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <Icon name="User" className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-medium text-slate-900">{balance.user_email}</p>
            <p className="text-xs text-slate-500">{balance.user_name}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'total_balance',
      label: 'Total Balance',
      sortable: true,
      align: 'right',
      render: (_value: unknown, balance: Balance) => (
        <div className="text-right">
          <p className="text-xl font-bold text-slate-900">
            {formatCurrency(parseFloat(balance.total_balance))}
          </p>
        </div>
      ),
    },
    {
      key: 'base_balance',
      label: 'Base',
      sortable: true,
      align: 'right',
      render: (_value: unknown, balance: Balance) => (
        <span className="text-sm text-slate-600">
          {formatCurrency(parseFloat(balance.base_balance))}
        </span>
      ),
    },
    {
      key: 'bonus_balance',
      label: 'Bonus',
      sortable: true,
      align: 'right',
      render: (_value: unknown, balance: Balance) => (
        <span className="text-sm text-emerald-600 font-medium">
          +{formatCurrency(parseFloat(balance.bonus_balance))}
        </span>
      ),
    },
    {
      key: 'last_reset',
      label: 'Last Reset',
      sortable: true,
      render: (_value: unknown, balance: Balance) => (
        <span className="text-sm text-slate-600">
          {new Date(balance.last_reset).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'created_at',
      label: 'Created',
      sortable: true,
      render: (_value: unknown, balance: Balance) => (
        <span className="text-sm text-slate-600">
          {new Date(balance.created_at).toLocaleDateString()}
        </span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      align: 'right',
      render: (_value: unknown, balance: Balance) => (
        <div className="flex gap-2 justify-end">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onViewDetail(balance)}
          >
            <Icon name="Eye" size="sm" />
            View
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onUpdate(balance)}
          >
            <Icon name="Edit" size="sm" />
            Adjust
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable<Balance>
      columns={columns}
      data={balances}
      loading={loading}
      emptyMessage="No balances found"
      rowKey="user_id"
    />
  );
};
