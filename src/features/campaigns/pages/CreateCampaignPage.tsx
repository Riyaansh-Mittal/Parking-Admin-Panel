import { useNavigate } from 'react-router-dom';
import { DetailLayout } from '@/components/page-layouts/DetailLayout';
import { CampaignWizard } from '../components/CampaignWizard';

export const CreateCampaignPage = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate('/campaigns');
  };

  const handleCancel = () => {
    navigate('/campaigns');
  };

  return (
    <DetailLayout
      title="Create New Campaign"
      breadcrumbs={[
        { label: 'Campaigns', href: '/campaigns' },
        { label: 'Create' },
      ]}
    >
      <div className="mx-auto max-w-4xl">
        <CampaignWizard onSuccess={handleSuccess} onCancel={handleCancel} />
      </div>
    </DetailLayout>
  );
};
