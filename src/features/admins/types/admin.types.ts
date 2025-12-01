// Re-export from service for consistency
export type {
  AdminUser,
  AdminListItem,
  AdminStats,
  AdminFilters,
  RegisterAdminPayload,
  UpdateAdminPayload,
  UpdateAdminStatusPayload,
  ResendVerificationPayload,
} from '@/api/services/admins.service';

// Additional UI-specific types
export interface AdminFormData {
  email: string;
  first_name: string;
  last_name: string;
  user_type: 'admin' | 'superuser';
}

export interface AdminFormErrors {
  email?: string;
  first_name?: string;
  last_name?: string;
  user_type?: string;
}
