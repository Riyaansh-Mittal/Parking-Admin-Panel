import { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/organisms/Modal';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Alert } from '@/components/molecules/Alert';
import { Icon } from '@/components/atoms/Icon';
import { useBulkCodeActions } from '../hooks';

interface BulkExtendValidityDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCodeIds: string[];
  onSuccess: () => void;
}

export const BulkExtendValidityDialog = ({
  isOpen,
  onClose,
  selectedCodeIds,
  onSuccess,
}: BulkExtendValidityDialogProps) => {
  const { extendValidity, loading, error } = useBulkCodeActions();
  const [days, setDays] = useState(30);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await extendValidity({
      code_ids: selectedCodeIds,
      days,
    });

    if (result.success) {
      onSuccess();
      handleClose();
    }
  };

  const handleClose = () => {
    setDays(30);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <form onSubmit={handleSubmit}>
        <ModalHeader onClose={handleClose}>Extend Code Validity</ModalHeader>
        <ModalBody>
          {error && <Alert variant="error">{error}</Alert>}

          <Alert variant="info">
            <p>
              Extend the validity period for <strong>{selectedCodeIds.length}</strong>{' '}
              {selectedCodeIds.length === 1 ? 'code' : 'codes'} by adding extra days to their
              expiration date.
            </p>
          </Alert>

          <div className="mt-4">
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Number of Days *
            </label>
            <Input
              type="number"
              min={1}
              max={365}
              value={days}
              onChange={(e) => setDays(parseInt(e.target.value))}
              placeholder="30"
              required
            />
            <p className="mt-1 text-xs text-slate-500">
              This will add {days} {days === 1 ? 'day' : 'days'} to the current expiration date
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
              leftIcon={<Icon name="Clock" size="sm" />}
            >
              Extend Validity
            </Button>
          </div>
        </ModalFooter>
      </form>
    </Modal>
  );
};

BulkExtendValidityDialog.displayName = 'BulkExtendValidityDialog';
