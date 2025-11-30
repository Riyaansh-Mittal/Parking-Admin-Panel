import type { ApiError } from '../types/api.types';

/**
 * Extract error message from API error response
 */
export const getErrorMessage = (error: unknown): string => {
  if (!error) return 'An unknown error occurred';
  
  // Handle API error format
  if (typeof error === 'object' && error !== null && 'error' in error) {
    const apiError = error as ApiError;
    return apiError.error.message || 'An error occurred';
  }
  
  // Handle Axios error
  if (typeof error === 'object' && error !== null && 'response' in error) {
    const axiosError = error as { response?: { data?: { error?: { message?: string } } } };
    return axiosError.response?.data?.error?.message || 'Network error occurred';
  }
  
  // Handle Error instance
  if (error instanceof Error) {
    return error.message;
  }
  
  // Handle string error
  if (typeof error === 'string') {
    return error;
  }
  
  return 'An unexpected error occurred';
};

/**
 * Check if error is authentication error
 */
export const isAuthError = (error: unknown): boolean => {
  if (typeof error === 'object' && error !== null) {
    const apiError = error as ApiError;
    return (
      apiError.error?.status_code === 401 ||
      apiError.error?.code === 'authentication_error' ||
      apiError.error?.code === 'token_expired' ||
      apiError.error?.code === 'token_invalid'
    );
  }
  return false;
};

/**
 * Check if error is authorization error
 */
export const isAuthorizationError = (error: unknown): boolean => {
  if (typeof error === 'object' && error !== null) {
    const apiError = error as ApiError;
    return (
      apiError.error?.status_code === 403 ||
      apiError.error?.code === 'authorization_error' ||
      apiError.error?.code === 'permission_denied'
    );
  }
  return false;
};

/**
 * Check if error is network error
 */
export const isNetworkError = (error: unknown): boolean => {
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const message = (error as Error).message.toLowerCase();
    return (
      message.includes('network') ||
      message.includes('timeout') ||
      message.includes('connection')
    );
  }
  return false;
};

/**
 * Log error to console (development only)
 */
export const logError = (context: string, error: unknown): void => {
  if (import.meta.env.VITE_ENV === 'development') {
    console.error(`[${context}]`, error);
  }
};
