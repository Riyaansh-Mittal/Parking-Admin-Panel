import { get, post } from '../client';
import type { ApiResponse, PaginatedApiResponse } from '../types';

export interface ReferralCode {
  id: string;
  code: string;
  code_type: 'user' | 'campaign';
  status: 'active' | 'inactive' | 'expired' | 'exhausted';
  owner_email: string | null;
  campaign_name: string | null;
  usage_count: number;
  max_usage: number;
  valid_from: string;
  valid_until: string | null;
  is_expired: boolean;
  is_valid: boolean;
  created_at: string;
}

export interface CodeFilters {
  page?: number;
  page_size?: number;
  code_type?: string;
  status?: string;
  search?: string;
  ordering?: string;
}

/**
 * Get paginated list of codes
 */
export const getCodes = async (
  filters?: CodeFilters
): Promise<PaginatedApiResponse<ReferralCode>> => {
  const params = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
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
 * Deactivate single code
 */
export const deactivateCode = async (
  codeId: string,
  reason?: string
): Promise<ApiResponse<{ code_id: string; status: string }>> => {
  return post('/referral/v1/admin/codes/deactivate/', { code_id: codeId, reason });
};
