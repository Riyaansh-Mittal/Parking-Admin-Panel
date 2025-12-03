import { get, patch, post } from '../client';
import type { ApiResponse } from '../types';
import type {
  Balance,
  BalanceDetail,
  BalanceFilters,
  UpdateBalanceRequest,
  BulkUpdateBalanceRequest,
  BulkUpdateResponse,
  ResetLog,
  ResetLogFilters,
} from '@/features/balances/types';
import type { PaginationMeta } from '@/types/pagination.types';

/**
 * Get list of user balances (returns direct array)
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
    `/platform-settings/balances/${params.toString() ? '?' + params.toString() : ''}`
  );
};

/**
 * Get balance detail for specific user with recent changes
 */
export const getBalanceDetail = async (
  userId: string
): Promise<BalanceDetail> => {
  const response = await get<ApiResponse<BalanceDetail>>(
    `/platform-settings/balances/${userId}/`
  );
  return response.data;
};

/**
 * Update user balance
 */
export const updateBalance = async (
  userId: string,
  data: UpdateBalanceRequest
): Promise<Balance> => {
  const response = await patch<ApiResponse<Balance>>(
    `/platform-settings/balances/${userId}/`,
    data
  );
  return response.data;
};

/**
 * Bulk update balances
 */
export const bulkUpdateBalances = async (
  data: BulkUpdateBalanceRequest
): Promise<BulkUpdateResponse> => {
  const response = await post<ApiResponse<BulkUpdateResponse>>(
    '/platform-settings/balances/bulk-update/',
    data
  );
  return response.data;
};

/**
 * Get reset logs (balance change history)
 */
export const getResetLogs = async (
  filters?: ResetLogFilters,
  page?: number,
  pageSize?: number
): Promise<{ data: ResetLog[]; pagination: PaginationMeta }> => {
  const params = new URLSearchParams();
  
  if (page) params.append('page', String(page));
  if (pageSize) params.append('page_size', String(pageSize));
  
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, String(value));
      }
    });
  }

  const response = await get<{
    message: string;
    data: ResetLog[];
    pagination: PaginationMeta;
    status: number;
  }>(
    `/platform-settings/reset-logs/${params.toString() ? '?' + params.toString() : ''}`
  );
  
  return {
    data: response.data,
    pagination: response.pagination,
  };
};
