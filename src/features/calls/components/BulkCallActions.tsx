import { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Alert } from '@/components/molecules/Alert';
import type { CallState } from '../types';

interface BulkCallActionsProps {
  selectedCount: number;
  loading: boolean;
  error: string | null;
  success: string | null;
  onDelete: () => void;
  onUpdateStatus: (status: CallState) => void;
  onClearSelection: () => void;
  onClearMessages: () => void;
}

export const BulkCallActions = ({
  selectedCount,
  loading,
  error,
  success,
  onDelete,
  onUpdateStatus,
  onClearSelection,
  onClearMessages,
}: BulkCallActionsProps) => {
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (selectedCount === 0) {
    return null;
  }

  const handleDelete = () => {
    if (confirmDelete) {
      onDelete();
      setConfirmDelete(false);
    } else {
      setConfirmDelete(true);
    }
  };

  return (
    <div className="rounded-lg border border-indigo-200 bg-indigo-50 p-4">
      {/* Messages */}
      {error && (
        <Alert variant="error" onClose={onClearMessages} className="mb-4">
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" onClose={onClearMessages} className="mb-4">
          {success}
        </Alert>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Icon name="CheckSquare" size="md" className="text-indigo-600" />
          <span className="font-medium text-indigo-900">
            {selectedCount} call{selectedCount !== 1 ? 's' : ''} selected
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Update Status */}
          <div className="relative">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setShowStatusMenu(!showStatusMenu)}
              disabled={loading}
            >
              <Icon name="RefreshCw" size="sm" />
              Update Status
            </Button>
            {showStatusMenu && (
              <div className="absolute right-0 top-full z-10 mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-lg">
                <div className="p-2">
                  {(['ended', 'failed', 'canceled'] as CallState[]).map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        onUpdateStatus(status);
                        setShowStatusMenu(false);
                      }}
                      className="block w-full rounded px-3 py-2 text-left text-sm capitalize hover:bg-slate-50"
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Delete */}
          <Button
            variant={confirmDelete ? 'primary' : 'secondary'}
            size="sm"
            onClick={handleDelete}
            disabled={loading}
            className={confirmDelete ? 'bg-red-600 hover:bg-red-700' : ''}
          >
            <Icon name="Trash2" size="sm" />
            {confirmDelete ? 'Confirm Delete' : 'Delete'}
          </Button>

          {confirmDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setConfirmDelete(false)}
              disabled={loading}
            >
              Cancel
            </Button>
          )}

          {/* Clear Selection */}
          <Button variant="ghost" size="sm" onClick={onClearSelection} disabled={loading}>
            <Icon name="X" size="sm" />
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};
