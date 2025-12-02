import { get, post, patch } from '../client';
import type { ApiResponse, PaginatedApiResponse } from '../types';
import type {
  Campaign,
  CampaignDetail,
  CampaignFilters,
  CreateCampaignPayload,
  UpdateCampaignPayload,
  DeactivateCampaignPayload,
  DeactivateCampaignResponse,
  GenerateCodesPayload,
  GenerateCodesResponse,
  CampaignPerformance,
} from '@/features/campaigns/types';

const BASE_PATH = '/referral/v1/admin/campaigns';

/**
 * Build query string from filters
 */
const buildQueryString = <T extends object>(filters?: T): string => {
  if (!filters) return '';

  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, String(value));
    }
  });

  const queryString = params.toString();
  return queryString ? `?${queryString}` : '';
};

/**
 * Get paginated list of campaigns
 */
export const getCampaigns = async (
  filters?: CampaignFilters
): Promise<PaginatedApiResponse<Campaign>> => {
  return get<PaginatedApiResponse<Campaign>>(
    `${BASE_PATH}/${buildQueryString(filters)}`
  );
};

/**
 * Get campaign detail
 */
export const getCampaignDetail = async (
  campaignId: string
): Promise<ApiResponse<CampaignDetail>> => {
  return get<ApiResponse<CampaignDetail>>(`${BASE_PATH}/${campaignId}/`);
};

/**
 * Create new campaign
 */
export const createCampaign = async (
  payload: CreateCampaignPayload
): Promise<ApiResponse<CampaignDetail>> => {
  return post<ApiResponse<CampaignDetail>>(`${BASE_PATH}/create/`, payload);
};

/**
 * Update campaign
 */
export const updateCampaign = async (
  campaignId: string,
  payload: UpdateCampaignPayload
): Promise<ApiResponse<CampaignDetail>> => {
  return patch<ApiResponse<CampaignDetail>>(
    `${BASE_PATH}/${campaignId}/`,
    payload
  );
};

/**
 * Deactivate campaign
 */
export const deactivateCampaign = async (
  campaignId: string,
  payload?: DeactivateCampaignPayload
): Promise<ApiResponse<DeactivateCampaignResponse>> => {
  return post<ApiResponse<DeactivateCampaignResponse>>(
    `${BASE_PATH}/${campaignId}/deactivate/`,
    payload || {}
  );
};

/**
 * Generate campaign codes
 */
export const generateCampaignCodes = async (
  campaignId: string,
  payload: GenerateCodesPayload
): Promise<ApiResponse<GenerateCodesResponse>> => {
  return post<ApiResponse<GenerateCodesResponse>>(
    `${BASE_PATH}/${campaignId}/generate-codes/`,
    payload
  );
};

/**
 * Get campaign performance
 */
export const getCampaignPerformance = async (params?: {
  campaign_id?: string;
  start_date?: string;
  end_date?: string;
}): Promise<ApiResponse<CampaignPerformance[]>> => {
  return get<ApiResponse<CampaignPerformance[]>>(
    `/referral/v1/admin/analytics/campaigns/${buildQueryString(params)}`
  );
};

// Default export
export default {
  getCampaigns,
  getCampaignDetail,
  createCampaign,
  updateCampaign,
  deactivateCampaign,
  generateCampaignCodes,
  getCampaignPerformance,
};
