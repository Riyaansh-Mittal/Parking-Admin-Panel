import { get } from '../client';
import type { ApiResponse, PaginatedApiResponse } from '../types';
import type {
  CallSummaryStats,
  UserCallStats,
  CallAnalyticsOverview,
  ReferralSummary,
  TopReferrer,
  ConversionStats,
  CampaignPerformance,
  CampaignPerformanceResponse,
  StatusBreakdown,
  AnalyticsFilters,
  ReferralAnalyticsFilters,
} from '@/features/analytics/types';

// ============================================================================
// CALL ANALYTICS
// ============================================================================

/**
 * Get call summary statistics
 */
export const getCallSummary = async (
  filters?: AnalyticsFilters
): Promise<ApiResponse<CallSummaryStats>> => {
  const params = new URLSearchParams();
  if (filters?.start_date) params.append('start_date', filters.start_date);
  if (filters?.end_date) params.append('end_date', filters.end_date);

  return get<ApiResponse<CallSummaryStats>>(
    `/call/admin/calls/stats/summary/?${params.toString()}`
  );
};

/**
 * Get user call statistics with pagination
 */
export const getUserCallStats = async (
  filters?: AnalyticsFilters
): Promise<PaginatedApiResponse<UserCallStats>> => {
  const params = new URLSearchParams();
  if (filters?.page) params.append('page', String(filters.page));
  if (filters?.page_size) params.append('page_size', String(filters.page_size));
  if (filters?.ordering) params.append('ordering', filters.ordering);

  return get<PaginatedApiResponse<UserCallStats>>(
    `/call/admin/calls/stats/users/?${params.toString()}`
  );
};

/**
 * Get detailed call analytics with top users
 */
export const getCallAnalytics = async (
  filters?: AnalyticsFilters
): Promise<ApiResponse<CallAnalyticsOverview>> => {
  const params = new URLSearchParams();
  if (filters?.start_date) params.append('start_date', filters.start_date);
  if (filters?.end_date) params.append('end_date', filters.end_date);

  return get<ApiResponse<CallAnalyticsOverview>>(
    `/call/admin/analytics/?${params.toString()}`
  );
};

// ============================================================================
// REFERRAL ANALYTICS
// ============================================================================

/**
 * Get referral summary statistics
 */
export const getReferralSummary = async (
  filters?: ReferralAnalyticsFilters
): Promise<ApiResponse<ReferralSummary>> => {
  const params = new URLSearchParams();
  if (filters?.start_date) params.append('start_date', filters.start_date);
  if (filters?.end_date) params.append('end_date', filters.end_date);

  return get<ApiResponse<ReferralSummary>>(
    `/referral/v1/admin/analytics/summary/?${params.toString()}`
  );
};

/**
 * Get top referrers
 */
export const getTopReferrers = async (
  filters?: ReferralAnalyticsFilters
): Promise<ApiResponse<TopReferrer[]>> => {
  const params = new URLSearchParams();
  if (filters?.limit) params.append('limit', String(filters.limit));
  if (filters?.start_date) params.append('start_date', filters.start_date);
  if (filters?.end_date) params.append('end_date', filters.end_date);

  return get<ApiResponse<TopReferrer[]>>(
    `/referral/v1/admin/analytics/top-referrers/?${params.toString()}`
  );
};

/**
 * Get conversion statistics
 */
export const getConversionStats = async (
  filters?: ReferralAnalyticsFilters
): Promise<ApiResponse<ConversionStats>> => {
  const params = new URLSearchParams();
  if (filters?.start_date) params.append('start_date', filters.start_date);
  if (filters?.end_date) params.append('end_date', filters.end_date);

  return get<ApiResponse<ConversionStats>>(
    `/referral/v1/admin/analytics/conversion/?${params.toString()}`
  );
};

/**
 * Get campaign performance metrics
 */
export const getCampaignPerformance = async (
  filters?: ReferralAnalyticsFilters
): Promise<ApiResponse<CampaignPerformance[]>> => {
  const params = new URLSearchParams();
  if (filters?.campaign_id) params.append('campaign_id', filters.campaign_id);
  if (filters?.start_date) params.append('start_date', filters.start_date);
  if (filters?.end_date) params.append('end_date', filters.end_date);

  const response = await get<ApiResponse<CampaignPerformanceResponse[]>>(
    `/referral/v1/admin/analytics/campaigns/?${params.toString()}`
  );

  // Transform backend response to match frontend interface
  const transformedData: CampaignPerformance[] = response.data.map(campaign => ({
    campaign_id: campaign.campaign_id,
    campaign_name: campaign.name,
    description: campaign.description,
    codes_generated: campaign.codes_generated,
    codes_active: campaign.codes_active,
    codes_redeemed: campaign.codes_redeemed,
    redemption_rate: campaign.redemption_rate,
    reward_for_referrer: campaign.reward_for_referrer,
    reward_for_referred: campaign.reward_for_referred,
    total_rewards_paid: campaign.total_rewards_paid,
    is_active: campaign.is_active,
    is_expired: campaign.is_expired,
    valid_from: campaign.valid_from,
    valid_until: campaign.valid_until,
    created_at: campaign.created_at,
  }));

  return {
    ...response,
    data: transformedData,
  };
};


/**
 * Get relationship status breakdown
 */
export const getStatusBreakdown = async (
  filters?: ReferralAnalyticsFilters
): Promise<ApiResponse<StatusBreakdown>> => {
  const params = new URLSearchParams();
  if (filters?.start_date) params.append('start_date', filters.start_date);
  if (filters?.end_date) params.append('end_date', filters.end_date);

  return get<ApiResponse<StatusBreakdown>>(
    `/referral/v1/admin/analytics/status-breakdown/?${params.toString()}`
  );
};
