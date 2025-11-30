import { get, patch, post } from '../client';
import type { ApiResponse } from '../types';

export interface Balance {
  user_id: string;
  user_name: string;
  user_email: string;
  base_balance: string;
  bonus_balance: string;
  total_balance: string;
  last_reset: string;
  created_at: string;
  updated_at: string;
}

export interface BalanceFilters {
  search?: string;
  min_balance?: number;
  max_balance?: number;
  ordering?: string;
}

/**
 * Get list of user balances
 */
export const getBalances = async (
  filters?: BalanceFilters
): Promise<Balance[]> => {
  const params = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });
  }
  return get<Balance[]>(
    `/platform-settings/balances/?${params.toString()}`
  );
};

/**
 * Get balance detail for specific user
 */
export const getBalanceDetail = async (
  userId: string
): Promise<ApiResponse<{ balance: Balance; recent_changes: unknown[] }>> => {
  return get<ApiResponse<{ balance: Balance; recent_changes: unknown[] }>>(
    `/platform-settings/balances/${userId}/`
  );
};

/**
 * Update user balance
 */
export const updateBalance = async (
  userId: string,
  data: {
    base_balance?: string;
    operation: 'add' | 'subtract' | 'set';
    notes?: string;
  }
): Promise<ApiResponse<Balance>> => {
  return patch<ApiResponse<Balance>>(
    `/platform-settings/balances/${userId}/`,
    data
  );
};

/**
 * Bulk update balances
 */
export const bulkUpdateBalances = async (data: {
  user_ids: string[];
  operation: 'add' | 'subtract' | 'set';
  base_balance?: string;
  notes?: string;
}): Promise<ApiResponse<{ total: number; success: number; failed: number }>> => {
  return post('/platform-settings/balances/bulk-update/', data);
};
