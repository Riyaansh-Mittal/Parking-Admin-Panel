import { DataTable } from '@/components/organisms/DataTable';
import { Badge } from '@/components/atoms/Badge';
import { Switch } from '@/components/atoms/Switch';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { formatDateTime } from '@/utils/formatters';
import type { AdminListItem } from '@/features/admins/types';
import type { TableColumn } from '@/types/table.types';

interface AdminListTableProps {
  admins: AdminListItem[];
  loading: boolean;
  onStatusChange?: (userId: string, isActive: boolean) => void;
  onViewDetail?: (userId: string) => void;
}

export const AdminListTable = ({
  admins,
  loading,
  onStatusChange,
  onViewDetail,
}: AdminListTableProps) => {
  const columns: TableColumn<AdminListItem>[] = [
    {
      key: 'email',
      label: 'Admin',
      sortable: true,
      render: (_value, admin) => (
        <div className="flex flex-col">
          <span className="font-medium text-slate-900">{admin.email}</span>
          <span className="text-sm text-slate-500">
            {admin.first_name} {admin.last_name}
          </span>
        </div>
      ),
    },
    {
      key: 'user_type',
      label: 'Type',
      sortable: true,
      render: (_value, admin) => (
        <Badge variant={admin.user_type === 'superuser' ? 'info' : 'neutral'}>
          {admin.user_type === 'superuser' ? (
            <>
              <Icon name="Shield" size="sm" />
              Superuser
            </>
          ) : (
            <>
              <Icon name="User" size="sm" />
              Admin
            </>
          )}
        </Badge>
      ),
    },
    {
      key: 'email_verified',
      label: 'Email Status',
      sortable: true,
      render: (_value, admin) => (
        <Badge variant={admin.email_verified ? 'success' : 'warning'}>
          {admin.email_verified ? (
            <>
              <Icon name="CheckCircle" size="sm" />
              Verified
            </>
          ) : (
            <>
              <Icon name="Clock" size="sm" />
              Pending
            </>
          )}
        </Badge>
      ),
    },
    {
      key: 'password_set',
      label: 'Password',
      sortable: true,
      render: (_value, admin) => (
        <Badge variant={admin.password_set ? 'success' : 'neutral'}>
          {admin.password_set ? 'Set' : 'Not Set'}
        </Badge>
      ),
    },
    {
      key: 'is_active',
      label: 'Status',
      sortable: true,
      render: (_value, admin) => (
        <div className="flex items-center gap-2">
          <Switch
            checked={admin.is_active}
            onChange={(e) => onStatusChange?.(admin.user_id, e.target.checked)} // ✅ Fixed: e.target.checked
            disabled={admin.user_type === 'superuser'}
            size="sm"
          />
          <span className="text-sm text-slate-600">
            {admin.is_active ? 'Active' : 'Inactive'}
          </span>
        </div>
      ),
    },
    {
      key: 'created_at',
      label: 'Created',
      sortable: true,
      render: (_value, admin) => (
        <span className="text-sm text-slate-600">{formatDateTime(admin.created_at)}</span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (_value, admin) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onViewDetail?.(admin.user_id)}
          leftIcon={<Icon name="Eye" size="sm" />}
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <DataTable
      data={admins as unknown as Record<string, unknown>[]} // ✅ Type cast for generic DataTable
      columns={columns as unknown as TableColumn<Record<string, unknown>>[]} // ✅ Type cast
      loading={loading}
      emptyMessage="No admin users found"
    />
  );
};
