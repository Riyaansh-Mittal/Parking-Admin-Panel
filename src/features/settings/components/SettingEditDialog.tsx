import { useState, useEffect, useCallback } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/organisms/Modal';
import { Button } from '@/components/atoms/Button';
import { Input } from '@/components/atoms/Input';
import { Select } from '@/components/atoms/Select';
import { Textarea } from '@/components/atoms/Textarea';
import { Alert } from '@/components/molecules/Alert';
import { Badge } from '@/components/atoms/Badge';
import { useUpdateSetting } from '../hooks';
import type { PlatformSetting } from '@api/services/settings.service';

interface SettingEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  setting: PlatformSetting | null;
  onSuccess: () => void;
}

export const SettingEditDialog = ({
  isOpen,
  onClose,
  setting,
  onSuccess,
}: SettingEditDialogProps) => {
  const [value, setValue] = useState<string>('');
  const [changeReason, setChangeReason] = useState('');
  const { updateSettingValue, loading, error, success, clearMessages } = useUpdateSetting();

  useEffect(() => {
    if (setting) {
      setValue(String(setting.value));
    }
  }, [setting]);

  const handleClose = useCallback(() => {
    setValue('');
    setChangeReason('');
    clearMessages();
    onClose();
  }, [clearMessages, onClose]);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        onSuccess();
        handleClose();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [success, onSuccess, handleClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!setting) return;

    try {
      let parsedValue: string | number | boolean = value;

      // Parse value based on setting type
      if (setting.setting_type === 'integer') {
        parsedValue = parseInt(value, 10);
      } else if (setting.setting_type === 'decimal') {
        parsedValue = parseFloat(value);
      } else if (setting.setting_type === 'boolean') {
        parsedValue = value === 'true';
      }

      await updateSettingValue(setting.key, parsedValue, changeReason);
    } catch {
      // Error is handled by the hook
    }
  };

  const renderValueInput = () => {
    if (!setting) return null;

    switch (setting.setting_type) {
      case 'boolean':
        return (
          <Select
            label="Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            options={[
              { value: 'true', label: 'Yes (True)' },
              { value: 'false', label: 'No (False)' },
            ]}
            fullWidth
            required
          />
        );

      case 'integer':
      case 'decimal':
        return (
          <Input
            type="number"
            label="Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            min={setting.min_value}
            max={setting.max_value}
            step={setting.setting_type === 'decimal' ? '0.01' : '1'}
            fullWidth
            required
          />
        );

      case 'json':
        return (
          <Textarea
            label="Value (JSON)"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={6}
            fullWidth
            required
            placeholder='{"key": "value"}'
          />
        );

      default:
        return (
          <Input
            type="text"
            label="Value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            maxLength={500}
            fullWidth
            required
          />
        );
    }
  };

  if (!setting) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size="md">
      <form onSubmit={handleSubmit}>
        <ModalHeader onClose={handleClose}>Edit Setting</ModalHeader>
        <ModalBody>
          <div className="space-y-4">
            {/* Setting Info */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <h4 className="mb-2 font-semibold text-slate-900">{setting.display_name}</h4>
              <p className="mb-3 text-sm text-slate-600">{setting.description}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="neutral" size="sm">
                  Type: {setting.setting_type}
                </Badge>
                <Badge
                  variant={setting.editable_by === 'superuser' ? 'error' : 'neutral'}
                  size="sm"
                >
                  Editable by: {setting.editable_by}
                </Badge>
                {setting.requires_restart && (
                  <Badge variant="warning" size="sm">
                    Requires Restart
                  </Badge>
                )}
              </div>
              {setting.help_text && (
                <p className="mt-2 text-xs text-slate-500">{setting.help_text}</p>
              )}
            </div>

            {/* Value Input */}
            {renderValueInput()}

            {/* Min/Max Values */}
            {(setting.min_value || setting.max_value) && (
              <p className="text-xs text-slate-500">
                Valid range: {setting.min_value || 'no min'} to{' '}
                {setting.max_value || 'no max'}
              </p>
            )}

            {/* Change Reason */}
            <Textarea
              label="Change Reason (Optional)"
              value={changeReason}
              onChange={(e) => setChangeReason(e.target.value)}
              rows={3}
              maxLength={500}
              placeholder="Describe why you're making this change..."
              fullWidth
            />

            {/* Messages */}
            {error && <Alert variant="error">{error}</Alert>}
            {success && <Alert variant="success">Setting updated successfully!</Alert>}

            {setting.requires_restart && (
              <Alert variant="warning">
                <strong>Warning:</strong> This setting requires an application restart to
                take effect.
              </Alert>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button type="button" variant="secondary" onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button type="submit" loading={loading} disabled={loading}>
            Update Setting
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
