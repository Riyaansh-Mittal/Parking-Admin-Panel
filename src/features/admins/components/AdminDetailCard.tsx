import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { formatDateTime } from '@/utils/formatters';
import type { AdminUser } from '@/features/admins/types';

interface AdminDetailCardProps {
  admin: AdminUser;
  onEdit?: () => void;
  canEdit?: boolean;
}

export const AdminDetailCard = ({ admin, onEdit, canEdit = false }: AdminDetailCardProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            {admin.first_name} {admin.last_name}
          </h2>
          <p className="mt-1 text-sm text-slate-600">{admin.email}</p>
        </div>
        {canEdit && (
          <Button variant="secondary" size="sm" onClick={onEdit}>
            <Icon name="Edit" size="sm" />
            Edit
          </Button>
        )}
      </div>

      {/* Status Badges */}
      <div className="flex flex-wrap gap-2">
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
        <Badge variant={admin.is_active ? 'success' : 'error'}>
          {admin.is_active ? 'Active' : 'Inactive'}
        </Badge>
        <Badge variant={admin.email_verified ? 'success' : 'warning'}>
          {admin.email_verified ? (
            <>
              <Icon name="CheckCircle" size="sm" />
              Email Verified
            </>
          ) : (
            <>
              <Icon name="Clock" size="sm" />
              Email Pending
            </>
          )}
        </Badge>
        <Badge variant={admin.password_set ? 'success' : 'neutral'}>
          {admin.password_set ? 'Password Set' : 'Password Not Set'}
        </Badge>
      </div>

      {/* Information Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Basic Information
          </h3>

          <div>
            <p className="text-sm text-slate-600">User ID</p>
            <p className="mt-1 font-mono text-sm text-slate-900">{admin.user_id}</p>
          </div>

          <div>
            <p className="text-sm text-slate-600">Email</p>
            <p className="mt-1 text-sm text-slate-900">{admin.email}</p>
          </div>

          <div>
            <p className="text-sm text-slate-600">Full Name</p>
            <p className="mt-1 text-sm text-slate-900">
              {admin.first_name} {admin.last_name}
            </p>
          </div>

          {admin.created_by && (
            <div>
              <p className="text-sm text-slate-600">Created By</p>
              <p className="mt-1 text-sm text-slate-900">{admin.created_by}</p>
            </div>
          )}
        </div>

        {/* Activity Information */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Activity
          </h3>

          <div>
            <p className="text-sm text-slate-600">Account Created</p>
            <p className="mt-1 text-sm text-slate-900">{formatDateTime(admin.created_at)}</p>
          </div>

          {admin.last_login && (
            <div>
              <p className="text-sm text-slate-600">Last Login</p>
              <p className="mt-1 text-sm text-slate-900">{formatDateTime(admin.last_login)}</p>
            </div>
          )}

          <div>
            <p className="text-sm text-slate-600">Account Status</p>
            <p className="mt-1 text-sm text-slate-900">
              {admin.is_active ? 'Active' : 'Inactive'}
            </p>
          </div>

          <div>
            <p className="text-sm text-slate-600">Email Verification</p>
            <p className="mt-1 text-sm text-slate-900">
              {admin.email_verified ? 'Verified' : 'Pending verification'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
