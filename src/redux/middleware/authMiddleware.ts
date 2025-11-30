import { Middleware } from '@reduxjs/toolkit';
import { clearAuth } from '../slices/authSlice';

/**
 * Auth middleware - Handle authentication events
 */
export const authMiddleware: Middleware = (store) => {
  // Listen for logout events from API interceptor
  window.addEventListener('auth:logout', () => {
    store.dispatch(clearAuth());
    window.location.href = '/login';
  });

  // Listen for unauthorized events
  window.addEventListener('auth:unauthorized', () => {
    // Could show a toast notification here
    console.warn('Unauthorized access attempt');
  });

  return (next) => (action) => {
    return next(action);
  };
};
