// ============================================
// API RESPONSE/REQUEST TYPES (from backend)
// ============================================

export interface ReferralCode {
  id: string;
  code: string;
  code_type: 'user' | 'campaign';
  status: 'active' | 'inactive' | 'expired' | 'exhausted';
  owner_email: string | null;
  owner_user_id: string | null;
  campaign_name: string | null;
  campaign_id: string | null;
  campaign_reward_for_referrer: string | null;
  campaign_reward_for_referred: string | null;
  usage_count: number;
  max_usage: number;
  usage_percentage: number;
  usage_remaining: number;
  valid_from: string;
  valid_until: string | null;
  is_expired: boolean;
  is_valid: boolean;
  days_until_expiry: number | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  [key: string]: unknown; // ✅ Index signature for Redux/DataTable
}

export interface CodeFilters {
  page?: number;
  page_size?: number;
  code_type?: string;
  status?: string;
  search?: string;
  ordering?: string;
  owner_email?: string;
  campaign_id?: string;
  campaign_name?: string;
  usage_min?: number;
  usage_max?: number;
  is_expired?: boolean;
  is_valid?: boolean;
  is_unlimited?: boolean;
  usage_available?: boolean;
}

export interface UpdateCodePayload {
  max_usage?: number;
  status?: string;
  valid_until?: string | null; // ✅ Allows null
}

// ============================================
// FEATURE-SPECIFIC TYPES
// ============================================

export type CodeStatus = 'active' | 'inactive' | 'expired' | 'exhausted' | 'archived';
export type CodeType = 'user' | 'campaign';

export interface CodeStats {
  total_codes: number;
  active_codes: number;
  inactive_codes: number;
  expired_codes: number;
  exhausted_codes: number;
  user_codes: number;
  campaign_codes: number;
  total_usage: number;
  average_usage_rate: number;
}

export interface CreateStandaloneCodePayload {
  reward_for_referrer: number;
  reward_for_referred: number;
  max_usage: number;
  description?: string;
}

export interface CreateStandaloneCodeResponse {
  code: string;
  code_id: string;
  code_type: CodeType;
  max_usage: number;
  valid_from: string;
  valid_until: string | null;
  status: CodeStatus;
}

export interface DeactivateCodePayload {
  code_id: string;
  reason?: string;
}

export interface BulkDeactivatePayload {
  code_ids: string[];
  reason?: string;
}

export interface BulkExtendValidityPayload {
  code_ids: string[];
  days: number;
}

export interface BulkIncreaseUsagePayload {
  code_ids: string[];
  additional_usage: number;
}

export interface BulkActionResponse {
  updated_count: number;
  requested_count?: number;
  days_added?: number;
  additional_usage?: number;
}
