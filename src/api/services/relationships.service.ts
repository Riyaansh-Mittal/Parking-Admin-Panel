import { get, post } from '../client';
import type { ApiResponse, PaginatedApiResponse } from '../types';
import type {
  Relationship,
  RelationshipDetail,
  PartiallyCompletedRelationship,
  RelationshipFilters,
  FixPartialRewardPayload,
  ReverseReferralPayload,
  FixPartialRewardResponse,
  ReverseReferralResponse,
} from '@/features/relationships/types';

/**
 * Get paginated list of relationships
 */
export const getRelationships = async (
  filters?: RelationshipFilters
): Promise<PaginatedApiResponse<Relationship>> => {
  const params = new URLSearchParams();

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, String(value));
      }
    });
  }

  return get<PaginatedApiResponse<Relationship>>(
    `/referral/v1/admin/relationships/?${params.toString()}`
  );
};

/**
 * Get relationship detail
 */
export const getRelationshipDetail = async (
  relationshipId: string
): Promise<ApiResponse<RelationshipDetail>> => {
  return get<ApiResponse<RelationshipDetail>>(
    `/referral/v1/admin/relationships/${relationshipId}/`
  );
};

/**
 * Get partially completed relationships (needs fixing)
 */
export const getPartiallyCompleted = async (): Promise<
  ApiResponse<PartiallyCompletedRelationship[]>
> => {
  return get<ApiResponse<PartiallyCompletedRelationship[]>>(
    '/referral/v1/admin/relationships/partially-completed/'
  );
};

/**
 * Fix partial reward (manual credit)
 */
export const fixPartialReward = async (
  relationshipId: string,
  payload: FixPartialRewardPayload
): Promise<ApiResponse<FixPartialRewardResponse>> => {
  return post<ApiResponse<FixPartialRewardResponse>>(
    `/referral/v1/admin/relationships/${relationshipId}/fix-partial-reward/`,
    payload
  );
};

/**
 * Reverse referral (clawback - superuser only)
 */
export const reverseReferral = async (
  relationshipId: string,
  payload: ReverseReferralPayload
): Promise<ApiResponse<ReverseReferralResponse>> => {
  return post<ApiResponse<ReverseReferralResponse>>(
    `/referral/v1/admin/relationships/${relationshipId}/reverse/`,
    payload
  );
};

export const relationshipsService = {
  getRelationships,
  getRelationshipDetail,
  getPartiallyCompleted,
  fixPartialReward,
  reverseReferral,
};
