import { get, post } from '../client';
import type { ApiResponse, PaginatedApiResponse } from '../types';
import type {
  CallListItem,
  CallEvent,
  CallFilters,
  CallEventFilters,
  CallSummaryStats,
  UserCallStats,
  CallAnalytics,
  BulkActionPayload,
  BulkActionResponse,
  ExportRequest,
  ExportTaskResponse,
  ExportNoDataResponse,
  StatsDateRange,
  CallApiResponse
} from '@/features/calls/types';

import { CallDetailApiResponse } from '@/features/calls/types/call.types'; // ← Import CallDetailApiResponse

// Re-export types for backward compatibility
export type { CallListItem as Call, CallFilters };

const BASE_PATH = '/call/admin';

/**
 * Build query string from filters object
 * Uses generic to accept any object type while maintaining type safety
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
 * Get paginated list of calls
 */
export const getCalls = async (
  filters?: CallFilters
): Promise<PaginatedApiResponse<CallApiResponse>> => {
  return get<PaginatedApiResponse<CallApiResponse>>(
    `${BASE_PATH}/calls/${buildQueryString(filters)}`
  );
};

/**
 * Get call detail
 */
export const getCallDetail = async (
  callId: string
): Promise<ApiResponse<CallDetailApiResponse>> => {  // ← Change CallDetail to CallDetailApiResponse
  return get<ApiResponse<CallDetailApiResponse>>(
    `${BASE_PATH}/calls/${callId}/`
  );
};

/**
 * Get call event logs
 */
export const getCallEvents = async (
  callId: string,
  filters?: CallEventFilters
): Promise<PaginatedApiResponse<CallEvent>> => {
  return get<PaginatedApiResponse<CallEvent>>(
    `${BASE_PATH}/calls/${callId}/events/${buildQueryString(filters)}`
  );
};

/**
 * Get call summary statistics
 */
export const getCallStats = async (
  params?: StatsDateRange
): Promise<ApiResponse<CallSummaryStats>> => {
  return get<ApiResponse<CallSummaryStats>>(
    `${BASE_PATH}/calls/stats/summary/${buildQueryString(params)}`
  );
};

/**
 * Get user call statistics
 */
export const getUserCallStats = async (params?: {
  page?: number;
  page_size?: number;
  ordering?: string;
}): Promise<PaginatedApiResponse<UserCallStats>> => {
  return get<PaginatedApiResponse<UserCallStats>>(
    `${BASE_PATH}/calls/stats/users/${buildQueryString(params)}`
  );
};

/**
 * Get admin call analytics
 */
export const getCallAnalytics = async (
  params?: StatsDateRange
): Promise<ApiResponse<CallAnalytics>> => {
  return get<ApiResponse<CallAnalytics>>(
    `${BASE_PATH}/analytics/${buildQueryString(params)}`
  );
};

/**
 * Perform bulk action on calls
 */
export const bulkAction = async (
  payload: BulkActionPayload
): Promise<ApiResponse<BulkActionResponse>> => {
  return post<ApiResponse<BulkActionResponse>>(
    `${BASE_PATH}/calls/bulk-action/`,
    payload
  );
};

/**
 * Start call data export
 */
export const startExport = async (
  payload: ExportRequest
): Promise<ApiResponse<ExportTaskResponse | ExportNoDataResponse> | Blob> => {
  const response = await post<ApiResponse<ExportTaskResponse | ExportNoDataResponse> | Blob>(
    `${BASE_PATH}/calls/export/`,
    payload
  );
  return response;
};

/**
 * Download export file or check status
 */
export const downloadExport = async (
  taskId: string
): Promise<ApiResponse<ExportTaskResponse> | Blob> => {
  return get<ApiResponse<ExportTaskResponse> | Blob>(
    `${BASE_PATH}/calls/exports/${taskId}/download/`
  );
};

// Default export for backward compatibility
export default {
  getCalls,
  getCallDetail,
  getCallEvents,
  getCallStats,
  getUserCallStats,
  getCallAnalytics,
  bulkAction,
  startExport,
  downloadExport,
};
