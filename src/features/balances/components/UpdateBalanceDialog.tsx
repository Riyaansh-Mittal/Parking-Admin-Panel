import { useState } from 'react';
import { Modal } from '@/components/organisms/Modal';
import { ModalHeader } from '@/components/organisms/Modal';
import { ModalBody } from '@/components/organisms/Modal';
import { ModalFooter } from '@/components/organisms/Modal';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Badge } from '@/components/atoms/Badge';
import { Alert } from '@/components/molecules/Alert';
import { formatCurrency } from '@/utils/formatters';
import type { Balance, UpdateBalanceRequest } from '@/features/balances/types';

interface UpdateBalanceDialogProps {
  isOpen: boolean;
  balance: Balance | null;
  onClose: () => void;
  onUpdate: (data: UpdateBalanceRequest) => Promise<void>;
  loading?: boolean;
  error?: string | null;
}

export const UpdateBalanceDialog = ({
  isOpen,
  balance,
  onClose,
  onUpdate,
  loading = false,
  error = null,
}: UpdateBalanceDialogProps) => {
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
      setValidationError('Please provide a reason for this adjustment');
      return;
    }

    setValidationError('');

    try {
      await onUpdate({
        base_balance: amount,
        operation,
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

  if (!balance) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <ModalHeader onClose={handleClose}><span>Update Balance</span></ModalHeader>
      <ModalBody>
        <div className="space-y-4">
          {/* Current Balance Info */}
          <div className="bg-slate-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Current Balance</span>
              <Badge variant="info" size="sm">
                {balance.user_email}
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-3">
              <div>
                <span className="text-xs text-slate-500">Total</span>
                <p className="text-lg font-bold text-slate-900">
                  {formatCurrency(parseFloat(balance.total_balance))}
                </p>
              </div>
              <div>
                <span className="text-xs text-slate-500">Base</span>
                <p className="text-lg font-bold text-slate-900">
                  {formatCurrency(parseFloat(balance.base_balance))}
                </p>
              </div>
              <div>
                <span className="text-xs text-slate-500">Bonus</span>
                <p className="text-lg font-bold text-emerald-600">
                  {formatCurrency(parseFloat(balance.bonus_balance))}
                </p>
              </div>
            </div>
          </div>

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
              placeholder="Provide a reason for this adjustment..."
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
          Update Balance
        </Button>
      </ModalFooter>
    </Modal>
  );
};
