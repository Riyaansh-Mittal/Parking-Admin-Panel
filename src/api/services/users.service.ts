import apiClient from '@/api/client';
import type {
  PaginatedUsersResponse,
  UserDetailResponse,
  UserStatsResponse,
  UpdateUserPayload,
  UpdateUserStatusPayload,
  UserFilters,
  ExportUsersPayload,
  ExportTask,
} from '@/features/users/types';
import type { ApiResponse } from '@/types/api.types';

const USERS_BASE = '/auth/admin/users';
const EXPORTS_BASE = '/auth/admin/exports';

export const usersService = {
  // List regular users with filters and pagination
  async listUsers(params: {
    page?: number;
    page_size?: number;
    filters?: UserFilters;
  }): Promise<PaginatedUsersResponse> {
    const { page = 1, page_size = 20, filters = {} } = params;
    
    const queryParams = new URLSearchParams({
      page: page.toString(),
      page_size: page_size.toString(),
      ...Object.entries(filters).reduce((acc, [key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          acc[key] = String(value);
        }
        return acc;
      }, {} as Record<string, string>),
    });

    const response = await apiClient.get<ApiResponse<PaginatedUsersResponse>>(
      `${USERS_BASE}/regular/?${queryParams}`
    );

    return response.data.data || response.data;
  },

  // Get user detail
  async getUserDetail(userId: string): Promise<UserDetailResponse> {
    const response = await apiClient.get<UserDetailResponse>(
      `${USERS_BASE}/${userId}/regular/`
    );
    return response.data;
  },

  // Get user statistics
  async getUserStats(): Promise<UserStatsResponse> {
    const response = await apiClient.get<UserStatsResponse>('/auth/admin/stats/regular/');
    return response.data;
  },

  // Update user
  async updateUser(userId: string, data: UpdateUserPayload): Promise<UserDetailResponse> {
    const response = await apiClient.patch<UserDetailResponse>(
      `/auth/users/${userId}/update/`,
      data
    );
    return response.data;
  },

  // Update user status
  async updateUserStatus(
    userId: string,
    data: UpdateUserStatusPayload
  ): Promise<UserDetailResponse> {
    const response = await apiClient.patch<UserDetailResponse>(
      `/auth/users/${userId}/status/`,
      data
    );
    return response.data;
  },

  // Start export
  async startExport(payload: ExportUsersPayload): Promise<ExportTask> {
    const response = await apiClient.post<ApiResponse<ExportTask>>(
      '/auth/admin/export/',
      payload
    );
    return response.data.data;
  },

  // Check export status
  async checkExportStatus(taskId: string): Promise<ExportTask> {
    const response = await apiClient.get<ApiResponse<ExportTask>>(
      `${EXPORTS_BASE}/${taskId}/status/`
    );
    return response.data.data;
  },

  // Download export
  async downloadExport(taskId: string): Promise<Blob> {
    const response = await apiClient.get(`${EXPORTS_BASE}/${taskId}/download/`, {
      responseType: 'blob',
    });
    return response.data;
  },
};
