import { useState } from 'react';
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
import { useCreateStandaloneCode } from '../hooks';
import type { CreateStandaloneCodePayload } from '../types';

interface CreateStandaloneCodeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const CreateStandaloneCodeDialog = ({
  isOpen,
  onClose,
  onSuccess,
}: CreateStandaloneCodeDialogProps) => {
  const { create, loading, error } = useCreateStandaloneCode();
  const [formData, setFormData] = useState<CreateStandaloneCodePayload>({
    reward_for_referrer: 100,
    reward_for_referred: 50,
    max_usage: 50,
    description: '',
  });
  const [createdCode, setCreatedCode] = useState<string | null>(null);

  const handleChange = (
    field: keyof CreateStandaloneCodePayload,
    value: string | number
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await create(formData);

    if (result.success && result.data) {
      setCreatedCode(result.data.code);
    }
  };

  const handleClose = () => {
    setFormData({
      reward_for_referrer: 100,
      reward_for_referred: 50,
      max_usage: 50,
      description: '',
    });
    setCreatedCode(null);
    onClose();
    if (createdCode) {
      onSuccess();
    }
  };

  const handleCopyCode = () => {
    if (createdCode) {
      navigator.clipboard.writeText(createdCode);
      // Add toast notification here
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <form onSubmit={handleSubmit}>
        <ModalHeader onClose={handleClose}>Create Standalone Code</ModalHeader>
        <ModalBody>
          {error && <Alert variant="error">{error}</Alert>}

          {createdCode ? (
            <div className="space-y-4">
              <Alert variant="success">Code created successfully!</Alert>
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="mb-2 text-sm font-medium text-slate-700">
                  Generated Code
                </p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 rounded bg-white px-3 py-2 font-mono text-lg font-bold text-slate-900">
                    {createdCode}
                  </code>
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={handleCopyCode}
                    leftIcon={<Icon name="Copy" size="sm" />}
                  >
                    Copy
                  </Button>
                </div>
              </div>
              <p className="text-sm text-slate-600">
                This code can now be used for referrals. Make sure to save it
                somewhere safe.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Reward for Referrer *
                </label>
                <Input
                  type="number"
                  min={0}
                  step={0.01}
                  value={formData.reward_for_referrer}
                  onChange={(e) =>
                    handleChange(
                      'reward_for_referrer',
                      parseFloat(e.target.value)
                    )
                  }
                  placeholder="100.00"
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Reward for Referred User *
                </label>
                <Input
                  type="number"
                  min={0}
                  step={0.01}
                  value={formData.reward_for_referred}
                  onChange={(e) =>
                    handleChange(
                      'reward_for_referred',
                      parseFloat(e.target.value)
                    )
                  }
                  placeholder="50.00"
                  required
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Maximum Usage *
                </label>
                <Input
                  type="number"
                  min={1}
                  value={formData.max_usage}
                  onChange={(e) =>
                    handleChange('max_usage', parseInt(e.target.value))
                  }
                  placeholder="50"
                  required
                />
                <p className="mt-1 text-xs text-slate-500">
                  Number of times this code can be used
                </p>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">
                  Description (Optional)
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder="Add a note about this code..."
                  rows={3}
                  className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          )}
        </ModalBody>
        <ModalFooter>
          {createdCode ? (
            <Button variant="primary" onClick={handleClose}>
              Done
            </Button>
          ) : (
            <div className="flex gap-3">
              <Button
                variant="secondary"
                onClick={handleClose}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" loading={loading}>
                Generate Code
              </Button>
            </div>
          )}
        </ModalFooter>
      </form>
    </Modal>
  );
};

CreateStandaloneCodeDialog.displayName = 'CreateStandaloneCodeDialog';
