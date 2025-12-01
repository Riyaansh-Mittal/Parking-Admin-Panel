import { useState, useCallback } from 'react';
import * as callsService from '@/api/services/calls.service';
import type { BulkActionPayload, BulkActionResponse, CallState } from '@/features/calls/types';

interface UseBulkCallActionsReturn {
  selectedCallIds: string[];
  loading: boolean;
  error: string | null;
  success: string | null;
  selectCall: (callId: string) => void;
  deselectCall: (callId: string) => void;
  selectAllCalls: (callIds: string[]) => void;
  clearSelection: () => void;
  isSelected: (callId: string) => boolean;
  deleteSelected: () => Promise<BulkActionResponse | null>;
  updateStatusSelected: (status: CallState) => Promise<BulkActionResponse | null>;
  clearMessages: () => void;
}

export const useBulkCallActions = (
  onSuccess?: () => void
): UseBulkCallActionsReturn => {
  const [selectedCallIds, setSelectedCallIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const selectCall = useCallback((callId: string) => {
    setSelectedCallIds((prev) => {
      if (prev.includes(callId)) return prev;
      return [...prev, callId];
    });
  }, []);

  const deselectCall = useCallback((callId: string) => {
    setSelectedCallIds((prev) => prev.filter((id) => id !== callId));
  }, []);

  const selectAllCalls = useCallback((callIds: string[]) => {
    setSelectedCallIds(callIds);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedCallIds([]);
  }, []);

  const isSelected = useCallback(
    (callId: string) => selectedCallIds.includes(callId),
    [selectedCallIds]
  );

  const executeBulkAction = useCallback(
    async (payload: BulkActionPayload): Promise<BulkActionResponse | null> => {
      if (selectedCallIds.length === 0) {
        setError('No calls selected');
        return null;
      }

      setLoading(true);
      setError(null);
      setSuccess(null);

      try {
        const response = await callsService.bulkAction({
          ...payload,
          call_ids: selectedCallIds,
        });

        const count = response.data.deleted_count ?? response.data.updated_count ?? 0;
        setSuccess(
          payload.action === 'delete'
            ? `Successfully deleted ${count} call(s)`
            : `Successfully updated ${count} call(s)`
        );

        clearSelection();
        onSuccess?.();

        return response.data;
      } catch (err) {
        const errorMessage =
          err && typeof err === 'object' && 'message' in err
            ? (err as { message: string }).message
            : 'Bulk action failed';
        setError(errorMessage);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [selectedCallIds, clearSelection, onSuccess]
  );

  const deleteSelected = useCallback(async () => {
    return executeBulkAction({ action: 'delete', call_ids: selectedCallIds });
  }, [executeBulkAction, selectedCallIds]);

  const updateStatusSelected = useCallback(
    async (status: CallState) => {
      return executeBulkAction({
        action: 'update_status',
        call_ids: selectedCallIds,
        status,
      });
    },
    [executeBulkAction, selectedCallIds]
  );

  const clearMessages = useCallback(() => {
    setError(null);
    setSuccess(null);
  }, []);

  return {
    selectedCallIds,
    loading,
    error,
    success,
    selectCall,
    deselectCall,
    selectAllCalls,
    clearSelection,
    isSelected,
    deleteSelected,
    updateStatusSelected,
    clearMessages,
  };
};
