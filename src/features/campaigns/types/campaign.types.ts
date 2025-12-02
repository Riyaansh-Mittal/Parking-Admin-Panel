import type { IconName } from '@/components/atoms/Icon';

/**
 * Campaign list item
 */
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

/**
 * Campaign detail (extended)
 */
export interface CampaignDetail extends Campaign {
  updated_at: string;
}

/**
 * Campaign filters
 */
export interface CampaignFilters {
  page?: number;
  page_size?: number;
  is_active?: boolean;
  search?: string;
  ordering?: string;
  reward_for_referrer_min?: number;
  reward_for_referrer_max?: number;
  reward_for_referred_min?: number;
  reward_for_referred_max?: number;
  created_after?: string;
  created_before?: string;
  is_expired?: boolean;
  is_current?: boolean;
}

/**
 * Create campaign payload
 */
export interface CreateCampaignPayload {
  name: string;
  description: string;
  reward_for_referrer: number;
  reward_for_referred: number;
  valid_from: string;
  valid_until: string;
}

/**
 * Update campaign payload
 */
export interface UpdateCampaignPayload {
  name?: string;
  description?: string;
  reward_for_referrer?: number;
  reward_for_referred?: number;
  is_active?: boolean;
}

/**
 * Deactivate campaign payload
 */
export interface DeactivateCampaignPayload {
  reason?: string;
}

/**
 * Deactivate campaign response
 */
export interface DeactivateCampaignResponse {
  campaign_id: string;
  campaign_name: string;
  is_active: boolean;
  codes_deactivated: number;
}

/**
 * Generate codes payload
 */
export interface GenerateCodesPayload {
  count: number;
}

/**
 * Generate codes response
 */
export interface GenerateCodesResponse {
  generated_count: number;
  campaign_id: string;
  sample_codes: string[];
}

/**
 * Campaign performance
 */
export interface CampaignPerformance {
  campaign_id: string;
  campaign_name: string;
  codes_generated: number;
  codes_used: number;
  usage_rate: string;
  total_referrals: number;
  completed_referrals: number;
  conversion_rate: string;
  total_bonus_paid: string;
  roi: string;
}

/**
 * Campaign stats for cards
 */
export interface CampaignStats {
  total_campaigns: number;
  active_campaigns: number;
  inactive_campaigns: number;
  total_codes: number;
  codes_redeemed: number;
  total_rewards: string;
}

/**
 * Campaign wizard form data
 */
export interface CampaignWizardData {
  // Step 1: Details
  name: string;
  description: string;
  valid_from: string;
  valid_until: string;
  // Step 2: Rewards
  reward_for_referrer: number;
  reward_for_referred: number;
  initial_code_count?: number;
}

/**
 * Campaign status badge config
 */
export interface CampaignStatusConfig {
  label: string;
  variant: 'success' | 'error' | 'warning' | 'info' | 'neutral';
  icon: IconName;
}

/**
 * Campaign status helpers
 */
export const getCampaignStatus = (campaign: Campaign): CampaignStatusConfig => {
  if (!campaign.is_active) {
    return { label: 'Inactive', variant: 'neutral', icon: 'Ban' };
  }
  if (campaign.is_expired) {
    return { label: 'Expired', variant: 'error', icon: 'Clock' };
  }
  return { label: 'Active', variant: 'success', icon: 'CheckCircle' };
};

/**
 * Campaign date helpers
 */
export const isCampaignUpcoming = (campaign: Campaign): boolean => {
  return new Date(campaign.valid_from) > new Date();
};

export const isCampaignCurrent = (campaign: Campaign): boolean => {
  const now = new Date();
  return (
    new Date(campaign.valid_from) <= now &&
    new Date(campaign.valid_until) >= now &&
    campaign.is_active
  );
};

export const getCampaignUsagePercentage = (campaign: Campaign): number => {
  if (campaign.codes_generated === 0) return 0;
  return (campaign.codes_redeemed / campaign.codes_generated) * 100;
};
