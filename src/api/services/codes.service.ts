import { get, post, patch } from '../client';
import type { ApiResponse, PaginatedApiResponse } from '../types';
import type {
  ReferralCode,
  CodeFilters,
  UpdateCodePayload,
  CreateStandaloneCodePayload,
  CreateStandaloneCodeResponse,
  BulkDeactivatePayload,
  BulkExtendValidityPayload,
  BulkIncreaseUsagePayload,
  BulkActionResponse,
  CodeStats,
} from '@/features/codes/types';


/**
 * Get paginated list of codes
 */
export const getCodes = async (
  filters?: CodeFilters
): Promise<PaginatedApiResponse<ReferralCode>> => {
  const params = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, String(value));
      }
    });
  }
  return get<PaginatedApiResponse<ReferralCode>>(
    `/referral/v1/admin/codes/?${params.toString()}`
  );
};

/**
 * Get code detail
 */
export const getCodeDetail = async (
  codeId: string
): Promise<ApiResponse<ReferralCode>> => {
  return get<ApiResponse<ReferralCode>>(`/referral/v1/admin/codes/${codeId}/`);
};

/**
 * Update code
 */
export const updateCode = async (
  codeId: string,
  payload: UpdateCodePayload
): Promise<ApiResponse<ReferralCode>> => {
  return patch<ApiResponse<ReferralCode>>(
    `/referral/v1/admin/codes/${codeId}/`,
    payload
  );
};

/**
 * Create standalone code
 */
export const createStandaloneCode = async (
  payload: CreateStandaloneCodePayload
): Promise<ApiResponse<CreateStandaloneCodeResponse>> => {
  return post<ApiResponse<CreateStandaloneCodeResponse>>(
    '/referral/v1/admin/codes/create-standalone/',
    payload
  );
};

/**
 * Deactivate single code
 */
export const deactivateCode = async (
  codeId: string,
  reason?: string
): Promise<ApiResponse<{ code_id: string; code: string; status: string }>> => {
  return post('/referral/v1/admin/codes/deactivate/', { code_id: codeId, reason });
};

/**
 * Bulk deactivate codes
 */
export const bulkDeactivateCodes = async (
  payload: BulkDeactivatePayload
): Promise<ApiResponse<BulkActionResponse>> => {
  return post<ApiResponse<BulkActionResponse>>(
    '/referral/v1/admin/codes/bulk/deactivate/',
    payload
  );
};

/**
 * Bulk extend code validity
 */
export const bulkExtendValidity = async (
  payload: BulkExtendValidityPayload
): Promise<ApiResponse<BulkActionResponse>> => {
  return post<ApiResponse<BulkActionResponse>>(
    '/referral/v1/admin/codes/bulk/extend-validity/',
    payload
  );
};

/**
 * Bulk increase usage limit
 */
export const bulkIncreaseUsage = async (
  payload: BulkIncreaseUsagePayload
): Promise<ApiResponse<BulkActionResponse>> => {
  return post<ApiResponse<BulkActionResponse>>(
    '/referral/v1/admin/codes/bulk/increase-usage/',
    payload
  );
};

/**
 * Get code statistics
 */
export const getCodeStats = async (): Promise<ApiResponse<CodeStats>> => {
  return get<ApiResponse<CodeStats>>('/referral/v1/admin/analytics/summary/');
};

export const codesService = {
  getCodes,
  getCodeDetail,
  updateCode,
  createStandaloneCode,
  deactivateCode,
  bulkDeactivateCodes,
  bulkExtendValidity,
  bulkIncreaseUsage,
  getCodeStats,
};
