import { get, patch } from '../client';
import type { ApiResponse, PaginatedApiResponse } from '../types';
import type { User } from '@types'; // instead of '@types/common.types'

export interface UserFilters {
  page?: number;
  page_size?: number;
  is_active?: boolean;
  email_verified?: boolean;
  phone_verified?: boolean;
  has_vehicle?: boolean;
  search?: string;
  ordering?: string;
}

export interface UserStats {
  overview: {
    total: number;
    active: number;
    inactive: number;
    fully_verified: number;
  };
  verification: {
    email_verified: number;
    email_unverified: number;
    phone_verified: number;
    phone_unverified: number;
  };
  vehicles: {
    with_vehicle: number;
    without_vehicle: number;
  };
  profiles: {
    complete: number;
    incomplete: number;
  };
  recent: {
    last_7_days: number;
    last_30_days: number;
  };
  generated_at: string;
}

/**
 * Get paginated list of regular users
 */
export const getUsers = async (
  filters?: UserFilters
): Promise<PaginatedApiResponse<User>> => {
  const params = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });
  }
  return get<PaginatedApiResponse<User>>(
    `/auth/admin/users/regular/?${params.toString()}`
  );
};

/**
 * Get user detail by ID
 */
export const getUserDetail = async (
  userId: string
): Promise<ApiResponse<User>> => {
  return get<ApiResponse<User>>(`/auth/admin/users/${userId}/regular/`);
};

/**
 * Update user status
 */
export const updateUserStatus = async (
  userId: string,
  isActive: boolean,
  reason?: string
): Promise<ApiResponse<User>> => {
  return patch<ApiResponse<User>>(
    `/auth/users/${userId}/status/`,
    { is_active: isActive, reason }
  );
};

/**
 * Get user statistics
 */
export const getUserStats = async (): Promise<ApiResponse<UserStats>> => {
  return get<ApiResponse<UserStats>>('/auth/admin/stats/regular/');
};
