import { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@/components/organisms/Modal';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { Alert } from '@/components/molecules/Alert';
import { Icon } from '@/components/atoms/Icon';
import { useGenerateCodes } from '../hooks';

interface GenerateCodesDialogProps {
  campaignId: string;
  campaignName: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const GenerateCodesDialog = ({
  campaignId,
  campaignName,
  isOpen,
  onClose,
  onSuccess,
}: GenerateCodesDialogProps) => {
  const [count, setCount] = useState<string>('100');
  const { generateCodes, loading, error, result, reset } = useGenerateCodes();

  const handleGenerate = async () => {
    const numCount = parseInt(count, 10);

    if (isNaN(numCount) || numCount < 1 || numCount > 1000) {
      return;
    }

    const response = await generateCodes(campaignId, numCount);
    if (response) {
      onSuccess?.();
    }
  };

  const handleClose = () => {
    reset();
    setCount('100');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <ModalHeader onClose={handleClose}>Generate Referral Codes</ModalHeader>

      <ModalBody>
        <div className="space-y-4">
          <div className="rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-600">Campaign</p>
            <p className="mt-1 font-semibold text-slate-900">{campaignName}</p>
          </div>

          <Input
            label="Number of Codes"
            type="number"
            min={1}
            max={1000}
            value={count}
            onChange={(e) => setCount(e.target.value)}
            placeholder="Enter number of codes (1-1000)"
            error={
              count && (parseInt(count, 10) < 1 || parseInt(count, 10) > 1000)
                ? 'Must be between 1 and 1000'
                : undefined
            }
            fullWidth
          />

          {error && <Alert variant="error">{error}</Alert>}

          {result && (
            <Alert variant="success">
              <div>
                <p className="font-medium">
                  Successfully generated {result.generated_count} codes
                </p>
                <div className="mt-3">
                  <p className="text-sm font-medium text-emerald-800">
                    Sample Codes:
                  </p>
                  <div className="mt-2 space-y-1">
                    {result.sample_codes.map((code) => (
                      <p
                        key={code}
                        className="font-mono text-xs text-emerald-700"
                      >
                        {code}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </Alert>
          )}
        </div>
      </ModalBody>

      <ModalFooter>
        <Button variant="ghost" onClick={handleClose} disabled={loading}>
          {result ? 'Close' : 'Cancel'}
        </Button>
        {!result && (
          <Button
            variant="primary"
            onClick={handleGenerate}
            loading={loading}
            disabled={
              loading ||
              !count ||
              parseInt(count, 10) < 1 ||
              parseInt(count, 10) > 1000
            }
          >
            <Icon name="Plus" size="sm" />
            Generate Codes
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};
