import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { addNotification } from '../slices/notificationSlice';

/**
 * Error middleware - Handle rejected actions globally
 */
export const errorMiddleware: Middleware = (store) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const errorMessage =
      (action.payload as string) || 'An unexpected error occurred';

    // Don't show toast for login errors (handled in form)
    if (!action.type.startsWith('auth/login')) {
      store.dispatch(
        addNotification({
          type: 'error',
          title: 'Error',
          message: errorMessage,
          duration: 5000,
        })
      );
    }

    // Log error in development
    if (import.meta.env.VITE_ENV === 'development') {
      console.error('[Error Middleware]', {
        action: action.type,
        error: errorMessage,
      });
    }
  }

  return next(action);
};
