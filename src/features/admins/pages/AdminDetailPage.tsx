import { useParams, useNavigate } from 'react-router-dom';
import { DetailLayout } from '@/components/page-layouts/DetailLayout';
import { AdminDetailCard } from '../components/AdminDetailCard';
import { ResendVerificationButton } from '../components/ResendVerificationButton';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Alert } from '@/components/molecules/Alert';
import { Skeleton } from '@/components/atoms/Skeleton';
import { useAdminDetail } from '../hooks/useAdminDetail';
import { useAppSelector } from '@/redux/hooks';

export const AdminDetailPage = () => {
  const { adminId } = useParams<{ adminId: string }>();
  const navigate = useNavigate();
  const { admin, loading, error } = useAdminDetail(adminId);
  const isSuperuser = useAppSelector((state) => state.auth.user?.is_superuser ?? false);

  const handleEdit = () => {
    navigate(`/admins/${adminId}/edit`);
  };

  if (loading) {
    return (
      <DetailLayout
        title="Loading..."
        backUrl="/admins" // ✅ Use backUrl
        actions={<Skeleton className="h-10 w-24" />}
      >
        <div className="space-y-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </DetailLayout>
    );
  }

  if (error || !admin) {
    return (
      <DetailLayout title="Error" backUrl="/admins"> {/* ✅ Use backUrl */}
        <Alert variant="error">
          {error || 'Admin user not found'}
        </Alert>
      </DetailLayout>
    );
  }

  const canEdit = isSuperuser && admin.user_type !== 'superuser';
  const canResendVerification = isSuperuser && !admin.email_verified;

  return (
    <DetailLayout
      title={`${admin.first_name} ${admin.last_name}`}
      subtitle={admin.email}
      backUrl="/admins" // ✅ Use backUrl
      actions={
        canEdit ? (
          <Button variant="primary" onClick={handleEdit}>
            <Icon name="Edit" size="sm" />
            Edit Admin
          </Button>
        ) : null
      }
    >
      <div className="space-y-8">
        {/* Admin Details */}
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <AdminDetailCard admin={admin} onEdit={canEdit ? handleEdit : undefined} canEdit={canEdit} />
        </div>

        {/* Resend Verification (if needed) */}
        {canResendVerification && (
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-amber-900">
              <Icon name="AlertTriangle" size="md" />
              Email Not Verified
            </h3>
            <p className="mb-4 text-sm text-amber-800">
              This admin has not verified their email address yet. You can resend the verification
              email to help them complete their registration.
            </p>
            <ResendVerificationButton
              email={admin.email}
              adminName={`${admin.first_name} ${admin.last_name}`}
            />
          </div>
        )}

        {/* Password Not Set Warning */}
        {!admin.password_set && (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
            <h3 className="mb-2 flex items-center gap-2 text-lg font-semibold text-slate-900">
              <Icon name="Info" size="md" />
              Password Not Set
            </h3>
            <p className="text-sm text-slate-600">
              This admin has not set their password yet. They need to verify their email and follow
              the link to set up their password before they can log in.
            </p>
          </div>
        )}
      </div>
    </DetailLayout>
  );
};
