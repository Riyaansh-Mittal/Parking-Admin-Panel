import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataTable } from '@/components/organisms/DataTable';
import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { formatDate } from '@/utils/formatters';
import type { UserListItem } from '@/features/users/types';
import type { TableColumn } from '@/types/table.types';

interface UserListTableProps {
  users: UserListItem[];
  loading: boolean;
  onStatusChange: (userId: string, isActive: boolean) => void;
}

export const UserListTable = ({ users, loading, onStatusChange }: UserListTableProps) => {
  const navigate = useNavigate();

  const columns: TableColumn<UserListItem>[] = useMemo(
    () => [
      {
        key: 'full_name',
        label: 'User',
        sortable: true,
        render: (_, row) => (
          <div className="flex flex-col">
            <span className="font-medium text-slate-900">{row.full_name}</span>
            <span className="text-sm text-slate-500">@{row.user_name}</span>
          </div>
        ),
      },
      {
        key: 'email',
        label: 'Email',
        sortable: true,
        render: (_, row) => (
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-700">{row.email}</span>
            {row.email_verified && (
              <Icon name="CheckCircle" size="sm" className="text-emerald-500" />
            )}
          </div>
        ),
      },
      {
        key: 'phone_number',
        label: 'Phone',
        render: (_, row) => (
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-700">{row.phone_number || '—'}</span>
            {row.phone_verified && (
              <Icon name="CheckCircle" size="sm" className="text-emerald-500" />
            )}
          </div>
        ),
      },
      {
        key: 'license_plate',
        label: 'Vehicle',
        render: (_, row) => (
          <div className="flex items-center gap-1.5">
            {row.has_vehicle ? (
              <>
                <Icon name="Car" size="sm" className="text-slate-400" />
                <span className="font-mono text-sm text-slate-900">{row.license_plate}</span>
              </>
            ) : (
              <span className="text-sm text-slate-400">No vehicle</span>
            )}
          </div>
        ),
      },
      {
        key: 'is_active',
        label: 'Status',
        sortable: true,
        render: (_, row) => (
          <Badge variant={row.is_active ? 'success' : 'error'} size="sm">
            {row.is_active ? 'Active' : 'Inactive'}
          </Badge>
        ),
      },
      {
        key: 'created_at',
        label: 'Joined',
        sortable: true,
        render: (_, row) => (
          <span className="text-sm text-slate-600">{formatDate(row.created_at)}</span>
        ),
      },
      {
        key: 'actions',
        label: 'Actions',
        align: 'right',
        render: (_, row) => (
          <div className="flex items-center justify-end gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/users/${row.user_id}`)}
              title="View details"
            >
              <Icon name="Eye" size="sm" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onStatusChange(row.user_id, !row.is_active)}
              title={row.is_active ? 'Deactivate' : 'Activate'}
            >
              <Icon name={row.is_active ? 'Ban' : 'Check'} size="sm" />
            </Button>
          </div>
        ),
      },
    ],
    [navigate, onStatusChange]
  );

  return (
    <DataTable<UserListItem>
      columns={columns}
      data={users}
      loading={loading}
      emptyMessage="No users found"
      rowKey="user_id"
    />
  );
};
