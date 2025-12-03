import { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/organisms/Modal';
import { Button } from '@/components/atoms/Button';
import { Alert } from '@/components/molecules/Alert';
import { Icon } from '@/components/atoms/Icon';
import { Checkbox } from '@/components/atoms/Checkbox';
import { useInitializeSettings } from '../hooks';
import type { InitializeSettingsResponse } from '../types';

interface InitializeSettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const InitializeSettingsDialog = ({
  isOpen,
  onClose,
  onSuccess,
}: InitializeSettingsDialogProps) => {
  const [force, setForce] = useState(false);
  const [result, setResult] = useState<InitializeSettingsResponse | null>(null);
  const { initializeSettings, loading, error, clearMessages } = useInitializeSettings();

  useEffect(() => {
    if (!isOpen) {
      setForce(false);
      setResult(null);
      clearMessages();
    }
  }, [isOpen, clearMessages]);

  const handleInitialize = async () => {
    try {
      const response = await initializeSettings(force);
      setResult(response);
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 2000);
    } catch {
      // Error is handled by the hook
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalHeader onClose={onClose}>Initialize Default Settings</ModalHeader>
      <ModalBody>
        <div className="space-y-4">
          {/* Warning */}
          <Alert variant="warning">
            <div className="flex items-start gap-2">
              <Icon name="AlertTriangle" size="sm" className="mt-0.5" />
              <div>
                <strong>Superuser Operation</strong>
                <p className="mt-1 text-sm">
                  This operation will create default platform settings. If settings already
                  exist, they will be skipped unless force mode is enabled.
                </p>
              </div>
            </div>
          </Alert>

          {/* Force Option */}
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <label className="flex items-start gap-3">
              <Checkbox checked={force} onChange={(e) => setForce(e.target.checked)} />
              <div>
                <span className="font-medium text-slate-900">Force Update</span>
                <p className="text-sm text-slate-600">
                  Update existing settings to default values (use with caution)
                </p>
              </div>
            </label>
          </div>

          {/* Results */}
          {result && (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
              <div className="mb-3 flex items-center gap-2 text-emerald-900">
                <Icon name="CheckCircle" size="sm" />
                <h4 className="font-semibold">{result.message}</h4>
              </div>

              <div className="space-y-2 text-sm text-emerald-800">
                <div className="flex justify-between">
                  <span>Created:</span>
                  <strong>{result.data.created}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Existing:</span>
                  <strong>{result.data.existing}</strong>
                </div>
                {result.data.updated !== undefined && (
                  <div className="flex justify-between">
                    <span>Updated:</span>
                    <strong>{result.data.updated}</strong>
                  </div>
                )}
                <div className="flex justify-between border-t border-emerald-200 pt-2">
                  <span>Total:</span>
                  <strong>{result.data.total}</strong>
                </div>
              </div>

              {result.data.settings.length > 0 && (
                <div className="mt-3">
                  <p className="mb-1 text-sm font-semibold text-emerald-900">
                    Settings processed:
                  </p>
                  <div className="max-h-32 overflow-y-auto rounded bg-white p-2">
                    <ul className="space-y-1 text-xs text-slate-700">
                      {result.data.settings.map((setting) => (
                        <li key={setting}>• {setting}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Error */}
          {error && <Alert variant="error">{error}</Alert>}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          {result ? 'Close' : 'Cancel'}
        </Button>
        {!result && (
          <Button onClick={handleInitialize} loading={loading} disabled={loading}>
            Initialize Settings
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};
