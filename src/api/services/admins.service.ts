import apiClient from '@/api/client';
import type { ApiResponse, PaginatedResponse } from '@types';

// Types
export interface AdminUser {
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  user_type: 'admin' | 'superuser';
  is_active: boolean;
  email_verified: boolean;
  password_set: boolean;
  created_at: string;
  created_by?: string;
  last_login?: string;
}

export interface AdminListItem {
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  user_type: 'admin' | 'superuser';
  is_active: boolean;
  email_verified: boolean;
  password_set: boolean;
  created_at: string;
}

export interface AdminStats {
  overview: {
    total: number;
    active: number;
    inactive: number;
    email_verified: number;
    password_set: number;
  };
  by_type: {
    admin: number;
    superuser: number;
  };
  recent: {
    last_7_days: number;
    last_30_days: number;
  };
  generated_at: string;
}

export interface AdminFilters {
  user_type?: 'admin' | 'superuser';
  is_active?: boolean;
  email_verified?: boolean;
  search?: string;
  ordering?: string;
}

export interface RegisterAdminPayload {
  email: string;
  first_name: string;
  last_name: string;
  user_type: 'admin' | 'superuser';
}

export interface UpdateAdminPayload {
  first_name?: string;
  last_name?: string;
  user_type?: 'admin' | 'superuser';
}

export interface UpdateAdminStatusPayload {
  is_active: boolean;
  reason?: string;
}

export interface ResendVerificationPayload {
  email: string;
}

class AdminsService {
  private readonly basePath = '/auth/admin';

  /**
   * List all admin users with pagination and filters
   */
  async listAdmins(params?: {
    page?: number;
    page_size?: number;
    filters?: AdminFilters;
  }): Promise<PaginatedResponse<AdminListItem>> {
    const queryParams = new URLSearchParams();

    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.page_size) queryParams.append('page_size', params.page_size.toString());

    // Apply filters
    if (params?.filters) {
      const { user_type, is_active, email_verified, search, ordering } = params.filters;

      if (user_type) queryParams.append('user_type', user_type);
      if (is_active !== undefined) queryParams.append('is_active', is_active.toString());
      if (email_verified !== undefined)
        queryParams.append('email_verified', email_verified.toString());
      if (search) queryParams.append('search', search);
      if (ordering) queryParams.append('ordering', ordering);
    }

    const response = await apiClient.get<PaginatedResponse<AdminListItem>>(
      `${this.basePath}/users/admin/?${queryParams.toString()}`
    );

    return response.data;
  }

  /**
   * Get admin user detail
   */
  async getAdminDetail(userId: string): Promise<ApiResponse<AdminUser>> {
    const response = await apiClient.get<ApiResponse<AdminUser>>(
      `${this.basePath}/users/${userId}/admin/`
    );
    return response.data;
  }

  /**
   * Get admin statistics
   */
  async getAdminStats(): Promise<ApiResponse<AdminStats>> {
    const response = await apiClient.get<ApiResponse<AdminStats>>(
      `${this.basePath}/stats/admin/`
    );
    return response.data;
  }

  /**
   * Register new admin user (superuser only)
   */
  async registerAdmin(data: RegisterAdminPayload): Promise<ApiResponse<AdminUser>> {
    const response = await apiClient.post<ApiResponse<AdminUser>>(
      `${this.basePath}/register/`,
      data
    );
    return response.data;
  }

  /**
   * Update admin user (superuser only)
   */
  async updateAdmin(userId: string, data: UpdateAdminPayload): Promise<ApiResponse<AdminUser>> {
    const response = await apiClient.patch<ApiResponse<AdminUser>>(
      `${this.basePath}/${userId}/update/`,
      data
    );
    return response.data;
  }

  /**
   * Update admin status (superuser only, cannot modify other superusers)
   */
  async updateAdminStatus(
    userId: string,
    data: UpdateAdminStatusPayload
  ): Promise<ApiResponse<AdminUser>> {
    const response = await apiClient.patch<ApiResponse<AdminUser>>(
      `${this.basePath}/${userId}/status/`,
      data
    );
    return response.data;
  }

  /**
   * Resend verification email to admin (superuser only)
   */
  async resendVerification(data: ResendVerificationPayload): Promise<ApiResponse<unknown>> {
    const response = await apiClient.post<ApiResponse<unknown>>(
      `${this.basePath}/resend-verification-email/`,
      data
    );
    return response.data;
  }
}

export const adminsService = new AdminsService();
