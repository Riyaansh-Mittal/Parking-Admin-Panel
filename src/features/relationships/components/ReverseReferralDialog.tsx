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
import { formatCurrency } from '@/utils/formatters';
import { useReverseReferral } from '../hooks';
import type { Relationship } from '../types';

interface ReverseReferralDialogProps {
  isOpen: boolean;
  onClose: () => void;
  relationship: Relationship | null;
  onSuccess?: () => void;
}

export const ReverseReferralDialog = ({
  isOpen,
  onClose,
  relationship,
  onSuccess,
}: ReverseReferralDialogProps) => {
  const [reason, setReason] = useState('');
  const { reverse, loading, error, success, reset } = useReverseReferral();

  const handleClose = useCallback(() => {
    setReason('');
    reset();
    onClose();
  }, [reset, onClose]);

  useEffect(() => {
    if (success && onSuccess) {
      onSuccess();
      handleClose();
    }
  }, [success, onSuccess, handleClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!relationship) return;

    await reverse(relationship.id, { reason });
  };

  if (!relationship) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <form onSubmit={handleSubmit}>
        <ModalHeader onClose={handleClose}>
          <div className="flex items-center gap-3">
            <Icon name="RotateCcw" className="text-rose-600" />
            <span>Reverse Referral (Clawback)</span>
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

            <Alert variant="error">
              <Icon name="AlertTriangle" />
              <strong>Warning:</strong> This action will deduct previously
              credited rewards from both users. This is typically used for fraud
              or abuse cases. This action requires Superuser permissions.
            </Alert>

            <div className="space-y-3 rounded-lg bg-slate-50 p-4">
              <div className="text-sm">
                <span className="text-slate-600">Referrer:</span>{' '}
                <span className="font-medium text-slate-900">
                  {relationship.referrer_email}
                </span>
                <div className="mt-1 text-rose-600">
                  Will deduct:{' '}
                  {formatCurrency(relationship.reward_for_referrer)}
                </div>
              </div>
              <div className="text-sm">
                <span className="text-slate-600">Referred:</span>{' '}
                <span className="font-medium text-slate-900">
                  {relationship.referred_email}
                </span>
                <div className="mt-1 text-rose-600">
                  Will deduct:{' '}
                  {formatCurrency(relationship.reward_for_referred)}
                </div>
              </div>
              <div className="border-t border-slate-200 pt-3">
                <span className="text-sm font-medium text-slate-900">
                  Total Clawback:{' '}
                  {formatCurrency(
                    parseFloat(relationship.reward_for_referrer) +
                      parseFloat(relationship.reward_for_referred)
                  )}
                </span>
              </div>
            </div>

            <div>
              <label
                htmlFor="reason"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Reason for Reversal <span className="text-rose-600">*</span>
              </label>
              <Input
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="e.g., Fraud detected - fake accounts"
                required
              />
              <p className="mt-1 text-xs text-slate-500">
                This reason will be logged for audit purposes
              </p>
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
            variant="danger"
            loading={loading}
            disabled={!reason.trim()}
          >
            <Icon name="RotateCcw" size="sm" />
            Reverse & Clawback
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
