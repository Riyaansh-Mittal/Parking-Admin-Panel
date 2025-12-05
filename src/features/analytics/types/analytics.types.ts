// ============================================================================
// CALL ANALYTICS TYPES
// ============================================================================


export interface CallSummaryStats {
  total_calls: number;
  connected_calls: number;
  failed_calls: number;
  total_duration: number;
  total_balance_used: string; // Changed from total_revenue
  average_rating: number;
  time_period: {
    today: {
      count: number;
      duration: number;
      balance_used: string; // Changed from revenue
    };
    this_week: {
      count: number;
      duration: number;
      balance_used: string; // Changed from revenue
    };
    this_month: {
      count: number;
      duration: number;
      balance_used: string; // Changed from revenue
    };
  };
  timeframe: string;
}

export interface UserCallStats {
  user_id: string;
  email: string;
  full_name: string;
  total_outgoing: number;
  total_incoming: number;
  total_calls: number;
  total_duration: number;
  total_spent: string; // This means balance spent (number of calls)
  average_rating: number;
}

export interface TopUser {
  inviter__email: string;
  inviter__user_id: string;
  call_count: number;
  total_duration: number;
  total_cost: string; // Balance consumed
}

export interface CallAnalyticsOverview {
  overview: {
    total_calls: number;
    connected_calls: number;
    total_duration: number;
    total_balance_used: string; // Changed from total_revenue
    average_rating: number;
  };
  top_users: TopUser[];
}

// ============================================================================
// REFERRAL ANALYTICS TYPES
// ============================================================================

// Backend API Response Interface (optional, for reference)
export interface ReferralSummaryResponse {
  referrals: {
    total_referrals: number;
    completed_referrals: number;
    pending_referrals: number;
    partially_completed: number;
    cancelled_referrals: number;
    expired_referrals: number;
    disputed_referrals: number;
    reversed_referrals: number;
    total_bonus_referrer: number;
    total_bonus_referred: number;
    total_bonus_paid: number;
  };
  campaigns: {
    total_campaigns: number;
    active_campaigns: number;
    inactive_campaigns: number;
    expired_campaigns: number;
  };
  codes: {
    total_codes: number;
    active_codes: number;
    inactive_codes: number;
    expired_codes: number;
    exhausted_codes: number;
    archived_codes: number;
    user_codes: number;
    campaign_codes: number;
    standalone_codes: number;
  };
  timeframe: string;
}

// Update ReferralSummary to match backend structure
export interface ReferralSummary {
  referrals: {
    total_referrals: number;
    completed_referrals: number;
    pending_referrals: number;
    partially_completed: number;
    cancelled_referrals: number;
    expired_referrals: number;
    disputed_referrals: number;
    reversed_referrals: number;
    total_bonus_referrer: number;
    total_bonus_referred: number;
    total_bonus_paid: number;
  };
  campaigns: {
    total_campaigns: number;
    active_campaigns: number;
    inactive_campaigns: number;
    expired_campaigns: number;
  };
  codes: {
    total_codes: number;
    active_codes: number;
    inactive_codes: number;
    expired_codes: number;
    exhausted_codes: number;
    archived_codes: number;
    user_codes: number;
    campaign_codes: number;
    standalone_codes: number;
  };
  timeframe: string;
}

export interface TopReferrer {
  user_id: string;
  email: string;
  referrals_completed: number;
  total_bonus_earned: number;
  last_referral_date: string;
  referral_code: string;
}

export interface ConversionStats {
  total_registrations: number;
  completed: number;
  pending: number;
  conversion_rate: string;
  avg_time_to_complete: string;
  timeframe: string;
}

// Backend API Response Interface
export interface CampaignPerformanceResponse {
  campaign_id: string;
  name: string;
  description: string;
  codes_generated: number;
  codes_active: number;
  codes_redeemed: number;
  redemption_rate: string;
  reward_for_referrer: number;
  reward_for_referred: number;
  total_rewards_paid: number;
  is_active: boolean;
  is_expired: boolean;
  valid_from: string;
  valid_until: string;
  created_at: string;
}

export interface CampaignPerformance {
  campaign_id: string;
  campaign_name: string;
  description: string;
  codes_generated: number;
  codes_active: number;
  codes_redeemed: number;
  redemption_rate: string;
  reward_for_referrer: number;
  reward_for_referred: number;
  total_rewards_paid: number;
  is_active: boolean;
  is_expired: boolean;
  valid_from: string;
  valid_until: string;
  created_at: string;
}

export interface StatusBreakdown {
  status_breakdown: {
    pending: number;
    completed: number;
    partially_completed: number;
    cancelled: number;
    reversed: number;
    total: number;
  };
  reward_breakdown: {
    fully_credited: number;
    referrer_only: number;
    referred_only: number;
    neither_credited: number;
    needs_admin_attention: number;
  };
  timeframe: string;
}

// ============================================================================
// DASHBOARD TYPES
// ============================================================================

export interface DashboardStats {
  total_users: number;
  active_users: number;
  total_calls: number;
  total_balance_used: number; // Changed from total_revenue
  calls_growth: number;
  users_growth: number;
  avg_call_duration: number;
  total_referrals: number;
}

// ============================================================================
// FILTER TYPES
// ============================================================================

export interface DateRange {
  start_date?: string;
  end_date?: string;
}

export interface AnalyticsFilters extends DateRange {
  page?: number;
  page_size?: number;
  ordering?: string;
}

export interface ReferralAnalyticsFilters extends DateRange {
  campaign_id?: string;
  limit?: number;
}
