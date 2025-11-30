import { post } from '../client';
import type { ApiResponse } from '../types';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  admin_id: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  user_type: 'admin' | 'superuser';
  is_superuser: boolean;
  session_id: string;
  token_version: number;
  access_expires_in: number;
  refresh_expires_in: number;
}

export interface RefreshTokenRequest {
  refresh: string;
}

export interface RefreshTokenResponse {
  access: string;
  refresh: string;
  access_expires_in: number;
  refresh_expires_in: number;
  token_version: number;
}

export interface SetPasswordRequest {
  token: string;
  password: string;
}

export interface VerifyEmailRequest {
  token: string;
}

/**
 * Admin login
 */
export const login = async (
  credentials: LoginRequest
): Promise<ApiResponse<LoginResponse>> => {
  return post<ApiResponse<LoginResponse>, LoginRequest>(
    '/auth/admin/login/',
    credentials,
    { skipAuth: true }
  );
};

/**
 * Admin logout
 */
export const logout = async (
  logoutAllDevices: boolean = false
): Promise<ApiResponse<{ sessions_deactivated: number }>> => {
  return post('/auth/admin/logout/', { logout_all_devices: logoutAllDevices });
};

/**
 * Refresh access token
 */
export const refreshToken = async (
  refreshToken: string
): Promise<ApiResponse<RefreshTokenResponse>> => {
  return post<ApiResponse<RefreshTokenResponse>, RefreshTokenRequest>(
    '/auth/admin/token-refresh/',
    { refresh: refreshToken },
    { skipAuth: true }
  );
};

/**
 * Verify admin email
 */
export const verifyEmail = async (
  token: string
): Promise<ApiResponse<{ email: string; email_verified: boolean }>> => {
  return post<
    ApiResponse<{ email: string; email_verified: boolean }>,
    VerifyEmailRequest
  >('/auth/admin/verify-email/', { token }, { skipAuth: true });
};

/**
 * Set admin password after email verification
 */
export const setPassword = async (
  token: string,
  password: string
): Promise<
  ApiResponse<{ email: string; password_set: boolean; can_login: boolean }>
> => {
  return post<
    ApiResponse<{ email: string; password_set: boolean; can_login: boolean }>,
    SetPasswordRequest
  >('/auth/admin/set-password/', { token, password }, { skipAuth: true });
};
