import type { IconName } from '@/components/atoms/Icon';

// ============================================
// API RESPONSE TYPES
// ============================================

export interface Relationship {
  id: string;
  referrer_email: string;
  referrer_user_id: string;
  referred_email: string;
  referred_user_id: string;
  code: string;
  code_type: 'user' | 'campaign';
  campaign_name: string | null;
  campaign_id: string | null;
  status: RelationshipStatus;
  reward_for_referrer: string;
  reward_for_referred: string;
  referrer_reward_credited: boolean;
  referred_reward_credited: boolean;
  is_partially_completed: boolean;
  reward_given_at: string | null;
  days_since_creation: number;
  time_to_completion: number | null;
  created_at: string;
  updated_at: string;
  [key: string]: unknown; // Index signature for Redux/DataTable
}

export interface RelationshipDetail {
  id: string;
  referrer: {
    user_id: string;
    email: string;
  };
  referred_user: {
    user_id: string;
    email: string;
  };
  referral_code: {
    code: string;
    code_type: 'user' | 'campaign';
  };
  campaign: {
    id: string;
    name: string;
  } | null;
  status: RelationshipStatus;
  reward_for_referrer: string;
  reward_for_referred: string;
  referrer_reward_credited: boolean;
  referred_reward_credited: boolean;
  reward_given_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface PartiallyCompletedRelationship extends Record<string, unknown> {
  id: string;
  referrer_email: string;
  referred_email: string;
  status: string;
  referrer_reward_credited: boolean;
  referred_reward_credited: boolean;
  failed_reason: string | null;
  created_at: string;
}

// ============================================
// FILTERS & PARAMS
// ============================================

export interface RelationshipFilters {
  page?: number;
  page_size?: number;
  status?: string;
  search?: string;
  ordering?: string;
  referrer_email?: string;
  referred_email?: string;
  referral_code?: string;
  referrer_reward_credited?: boolean;
  referred_reward_credited?: boolean;
  is_partially_completed?: boolean;
  code_type?: string;
  created_after?: string;
  created_before?: string;
}

// ============================================
// PAYLOADS
// ============================================

export interface FixPartialRewardPayload {
  reason: string;
}

export interface ReverseReferralPayload {
  reason: string;
}

export interface FixPartialRewardResponse {
  relationship_id: string;
  referrer_credited: boolean;
  referred_credited: boolean;
  referrer_amount: number;
  referred_amount: number;
  total_credited: number;
}

export interface ReverseReferralResponse {
  status: string;
  message: string;
  referrer_deducted: number;
  referred_deducted: number;
  reversed_at: string;
}

// ============================================
// FEATURE-SPECIFIC TYPES
// ============================================

export type RelationshipStatus = 'pending' | 'completed' | 'cancelled' | 'reversed';

export interface RelationshipStats {
  total_relationships: number;
  completed: number;
  pending: number;
  cancelled: number;
  reversed: number;
  partially_completed: number;
  total_rewards_paid: string;
  average_completion_time: string;
}

export interface RelationshipStatusConfig {
  label: string;
  variant: 'success' | 'error' | 'warning' | 'info' | 'neutral';
  icon: IconName;
}

// ============================================
// HELPERS
// ============================================

export const getRelationshipStatus = (
  relationship: Relationship | RelationshipDetail
): RelationshipStatusConfig => {
  // Only status is needed, which exists on both types
  switch (relationship.status) {
    case 'completed':
      return { label: 'Completed', variant: 'success', icon: 'CheckCircle' };
    case 'pending':
      return { label: 'Pending', variant: 'warning', icon: 'Clock' };
    case 'cancelled':
      return { label: 'Cancelled', variant: 'neutral', icon: 'Ban' };
    case 'reversed':
      return { label: 'Reversed', variant: 'error', icon: 'RotateCcw' };
    default:
      return { label: 'Unknown', variant: 'neutral', icon: 'HelpCircle' };
  }
};

export const getRewardStatus = (
  relationship: Relationship
): { label: string; variant: 'success' | 'error' | 'warning' } => {
  const { referrer_reward_credited, referred_reward_credited, is_partially_completed } =
    relationship;

  if (referrer_reward_credited && referred_reward_credited) {
    return { label: 'Fully Credited', variant: 'success' };
  }

  if (is_partially_completed) {
    return { label: 'Partial Failure', variant: 'error' };
  }

  if (referrer_reward_credited || referred_reward_credited) {
    return { label: 'Partially Credited', variant: 'warning' };
  }

  return { label: 'Not Credited', variant: 'warning' };
};
