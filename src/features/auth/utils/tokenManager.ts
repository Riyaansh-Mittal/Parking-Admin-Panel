import { storage } from '@utils/storageHelper';
import { STORAGE_KEYS } from '@utils/constants';

/**
 * Token manager for handling JWT tokens
 */
export const tokenManager = {
  /**
   * Get access token
   */
  getAccessToken: (): string | null => {
    return storage.get<string>(STORAGE_KEYS.ACCESS_TOKEN);
  },

  /**
   * Get refresh token
   */
  getRefreshToken: (): string | null => {
    return storage.get<string>(STORAGE_KEYS.REFRESH_TOKEN);
  },

  /**
   * Set tokens
   */
  setTokens: (accessToken: string, refreshToken: string): void => {
    storage.set(STORAGE_KEYS.ACCESS_TOKEN, accessToken);
    storage.set(STORAGE_KEYS.REFRESH_TOKEN, refreshToken);
  },

  /**
   * Clear tokens
   */
  clearTokens: (): void => {
    storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
    storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
    storage.remove(STORAGE_KEYS.USER_INFO);
  },

  /**
   * Check if token is expired
   */
  isTokenExpired: (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000; // Convert to milliseconds
      return Date.now() >= expiry;
    } catch {
      // ✅ Removed unused error variable
      return true;
    }
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    const token = tokenManager.getAccessToken();
    if (!token) return false;
    return !tokenManager.isTokenExpired(token);
  },

  /**
   * Decode JWT token
   */
  decodeToken: <T = Record<string, unknown>>(token: string): T | null => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload as T;
    } catch {
      // ✅ Removed unused error variable
      return null;
    }
  },
};
