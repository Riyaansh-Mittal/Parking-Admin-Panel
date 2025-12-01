import { BaseEntity } from '@/types/common.types';

// Base User Interface
export interface User extends BaseEntity {
  user_id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  phone_number: string | null;
  phone_verified: boolean;
  email_verified: boolean;
  license_plate_number: string | null;
  vehicle_type: string | null;
  vehicle_model: string | null;
  is_active: boolean;
  created_at: string;
  profile_status: {
    is_complete: boolean;
    can_scan_qr: boolean;
    has_vehicle: boolean;
  };
}

// User List Item (simplified for table)
export interface UserListItem extends Record<string, unknown> {
  user_id: string;
  user_name: string;
  full_name: string;
  email: string;
  phone_number: string | null;
  is_active: boolean;
  email_verified: boolean;
  phone_verified: boolean;
  has_vehicle: boolean;
  license_plate: string | null;
  created_at: string;
}

// User Filters
export interface UserFilters {
  is_active?: boolean;
  email_verified?: boolean;
  phone_verified?: boolean;
  has_vehicle?: boolean;
  search?: string;
  ordering?: string;
}

// User Statistics
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

// Update User Payload
export interface UpdateUserPayload {
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  license_plate_number?: string;
  vehicle_type?: string;
  vehicle_model?: string;
}

// Update User Status Payload
export interface UpdateUserStatusPayload {
  is_active: boolean;
  reason?: string;
}

// Pagination metadata
export interface PaginationMeta {
  count: number;
  next: string | null;
  previous: string | null;
  current_page: number;
  total_pages: number;
  page_size: number;
}

// ✅ FIXED: Paginated Users Response matches API structure
export interface PaginatedUsersResponse {
  message: string;
  pagination: PaginationMeta;
  data: UserListItem[];
  status: number;
}

// User Detail Response (from API)
export interface UserDetailResponse {
  message: string;
  data: User;
}

// User Stats Response (from API)
export interface UserStatsResponse {
  message: string;
  data: UserStats;
}

// Export Task
export interface ExportTask {
  task_id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  state: string;
  file_ready: boolean;
  message: string;
  download_url?: string;
  file_size_bytes?: number;
  expires_at?: string;
}

// Export Request Payload
export interface ExportUsersPayload {
  export_type: 'regular';
  format: 'csv' | 'xlsx';
  filters: UserFilters;
  limit?: number;
  offset?: number;
}
