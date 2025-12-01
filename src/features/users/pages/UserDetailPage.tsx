import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DetailLayout } from '@/components/page-layouts/DetailLayout';
import { UserDetailCard } from '../components/UserDetailCard';
import { UserActions } from '../components/UserActions';
import { UpdateUserModal } from '../components/UpdateUserModal';
import { Alert } from '@/components/molecules/Alert';
import { useUserDetail } from '../hooks/useUserDetail';
import { useUpdateUser } from '../hooks/useUpdateUser';
import type { UpdateUserPayload } from '@/features/users/types';

export const UserDetailPage = () => {
  const { userId } = useParams<{ userId: string }>();
  const { user, loading, error, refetch } = useUserDetail(userId);
  const { update, updateStatus, loading: updating } = useUpdateUser();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleStatusChange = async () => {
    if (!user) return;

    const success = await updateStatus(user.user_id, {
      is_active: !user.is_active,
      reason: user.is_active ? 'Deactivated by admin' : 'Reactivated by admin',
    });

    if (success) {
      refetch();
    }
  };

  const handleUpdateSubmit = async (data: UpdateUserPayload) => {
    if (!user) return;

    const success = await update(user.user_id, data);
    if (success) {
      refetch();
    }
  };

  if (error || (!loading && !user)) {
    return (
      <DetailLayout
        title="Error"
        backUrl="/users"
        loading={false}
      >
        <Alert variant="error">{error || 'User not found'}</Alert>
      </DetailLayout>
    );
  }

  return (
    <>
      <DetailLayout
        title={user?.full_name || 'Loading...'}
        subtitle={user ? `@${user.username}` : undefined}
        backUrl="/users"
        loading={loading}
        actions={
          user && (
            <UserActions
              onEdit={handleEdit}
              onStatusChange={handleStatusChange}
              isActive={user.is_active}
              disabled={updating}
            />
          )
        }
      >
        {user && (
          <div className="space-y-6">
            {error && (
              <Alert variant="error" onClose={() => {}}>
                {error}
              </Alert>
            )}

            <UserDetailCard user={user} />
          </div>
        )}
      </DetailLayout>

      {/* Update Modal */}
      {user && (
        <UpdateUserModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          user={user}
          onSubmit={handleUpdateSubmit}
          loading={updating}
        />
      )}
    </>
  );
};
