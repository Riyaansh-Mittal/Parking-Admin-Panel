import { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/organisms/Modal';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Alert } from '@/components/molecules/Alert';
import { Icon } from '@/components/atoms/Icon';
import { useBulkCodeActions } from '../hooks';

interface BulkIncreaseUsageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCodeIds: string[];
  onSuccess: () => void;
}

export const BulkIncreaseUsageDialog = ({
  isOpen,
  onClose,
  selectedCodeIds,
  onSuccess,
}: BulkIncreaseUsageDialogProps) => {
  const { increaseUsage, loading, error } = useBulkCodeActions();
  const [additionalUsage, setAdditionalUsage] = useState(10);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await increaseUsage({
      code_ids: selectedCodeIds,
      additional_usage: additionalUsage,
    });

    if (result.success) {
      onSuccess();
      handleClose();
    }
  };

  const handleClose = () => {
    setAdditionalUsage(10);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <form onSubmit={handleSubmit}>
        <ModalHeader onClose={handleClose}>Increase Usage Limit</ModalHeader>
        <ModalBody>
          {error && <Alert variant="error">{error}</Alert>}

          <Alert variant="info">
            <p>
              Increase the maximum usage limit for <strong>{selectedCodeIds.length}</strong>{' '}
              {selectedCodeIds.length === 1 ? 'code' : 'codes'}.
            </p>
          </Alert>

          <div className="mt-4">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Additional Usage *
            </label>
            <Input
              type="number"
              min={1}
              value={additionalUsage}
              onChange={(e) => setAdditionalUsage(parseInt(e.target.value))}
              placeholder="10"
              required
            />
            <p className="mt-1 text-xs text-slate-500">
              This will add {additionalUsage} more{' '}
              {additionalUsage === 1 ? 'usage' : 'usages'} to the current limit
            </p>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              leftIcon={<Icon name="Plus" size="sm" />}
            >
              Increase Limit
            </Button>
          </div>
        </ModalFooter>
      </form>
    </Modal>
  );
};

BulkIncreaseUsageDialog.displayName = 'BulkIncreaseUsageDialog';
