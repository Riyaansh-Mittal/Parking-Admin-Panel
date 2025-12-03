import type { IconName } from '@/components/atoms/Icon';

/**
 * Balance from API
 */
export interface Balance extends Record<string, unknown> {
  user_id: string;
  user_email: string;
  user_name: string;
  base_balance: string; // Decimal as string
  bonus_balance: string; // Decimal as string
  total_balance: string; // Computed: base + bonus
  last_reset: string; // ISO 8601 datetime
  created_at: string; // ISO 8601 datetime
  updated_at: string; // ISO 8601 datetime
}

/**
 * Balance Detail (with recent changes)
 */
export interface BalanceDetail extends Record<string, unknown> {
  balance: Balance;
  recent_changes: RecentChange[];
}

/**
 * Recent Change (from balance detail endpoint)
 */
export interface RecentChange extends Record<string, unknown> {
  id: number;
  user_id: string;
  user_email: string;
  reset_type: ResetType;
  previous_balance: string; // Decimal as string
  new_balance: string; // Decimal as string
  reset_amount: string; // Decimal as string (can be positive or negative)
  notes: string;
  created_at: string; // ISO 8601 datetime
}

/**
 * Reset Log (from /reset-logs/ endpoint)
 */
export interface ResetLog extends Record<string, unknown> {
  id: number;
  user: {
    user_id: string;
    user_email: string;
    user_name: string;
  };
  reset_type: ResetType;
  old_base_balance: string; // Decimal as string
  new_base_balance: string; // Decimal as string
  change_amount: string; // Decimal as string (can be negative)
  notes: string | null;
  performed_by: string | null; // Admin email or null for system
  timestamp: string; // ISO 8601 datetime
}

/**
 * Reset Type (for history/logs)
 */
export type ResetType = 
  | 'cron'      // Cron Job (automated daily reset)
  | 'admin'     // Admin Manual adjustment
  | 'referral'  // Referral Reward
  | 'purchase'; // Purchase

/**
 * Filters
 */
export interface BalanceFilters {
  search?: string;
  min_balance?: number;
  max_balance?: number;
}

export interface ResetLogFilters {
  search?: string; // Search by user email/name
  reset_type?: ResetType | '';
  start_date?: string; // ISO date
  end_date?: string; // ISO date
  performed_by?: string; // Admin email
}

/**
 * Update Requests
 */
export interface UpdateBalanceRequest {
  base_balance: string; // Amount to add/subtract/set
  operation: 'add' | 'subtract' | 'set';
  notes: string;
}

export interface BulkUpdateBalanceRequest {
  user_ids: string[];
  operation: 'add' | 'subtract' | 'set';
  base_balance: string;
  notes: string;
}

/**
 * Bulk Update Response
 */
export interface BulkUpdateResponse {
  updated_count: number;
  failed_count: number;
  errors?: Array<{
    user_id: string;
    error: string;
  }>;
}

/**
 * Helper Functions
 */
export const getResetTypeConfig = (type: ResetType): {
  label: string;
  icon: IconName;
  variant: 'success' | 'error' | 'warning' | 'info' | 'neutral';
} => {
  const configs: Record<ResetType, { 
    label: string; 
    icon: IconName; 
    variant: 'success' | 'error' | 'warning' | 'info' | 'neutral';
  }> = {
    cron: {
      label: 'Cron Job',
      icon: 'Clock',
      variant: 'info',
    },
    admin: {
      label: 'Admin Manual',
      icon: 'Edit',
      variant: 'warning',
    },
    referral: {
      label: 'Referral Reward',
      icon: 'Gift',
      variant: 'success',
    },
    purchase: {
      label: 'Purchase',
      icon: 'ShoppingCart',
      variant: 'neutral',
    },
  };
  return configs[type];
};