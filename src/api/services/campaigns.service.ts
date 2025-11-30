import { get, post, patch } from '../client';
import type { ApiResponse, PaginatedApiResponse } from '../types';

export interface Campaign {
  id: string;
  name: string;
  description: string;
  reward_for_referrer: string;
  reward_for_referred: string;
  codes_generated: number;
  codes_redeemed: number;
  valid_from: string;
  valid_until: string;
  is_expired: boolean;
  is_active: boolean;
  created_by_email: string;
  created_at: string;
}

export interface CampaignFilters {
  page?: number;
  page_size?: number;
  is_active?: boolean;
  search?: string;
  ordering?: string;
}

export interface CreateCampaignRequest {
  name: string;
  description: string;
  reward_for_referrer: number;
  reward_for_referred: number;
  valid_from: string;
  valid_until: string;
}

/**
 * Get paginated list of campaigns
 */
export const getCampaigns = async (
  filters?: CampaignFilters
): Promise<PaginatedApiResponse<Campaign>> => {
  const params = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });
  }
  return get<PaginatedApiResponse<Campaign>>(
    `/referral/v1/admin/campaigns/?${params.toString()}`
  );
};

/**
 * Get campaign detail
 */
export const getCampaignDetail = async (
  campaignId: string
): Promise<ApiResponse<Campaign>> => {
  return get<ApiResponse<Campaign>>(
    `/referral/v1/admin/campaigns/${campaignId}/`
  );
};

/**
 * Create new campaign
 */
export const createCampaign = async (
  data: CreateCampaignRequest
): Promise<ApiResponse<Campaign>> => {
  return post<ApiResponse<Campaign>, CreateCampaignRequest>(
    '/referral/v1/admin/campaigns/create/',
    data
  );
};

/**
 * Update campaign
 */
export const updateCampaign = async (
  campaignId: string,
  data: Partial<CreateCampaignRequest>
): Promise<ApiResponse<Campaign>> => {
  return patch<ApiResponse<Campaign>>(
    `/referral/v1/admin/campaigns/${campaignId}/`,
    data
  );
};

/**
 * Generate codes for campaign
 */
export const generateCampaignCodes = async (
  campaignId: string,
  count: number
): Promise<ApiResponse<{ generated_count: number; sample_codes: string[] }>> => {
  return post(
    `/referral/v1/admin/campaigns/${campaignId}/generate-codes/`,
    { count }
  );
};
