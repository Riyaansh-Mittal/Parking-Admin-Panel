import { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/organisms/Modal';
import { Button } from '@/components/atoms/Button';
import { Alert } from '@/components/molecules/Alert';
import { Badge } from '@/components/atoms/Badge';
import { Icon } from '@/components/atoms/Icon';
import { Checkbox } from '@/components/atoms/Checkbox';
import { formatNumber } from '@/utils/formatters';
import { useExecuteCron } from '../hooks';
import type { ExecuteCronResponse } from '../types';

interface ExecuteCronDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const ExecuteCronDialog = ({ isOpen, onClose, onSuccess }: ExecuteCronDialogProps) => {
  const [dryRun, setDryRun] = useState(true);
  const [force, setForce] = useState(false);
  const [result, setResult] = useState<ExecuteCronResponse | null>(null);
  const { executeCron, loading, error, clearMessages } = useExecuteCron();

  useEffect(() => {
    if (!isOpen) {
      setDryRun(true);
      setForce(false);
      setResult(null);
      clearMessages();
    }
  }, [isOpen, clearMessages]);

  const handleExecute = async () => {
    try {
      const response = await executeCron({ dry_run: dryRun, force });
      setResult(response);
      if (!dryRun) {
        setTimeout(() => {
          onSuccess();
          onClose();
        }, 2000);
      }
    } catch {
      // Error is handled by the hook
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <ModalHeader onClose={onClose}>Execute Balance Reset Cron</ModalHeader>
      <ModalBody>
        <div className="space-y-4">
          {/* Warning */}
          <Alert variant="warning">
            <div className="flex items-start gap-2">
              <Icon name="AlertTriangle" size="sm" className="mt-0.5" />
              <div>
                <strong>Superuser Operation</strong>
                <p className="mt-1 text-sm">
                  This operation will reset user balances according to the platform settings.
                  Use dry run mode to preview changes first.
                </p>
              </div>
            </div>
          </Alert>

          {/* Options */}
          <div className="space-y-3 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <label className="flex items-start gap-3">
              <Checkbox checked={dryRun} onChange={(e) => setDryRun(e.target.checked)} />
              <div>
                <span className="font-medium text-slate-900">Dry Run Mode</span>
                <p className="text-sm text-slate-600">
                  Preview changes without applying them
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3">
              <Checkbox
                checked={force}
                onChange={(e) => setForce(e.target.checked)}
                disabled={dryRun}
              />
              <div>
                <span className="font-medium text-slate-900">Force Execution</span>
                <p className="text-sm text-slate-600">
                  Run even if recently executed (use with caution)
                </p>
              </div>
            </label>
          </div>

          {/* Results */}
          {result && (
            <div className="rounded-lg border border-slate-200 bg-white p-4">
              <h4 className="mb-3 flex items-center gap-2 font-semibold text-slate-900">
                <Icon name={result.data.dry_run ? 'Eye' : 'CheckCircle'} size="sm" />
                {result.data.dry_run ? 'Preview Results' : 'Execution Complete'}
              </h4>

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-sm text-slate-600">Users Affected</p>
                  <p className="text-2xl font-bold text-slate-900">
                    {formatNumber(result.data.users_affected)}
                  </p>
                </div>

                <div className="rounded-lg bg-slate-50 p-3">
                  <p className="text-sm text-slate-600">
                    {result.data.dry_run ? 'Balance to Add' : 'Balance Added'}
                  </p>
                  <p className="text-2xl font-bold text-emerald-600">
                    {result.data.total_base_balance_to_add ||
                      result.data.total_base_balance_added}
                  </p>
                </div>

                <div className="col-span-2 rounded-lg bg-slate-50 p-3">
                  <p className="text-sm text-slate-600">Setting Value</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {result.data.setting_value}
                  </p>
                </div>
              </div>

              {result.data.next_scheduled_run && (
                <p className="mt-3 text-sm text-slate-600">
                  Next scheduled run: <strong>{result.data.next_scheduled_run}</strong>
                </p>
              )}

              {result.data.preview && result.data.preview.length > 0 && (
                <div className="mt-4">
                  <h5 className="mb-2 text-sm font-semibold text-slate-900">
                    Preview (First 5 users):
                  </h5>
                  <div className="space-y-2">
                    {result.data.preview.slice(0, 5).map((user) => (
                      <div
                        key={user.user_id}
                        className="flex items-center justify-between rounded-lg border border-slate-200 p-2 text-sm"
                      >
                        <span className="text-slate-700">{user.user_email}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="neutral" size="sm">
                            {user.current_base}
                          </Badge>
                          <Icon name="ArrowRight" size="xs" />
                          <Badge variant="success" size="sm">
                            {user.new_base}
                          </Badge>
                        </div>
                      </div>
                    ))}
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
          {result && !result.data.dry_run ? 'Close' : 'Cancel'}
        </Button>
        {(!result || result.data.dry_run) && (
          <Button onClick={handleExecute} loading={loading} disabled={loading}>
            {dryRun ? 'Preview Changes' : 'Execute Now'}
          </Button>
        )}
      </ModalFooter>
    </Modal>
  );
};
