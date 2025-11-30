import { useCallback } from 'react';
import { useAppDispatch } from '@redux/hooks';
import {
  addNotification,
  removeNotification,
} from '@redux/slices/notificationSlice';

export interface ToastOptions {
  title: string;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export interface UseToastReturn {
  showToast: (options: ToastOptions) => void;
  showSuccess: (title: string, message: string) => void;
  showError: (title: string, message: string) => void;
  showWarning: (title: string, message: string) => void;
  showInfo: (title: string, message: string) => void;
  dismissToast: (id: string) => void;
}

export function useToast(): UseToastReturn {
  const dispatch = useAppDispatch();

  const showToast = useCallback(
    ({ title, message, type = 'info', duration = 5000 }: ToastOptions) => {
      dispatch(
        addNotification({
          title,
          message,
          type,
          duration,
        })
      );
    },
    [dispatch]
  );

  const showSuccess = useCallback(
    (title: string, message: string) => {
      showToast({ title, message, type: 'success' });
    },
    [showToast]
  );

  const showError = useCallback(
    (title: string, message: string) => {
      showToast({ title, message, type: 'error' });
    },
    [showToast]
  );

  const showWarning = useCallback(
    (title: string, message: string) => {
      showToast({ title, message, type: 'warning' });
    },
    [showToast]
  );

  const showInfo = useCallback(
    (title: string, message: string) => {
      showToast({ title, message, type: 'info' });
    },
    [showToast]
  );

  const dismissToast = useCallback(
    (id: string) => {
      dispatch(removeNotification(id));
    },
    [dispatch]
  );

  return {
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    dismissToast,
  };
}
