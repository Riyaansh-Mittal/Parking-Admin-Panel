import { useState } from 'react';
import { Modal } from '@/components/organisms/Modal';
import { ModalHeader } from '@/components/organisms/Modal';
import { ModalBody } from '@/components/organisms/Modal';
import { ModalFooter } from '@/components/organisms/Modal';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Alert } from '@/components/molecules/Alert';
import type { BulkUpdateBalanceRequest } from '@/features/balances/types';

interface BulkUpdateDialogProps {
  isOpen: boolean;
  selectedUserIds: string[];
  onClose: () => void;
  onBulkUpdate: (data: BulkUpdateBalanceRequest) => Promise<void>;
  loading?: boolean;
  error?: string | null;
}

export const BulkUpdateDialog = ({
  isOpen,
  selectedUserIds,
  onClose,
  onBulkUpdate,
  loading = false,
  error = null,
}: BulkUpdateDialogProps) => {
  const [amount, setAmount] = useState('');
  const [operation, setOperation] = useState<'add' | 'subtract' | 'set'>('add');
  const [notes, setNotes] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async () => {
    // Validation
    if (!amount || parseFloat(amount) <= 0) {
      setValidationError('Please enter a valid amount');
      return;
    }

    if (!notes.trim()) {
      setValidationError('Please provide a reason for this bulk adjustment');
      return;
    }

    if (selectedUserIds.length === 0) {
      setValidationError('No users selected');
      return;
    }

    setValidationError('');

    try {
      await onBulkUpdate({
        user_ids: selectedUserIds,
        operation,
        base_balance: amount,
        notes: notes.trim(),
      });

      // Reset form on success
      setAmount('');
      setOperation('add');
      setNotes('');
    } catch {
      // Error handled by parent
    }
  };

  const handleClose = () => {
    setAmount('');
    setOperation('add');
    setNotes('');
    setValidationError('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <ModalHeader onClose={handleClose}><span>Bulk Update Balances</span></ModalHeader>
      <ModalBody>
        <div className="space-y-4">
          {/* Info */}
          <Alert variant="info">
            You are about to update {selectedUserIds.length} user balance(s). This action will be logged.
          </Alert>

          {/* Operation Selection */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Operation
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setOperation('add')}
                className={`px-4 py-2 rounded-lg border-2 font-medium transition-colors ${
                  operation === 'add'
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                Add
              </button>
              <button
                type="button"
                onClick={() => setOperation('subtract')}
                className={`px-4 py-2 rounded-lg border-2 font-medium transition-colors ${
                  operation === 'subtract'
                    ? 'border-rose-500 bg-rose-50 text-rose-700'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                Subtract
              </button>
              <button
                type="button"
                onClick={() => setOperation('set')}
                className={`px-4 py-2 rounded-lg border-2 font-medium transition-colors ${
                  operation === 'set'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                }`}
              >
                Set
              </button>
            </div>
          </div>

          {/* Amount Input */}
          <Input
            label="Amount"
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
          />

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Reason <span className="text-rose-500">*</span>
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Provide a reason for this bulk adjustment..."
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Errors */}
          {(validationError || error) && (
            <Alert variant="error">
              {validationError || error}
            </Alert>
          )}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} loading={loading}>
          Update {selectedUserIds.length} Balance(s)
        </Button>
      </ModalFooter>
    </Modal>
  );
};
