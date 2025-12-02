import { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/organisms/Modal';
import { Button } from '@/components/atoms/Button';
import { Alert } from '@/components/molecules/Alert';
import { Icon } from '@/components/atoms/Icon';
import { useBulkCodeActions } from '../hooks';

interface BulkDeactivateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCodeIds: string[];
  onSuccess: () => void;
}

export const BulkDeactivateDialog = ({
  isOpen,
  onClose,
  selectedCodeIds,
  onSuccess,
}: BulkDeactivateDialogProps) => {
  const { deactivate, loading, error } = useBulkCodeActions();
  const [reason, setReason] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await deactivate({
      code_ids: selectedCodeIds,
      reason: reason || undefined,
    });

    if (result.success) {
      onSuccess();
      handleClose();
    }
  };

  const handleClose = () => {
    setReason('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <form onSubmit={handleSubmit}>
        <ModalHeader onClose={handleClose}>Deactivate Codes</ModalHeader>
        <ModalBody>
          {error && <Alert variant="error">{error}</Alert>}

          <Alert variant="warning">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Icon name="AlertTriangle" size="sm" />
                <span className="font-semibold">Warning</span>
              </div>
              <p>
                You are about to deactivate <strong>{selectedCodeIds.length}</strong>{' '}
                {selectedCodeIds.length === 1 ? 'code' : 'codes'}. This action cannot be easily
                undone.
              </p>
            </div>
          </Alert>

          <div className="mt-4">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Reason (Optional)
            </label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Explain why these codes are being deactivated..."
              rows={3}
              className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="danger"
              loading={loading}
              leftIcon={<Icon name="Ban" size="sm" />}
            >
              Deactivate {selectedCodeIds.length} {selectedCodeIds.length === 1 ? 'Code' : 'Codes'}
            </Button>
          </div>
        </ModalFooter>
      </form>
    </Modal>
  );
};

BulkDeactivateDialog.displayName = 'BulkDeactivateDialog';
