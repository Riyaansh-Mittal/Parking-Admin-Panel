export interface BaseEntity {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface User extends BaseEntity {
  user_id: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  is_active: boolean;
  email_verified: boolean;
}

export interface Admin extends BaseEntity {
  admin_id: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  user_type: 'admin' | 'superuser';
  is_active: boolean;
  email_verified: boolean;
}

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: string;
  direction: SortDirection;
}

export interface FilterOption {
  label: string;
  value: string | number | boolean;
}

export interface SelectOption {
  label: string;
  value: string | number;
}

export type Status = 'active' | 'inactive' | 'pending' | 'suspended';

export interface DateRange {
  start_date: string;
  end_date: string;
}
