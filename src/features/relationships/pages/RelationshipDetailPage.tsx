import { useParams, useNavigate } from 'react-router-dom';
import { DetailLayout } from '@components/page-layouts/DetailLayout';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { Icon } from '@/components/atoms/Icon';
import { Card, CardHeader, CardBody } from '@/components/organisms/Card';
import { Alert } from '@/components/molecules/Alert';
import { Spinner } from '@/components/atoms/Spinner';
import { formatDate, formatCurrency } from '@/utils/formatters';
import { getRelationshipStatus } from '../types';
import { useRelationshipDetail } from '../hooks';

export const RelationshipDetailPage = () => {
  const { relationshipId } = useParams<{ relationshipId: string }>();
  const navigate = useNavigate();
  const { relationship, loading, error } =
    useRelationshipDetail(relationshipId);

  const statusConfig = relationship
    ? getRelationshipStatus(relationship)
    : null;

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error || !relationship) {
    return (
      <DetailLayout
        title="Relationship Not Found"
        actions={
          <Button variant="secondary" onClick={() => navigate(-1)}>
            <Icon name="ArrowLeft" size="sm" />
            Back
          </Button>
        }
      >
        <Alert variant="error">
          <Icon name="AlertCircle" />
          {error || 'Relationship not found'}
        </Alert>
      </DetailLayout>
    );
  }

  return (
    <DetailLayout
      title="Relationship Details"
      actions={
        <Button variant="secondary" onClick={() => navigate(-1)}>
          <Icon name="ArrowLeft" size="sm" />
          Back to List
        </Button>
      }
    >
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main Info */}
        <div className="space-y-6 lg:col-span-2">
          {/* Status Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900">Status</h3>
                {statusConfig && (
                  <Badge variant={statusConfig.variant} size="lg">
                    <Icon name={statusConfig.icon} size="sm" />
                    {statusConfig.label}
                  </Badge>
                )}
              </div>
            </CardHeader>
          </Card>

          {/* Referrer Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Icon name="User" className="text-indigo-600" />
                <h3 className="text-lg font-semibold text-slate-900">
                  Referrer
                </h3>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <p className="text-slate-900">
                    {relationship.referrer.email}
                  </p>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    User ID
                  </label>
                  <code className="text-sm text-slate-600">
                    {relationship.referrer.user_id}
                  </code>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Reward Amount
                  </label>
                  <p className="text-lg font-semibold text-slate-900">
                    {formatCurrency(relationship.reward_for_referrer)}
                  </p>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Credit Status
                  </label>
                  {relationship.referrer_reward_credited ? (
                    <Badge variant="success">
                      <Icon name="CheckCircle" size="xs" />
                      Credited
                    </Badge>
                  ) : (
                    <Badge variant="warning">
                      <Icon name="Clock" size="xs" />
                      Pending
                    </Badge>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Referred User Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Icon name="UserPlus" className="text-emerald-600" />
                <h3 className="text-lg font-semibold text-slate-900">
                  Referred User
                </h3>
              </div>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <p className="text-slate-900">
                    {relationship.referred_user.email}
                  </p>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    User ID
                  </label>
                  <code className="text-sm text-slate-600">
                    {relationship.referred_user.user_id}
                  </code>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Reward Amount
                  </label>
                  <p className="text-lg font-semibold text-slate-900">
                    {formatCurrency(relationship.reward_for_referred)}
                  </p>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Credit Status
                  </label>
                  {relationship.referred_reward_credited ? (
                    <Badge variant="success">
                      <Icon name="CheckCircle" size="xs" />
                      Credited
                    </Badge>
                  ) : (
                    <Badge variant="warning">
                      <Icon name="Clock" size="xs" />
                      Pending
                    </Badge>
                  )}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Referral Code */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-slate-900">
                Referral Code
              </h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                <div>
                  <code className="mb-2 block font-mono text-lg font-semibold text-indigo-600">
                    {relationship.referral_code.code}
                  </code>
                  <Badge
                    variant={
                      relationship.referral_code.code_type === 'campaign'
                        ? 'info'
                        : 'neutral'
                    }
                  >
                    {relationship.referral_code.code_type === 'campaign'
                      ? 'Campaign'
                      : 'User'}
                  </Badge>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Campaign (if applicable) */}
          {relationship.campaign && (
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Icon name="Megaphone" className="text-indigo-600" />
                  <h3 className="text-lg font-semibold text-slate-900">
                    Campaign
                  </h3>
                </div>
              </CardHeader>
              <CardBody>
                <div className="space-y-2">
                  <p className="font-medium text-slate-900">
                    {relationship.campaign.name}
                  </p>
                  <code className="block text-xs text-slate-500">
                    {relationship.campaign.id}
                  </code>
                </div>
              </CardBody>
            </Card>
          )}

          {/* Timestamps */}
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold text-slate-900">Timeline</h3>
            </CardHeader>
            <CardBody>
              <div className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-500">
                    Created At
                  </label>
                  <p className="text-sm text-slate-900">
                    {formatDate(relationship.created_at, 'MMM dd, yyyy HH:mm')}
                  </p>
                </div>
                {relationship.reward_given_at && (
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-500">
                      Reward Given At
                    </label>
                    <p className="text-sm text-slate-900">
                      {formatDate(
                        relationship.reward_given_at,
                        'MMM dd, yyyy HH:mm'
                      )}
                    </p>
                  </div>
                )}
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-500">
                    Last Updated
                  </label>
                  <p className="text-sm text-slate-900">
                    {formatDate(relationship.updated_at, 'MMM dd, yyyy HH:mm')}
                  </p>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </DetailLayout>
  );
};
