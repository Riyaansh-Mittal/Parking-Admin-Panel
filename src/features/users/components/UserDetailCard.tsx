import { Card, CardHeader, CardBody } from '@/components/organisms/Card';
import { Badge } from '@/components/atoms/Badge';
import { Icon } from '@/components/atoms/Icon';
import { formatDateTime } from '@/utils/formatters';
import type { User } from '@/features/users/types';

interface UserDetailCardProps {
  user: User;
}

export const UserDetailCard = ({ user }: UserDetailCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">User Information</h3>
          <Badge variant={user.is_active ? 'success' : 'error'} size="sm">
            {user.is_active ? 'Active' : 'Inactive'}
          </Badge>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-6">
          {/* Basic Info */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-700">Basic Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-500">Username</label>
                <p className="mt-1 text-sm font-medium text-slate-900">@{user.username}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">Full Name</label>
                <p className="mt-1 text-sm font-medium text-slate-900">{user.full_name}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">Email</label>
                <div className="mt-1 flex items-center gap-2">
                  <p className="text-sm text-slate-700">{user.email}</p>
                  {user.email_verified && (
                    <Icon name="CheckCircle" size="sm" className="text-emerald-500" />
                  )}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">Phone</label>
                <div className="mt-1 flex items-center gap-2">
                  <p className="text-sm text-slate-700">{user.phone_number || '—'}</p>
                  {user.phone_verified && (
                    <Icon name="CheckCircle" size="sm" className="text-emerald-500" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Vehicle Info */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-700">Vehicle Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-500">License Plate</label>
                <p className="mt-1 font-mono text-sm font-medium text-slate-900">
                  {user.license_plate_number || '—'}
                </p>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">Vehicle Type</label>
                <p className="mt-1 text-sm text-slate-700">{user.vehicle_type || '—'}</p>
              </div>
              <div className="col-span-2">
                <label className="text-xs font-medium text-slate-500">Vehicle Model</label>
                <p className="mt-1 text-sm text-slate-700">{user.vehicle_model || '—'}</p>
              </div>
            </div>
          </div>

          {/* Profile Status */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-700">Profile Status</h4>
            <div className="flex flex-wrap gap-2">
              <Badge variant={user.profile_status.is_complete ? 'success' : 'warning'} size="sm">
                {user.profile_status.is_complete ? 'Complete' : 'Incomplete'}
              </Badge>
              {user.profile_status.has_vehicle && (
                <Badge variant="info" size="sm">
                  <Icon name="Car" size="xs" className="mr-1" />
                  Has Vehicle
                </Badge>
              )}
              {user.profile_status.can_scan_qr && (
                <Badge variant="success" size="sm">
                  <Icon name="QrCode" size="xs" className="mr-1" />
                  Can Scan QR
                </Badge>
              )}
            </div>
          </div>

          {/* Timestamps */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-slate-700">Account Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-slate-500">User ID</label>
                <p className="mt-1 font-mono text-xs text-slate-600">{user.user_id}</p>
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">Created At</label>
                <p className="mt-1 text-sm text-slate-700">{formatDateTime(user.created_at)}</p>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
