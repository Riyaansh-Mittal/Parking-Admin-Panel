import type { PlatformSetting } from '@api/services/settings.service';

// Re-export for convenience
export type { PlatformSetting };

export type SettingCategory =
  | 'call_management'
  | 'system'
  | 'billing'
  | 'security'
  | 'notifications';

export type SettingType = 'string' | 'integer' | 'decimal' | 'boolean' | 'json';

export interface SettingFilters {
  page?: number;
  page_size?: number;
  category?: SettingCategory;
  setting_type?: SettingType;
  editable_by?: 'admin' | 'superuser';
  group?: string;
  search?: string;
  ordering?: string;
}

export interface UpdateSettingRequest {
  value: string | number | boolean;
  change_reason?: string;
}

export interface ExecuteCronRequest {
  dry_run?: boolean;
  force?: boolean;
}

export interface ExecuteCronResponse {
  message: string;
  data: {
    users_affected: number;
    total_base_balance_added?: string;
    total_base_balance_to_add?: string;
    setting_value: string;
    execution_time: string;
    next_scheduled_run?: string;
    dry_run: boolean;
    preview?: Array<{
      user_id: string;
      user_email: string;
      current_base: string;
      new_base: string;
    }>;
  };
}

export interface InitializeSettingsRequest {
  force?: boolean;
}

export interface InitializeSettingsResponse {
  message: string;
  data: {
    created: number;
    existing: number;
    updated?: number;
    total: number;
    settings: string[];
  };
}

export interface SettingsByCategoryMap {
  [key: string]: PlatformSetting[];
}
