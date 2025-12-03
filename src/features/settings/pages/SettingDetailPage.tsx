import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DetailLayout } from '@/components/page-layouts/DetailLayout';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Alert } from '@/components/molecules/Alert';
import { Skeleton } from '@/components/atoms/Skeleton';
import { SettingDetailCard, SettingEditDialog } from '../components';
import { useSettingDetail } from '../hooks';

export const SettingDetailPage = () => {
  const { key } = useParams<{ key: string }>();
  const navigate = useNavigate();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { setting, loading, error, refetch } = useSettingDetail(key || '');

  if (loading) {
    return (
      <DetailLayout title="Loading..." breadcrumbs={[]}>
        <div className="space-y-4">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </DetailLayout>
    );
  }

  if (error || !setting) {
    return (
      <DetailLayout
        title="Setting Not Found"
        breadcrumbs={[
          { label: 'Settings', href: '/settings' },
          { label: 'Detail' },
        ]}
      >
        <Alert variant="error">{error || 'Setting not found'}</Alert>
        <Button onClick={() => navigate('/settings')} className="mt-4">
          Back to Settings
        </Button>
      </DetailLayout>
    );
  }

  return (
    <DetailLayout
      title={setting.display_name}
      breadcrumbs={[
        { label: 'Settings', href: '/settings' },
        { label: setting.display_name },
      ]}
      actions={
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => navigate('/settings')}
            leftIcon={<Icon name="ArrowLeft" size="sm" />}
          >
            Back
          </Button>
          <Button
            onClick={() => setIsEditDialogOpen(true)}
            leftIcon={<Icon name="Edit2" size="sm" />}
          >
            Edit Setting
          </Button>
        </div>
      }
    >
      <div className="space-y-6">
        <SettingDetailCard setting={setting} onEdit={() => setIsEditDialogOpen(true)} />
      </div>

      <SettingEditDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        setting={setting}
        onSuccess={refetch}
      />
    </DetailLayout>
  );
};
