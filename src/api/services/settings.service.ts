import { get, patch } from '../client';
import type { ApiResponse, PaginatedApiResponse } from '../types';

export interface PlatformSetting {
  key: string;
  display_name: string;
  description: string;
  category: string;
  setting_type: 'string' | 'integer' | 'decimal' | 'boolean' | 'json';
  value: string | number | boolean;
  min_value?: string;
  max_value?: string;
  editable_by: 'admin' | 'superuser';
  visible_in_ui: boolean;
  requires_restart: boolean;
  group: string;
  sort_order: number;
  help_text?: string;
  created_at: string;
  updated_at: string;
  [key: string]: unknown;
}

export interface SettingFilters {
  page?: number;
  page_size?: number;
  category?: string;
  setting_type?: string;
  search?: string;
  ordering?: string;
}

/**
 * Get paginated list of settings
 */
export const getSettings = async (
  filters?: SettingFilters
): Promise<PaginatedApiResponse<PlatformSetting>> => {
  const params = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });
  }

  return get<PaginatedApiResponse<PlatformSetting>>(
    `/platform-settings/settings/?${params.toString()}`
  );
};

/**
 * Get setting detail
 */
export const getSettingDetail = async (
  key: string
): Promise<ApiResponse<PlatformSetting>> => {
  return get<ApiResponse<PlatformSetting>>(
    `/platform-settings/settings/${key}/`
  );
};

/**
 * Update setting value
 */
export const updateSetting = async (
  key: string,
  value: string | number | boolean,
  changeReason?: string
): Promise<ApiResponse<PlatformSetting>> => {
  return patch<ApiResponse<PlatformSetting>>(
    `/platform-settings/settings/${key}/`,
    { value, change_reason: changeReason }
  );
};
