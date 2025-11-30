import { get } from '../client';
import type { ApiResponse, PaginatedApiResponse } from '../types';

export interface Call {
  call_id: string;
  inviter: {
    user_id: string;
    email: string;
    full_name: string;
  };
  invitee: {
    user_id: string;
    email: string;
    full_name: string;
  };
  call_type: 'audio' | 'video';
  state: string;
  initiated_at: string;
  ended_at: string | null;
  duration: number;
  was_connected: boolean;
  call_cost: string;
  deduction_status: string;
  call_quality_rating: number | null;
  created_at: string;
}

export interface CallFilters {
  page?: number;
  page_size?: number;
  search?: string;
  ordering?: string;
  state?: string;
  call_type?: string;
  deduction_status?: string;
  was_connected?: boolean;
  min_duration?: number;
  max_duration?: number;
  initiated_after?: string;
  initiated_before?: string;
}

/**
 * Get paginated list of calls
 */
export const getCalls = async (
  filters?: CallFilters
): Promise<PaginatedApiResponse<Call>> => {
  const params = new URLSearchParams();
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.append(key, String(value));
      }
    });
  }
  return get<PaginatedApiResponse<Call>>(
    `/call/admin/calls/?${params.toString()}`
  );
};

/**
 * Get call detail
 */
export const getCallDetail = async (
  callId: string
): Promise<ApiResponse<Call>> => {
  return get<ApiResponse<Call>>(`/call/admin/calls/${callId}/`);
};

/**
 * Get call summary statistics
 */
export const getCallStats = async (params?: {
  start_date?: string;
  end_date?: string;
}): Promise<ApiResponse<unknown>> => {
  const queryParams = new URLSearchParams();
  if (params?.start_date) queryParams.append('start_date', params.start_date);
  if (params?.end_date) queryParams.append('end_date', params.end_date);
  
  return get<ApiResponse<unknown>>(
    `/call/admin/calls/stats/summary/?${queryParams.toString()}`
  );
};
