import { get } from '../client';
import type { ApiResponse, PaginatedApiResponse } from '../types';

export interface Relationship {
  id: string;
  referrer_email: string;
  referred_email: string;
  code: string;
  status: 'pending' | 'completed' | 'cancelled';
  reward_for_referrer: string;
  reward_for_referred: string;
  created_at: string;
}

export interface RelationshipFilters {
  page?: number;
  page_size?: number;
  status?: string;
  search?: string;
  ordering?: string;
}

/**
 * Get paginated list of relationships
 */
export const getRelationships = async (
  filters?: RelationshipFilters
): Promise<PaginatedApiResponse<Relationship>> => {
  const params = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
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
): Promise<ApiResponse<Relationship>> => {
  return get<ApiResponse<Relationship>>(
    `/referral/v1/admin/relationships/${relationshipId}/`
  );
};
