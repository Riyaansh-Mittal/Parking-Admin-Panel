import { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@/components/organisms/Modal';
import { Textarea } from '@/components/atoms/Textarea';
import { Button } from '@/components/atoms/Button';
import { Alert } from '@/components/molecules/Alert';
import { Icon } from '@/components/atoms/Icon';
import { useAppDispatch } from '@/redux/hooks';
import { deactivateCampaign } from '@/redux/slices/campaignsSlice';

interface DeactivateCampaignModalProps {
  campaignId: string;
  campaignName: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const DeactivateCampaignModal = ({
  campaignId,
  campaignName,
  isOpen,
  onClose,
  onSuccess,
}: DeactivateCampaignModalProps) => {
  const dispatch = useAppDispatch();
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDeactivate = async () => {
    setLoading(true);
    setError(null);

    try {
      await dispatch(
        deactivateCampaign({
          campaignId,
          payload: { reason: reason || undefined },
        })
      ).unwrap();
      onSuccess?.();
      handleClose();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to deactivate campaign'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setReason('');
    setError(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <ModalHeader onClose={handleClose}>Deactivate Campaign</ModalHeader>

      <ModalBody>
        <div className="space-y-4">
          <Alert variant="warning">
            This will deactivate the campaign and all associated codes
          </Alert>
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-600">Campaign</p>
            <p className="mt-1 font-semibold text-slate-900">{campaignName}</p>
          </div>

          <Textarea
            label="Reason (Optional)"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Enter reason for deactivation..."
            rows={4}
            fullWidth
          />

          {error && <Alert variant="error">{error}</Alert>}
        </div>
      </ModalBody>

      <ModalFooter>
        <Button variant="ghost" onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDeactivate} loading={loading}>
          <Icon name="Ban" size="sm" />
          Deactivate Campaign
        </Button>
      </ModalFooter>
    </Modal>
  );
};
