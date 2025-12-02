import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@/components/organisms/Modal';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { Icon } from '@/components/atoms/Icon';
import { Spinner } from '@/components/atoms/Spinner';
import { formatDate, formatCurrency } from '@/utils/formatters';
import { getRelationshipStatus } from '../types';
import type { RelationshipDetail } from '../types';

interface RelationshipDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  relationship: RelationshipDetail | null;
  loading?: boolean;
}

export const RelationshipDetailModal = ({
  isOpen,
  onClose,
  relationship,
  loading = false,
}: RelationshipDetailModalProps) => {
  if (!relationship && !loading) return null;

  const statusConfig = relationship
    ? getRelationshipStatus(relationship)
    : null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalHeader onClose={onClose}>
        <div className="flex items-center gap-3">
          <Icon name="Users" className="text-indigo-600" />
          <span>Relationship Detail</span>
        </div>
      </ModalHeader>

      <ModalBody>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Spinner size="lg" />
          </div>
        ) : relationship ? (
          <div className="space-y-6">
            {/* Status */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Status
              </label>
              {statusConfig && (
                <Badge variant={statusConfig.variant} size="lg">
                  <Icon name={statusConfig.icon} size="sm" />
                  {statusConfig.label}
                </Badge>
              )}
            </div>

            {/* Referrer Info */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Referrer
              </label>
              <div className="rounded-lg bg-slate-50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Icon name="User" size="sm" className="text-slate-500" />
                  <span className="font-medium text-slate-900">
                    {relationship.referrer.email}
                  </span>
                </div>
                <div className="text-sm text-slate-600">
                  ID: {relationship.referrer.user_id}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-sm text-slate-700">
                    Reward: {formatCurrency(relationship.reward_for_referrer)}
                  </span>
                  {relationship.referrer_reward_credited ? (
                    <Badge variant="success" size="sm">
                      <Icon name="CheckCircle" size="xs" />
                      Credited
                    </Badge>
                  ) : (
                    <Badge variant="warning" size="sm">
                      <Icon name="Clock" size="xs" />
                      Pending
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Referred User Info */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Referred User
              </label>
              <div className="rounded-lg bg-slate-50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <Icon name="UserPlus" size="sm" className="text-slate-500" />
                  <span className="font-medium text-slate-900">
                    {relationship.referred_user.email}
                  </span>
                </div>
                <div className="text-sm text-slate-600">
                  ID: {relationship.referred_user.user_id}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-sm text-slate-700">
                    Reward: {formatCurrency(relationship.reward_for_referred)}
                  </span>
                  {relationship.referred_reward_credited ? (
                    <Badge variant="success" size="sm">
                      <Icon name="CheckCircle" size="xs" />
                      Credited
                    </Badge>
                  ) : (
                    <Badge variant="warning" size="sm">
                      <Icon name="Clock" size="xs" />
                      Pending
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* Referral Code */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Referral Code
              </label>
              <div className="rounded-lg bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <code className="font-mono font-semibold text-slate-900">
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
            </div>

            {/* Campaign (if applicable) */}
            {relationship.campaign && (
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Campaign
                </label>
                <div className="rounded-lg bg-slate-50 p-4">
                  <div className="flex items-center gap-2">
                    <Icon
                      name="Megaphone"
                      size="sm"
                      className="text-indigo-600"
                    />
                    <span className="font-medium text-slate-900">
                      {relationship.campaign.name}
                    </span>
                  </div>
                  <div className="mt-1 text-sm text-slate-600">
                    ID: {relationship.campaign.id}
                  </div>
                </div>
              </div>
            )}

            {/* Timestamps */}
            <div className="grid grid-cols-2 gap-4 border-t border-slate-200 pt-4">
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-500">
                  Created At
                </label>
                <div className="text-sm text-slate-900">
                  {formatDate(relationship.created_at, 'MMM dd, yyyy HH:mm')}
                </div>
              </div>
              {relationship.reward_given_at && (
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-500">
                    Reward Given At
                  </label>
                  <div className="text-sm text-slate-900">
                    {formatDate(
                      relationship.reward_given_at,
                      'MMM dd, yyyy HH:mm'
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </ModalBody>

      <ModalFooter>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};
