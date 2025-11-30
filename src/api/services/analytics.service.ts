import { get } from '../client';
import type { ApiResponse } from '../types';

export interface DashboardStats {
  total_calls: number;
  connected_calls: number;
  failed_calls: number;
  total_duration: number;
  total_revenue: string;
  average_rating: number;
}

/**
 * Get dashboard statistics
 */
export const getDashboardStats = async (params?: {
  start_date?: string;
  end_date?: string;
}): Promise<ApiResponse<DashboardStats>> => {
  const queryParams = new URLSearchParams();
  if (params?.start_date) queryParams.append('start_date', params.start_date);
  if (params?.end_date) queryParams.append('end_date', params.end_date);
  
  return get<ApiResponse<DashboardStats>>(
    `/call/admin/calls/stats/summary/?${queryParams.toString()}`
  );
};

/**
 * Get referral summary
 */
export const getReferralSummary = async (params?: {
  start_date?: string;
  end_date?: string;
}): Promise<ApiResponse<unknown>> => {
  const queryParams = new URLSearchParams();
  if (params?.start_date) queryParams.append('start_date', params.start_date);
  if (params?.end_date) queryParams.append('end_date', params.end_date);
  
  return get<ApiResponse<unknown>>(
    `/referral/v1/admin/analytics/summary/?${queryParams.toString()}`
  );
};
