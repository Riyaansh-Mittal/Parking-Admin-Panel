import { useState, useEffect, useCallback } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@/components/organisms/Modal';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Alert } from '@/components/molecules/Alert';
import { Icon } from '@/components/atoms/Icon';
import { useFixPartialReward } from '../hooks';
import type { PartiallyCompletedRelationship } from '../types';

interface FixPartialRewardDialogProps {
  isOpen: boolean;
  onClose: () => void;
  relationship: PartiallyCompletedRelationship | null;
  onSuccess?: () => void;
}

export const FixPartialRewardDialog = ({
  isOpen,
  onClose,
  relationship,
  onSuccess,
}: FixPartialRewardDialogProps) => {
  const [reason, setReason] = useState('');
  const { fixReward, loading, error, success, reset } = useFixPartialReward();

  const handleClose = useCallback(() => {
    setReason('');
    reset();
    onClose();
  }, [reset, onClose]); // ✅ Add dependencies

  useEffect(() => {
    if (success && onSuccess) {
      onSuccess();
      handleClose();
    }
  }, [success, onSuccess, handleClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!relationship) return;

    await fixReward(relationship.id, { reason });
  };

  if (!relationship) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <form onSubmit={handleSubmit}>
        <ModalHeader onClose={handleClose}>
          <div className="flex items-center gap-3">
            <Icon name="Wrench" className="text-emerald-600" />
            <span>Fix Partial Reward</span>
          </div>
        </ModalHeader>

        <ModalBody>
          <div className="space-y-4">
            {error && (
              <Alert variant="error">
                <Icon name="AlertCircle" />
                {error}
              </Alert>
            )}

            <Alert variant="warning">
              <Icon name="AlertTriangle" />
              This will manually credit the failed rewards for this
              relationship.
            </Alert>

            <div className="space-y-2 rounded-lg bg-slate-50 p-4">
              <div className="text-sm">
                <span className="text-slate-600">Referrer:</span>{' '}
                <span className="font-medium text-slate-900">
                  {relationship.referrer_email}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-slate-600">Referred:</span>{' '}
                <span className="font-medium text-slate-900">
                  {relationship.referred_email}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600">
                    Referrer Credited:
                  </span>
                  {relationship.referrer_reward_credited ? (
                    <Icon
                      name="CheckCircle"
                      size="sm"
                      className="text-emerald-600"
                    />
                  ) : (
                    <Icon name="XCircle" size="sm" className="text-rose-600" />
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-600">
                    Referred Credited:
                  </span>
                  {relationship.referred_reward_credited ? (
                    <Icon
                      name="CheckCircle"
                      size="sm"
                      className="text-emerald-600"
                    />
                  ) : (
                    <Icon name="XCircle" size="sm" className="text-rose-600" />
                  )}
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="reason"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Reason for Manual Intervention
              </label>
              <Input
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g., Manual retry after system fix"
                required
              />
            </div>
          </div>
        </ModalBody>

        <ModalFooter>
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            loading={loading}
            disabled={!reason.trim()}
          >
            <Icon name="CheckCircle" size="sm" />
            Fix & Credit Rewards
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
