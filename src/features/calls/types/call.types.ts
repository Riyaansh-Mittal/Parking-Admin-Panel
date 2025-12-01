import type { IconName } from '@/components/atoms/Icon';

/**
 * Badge variant type (matching Badge component)
 */
export type BadgeVariant = 'success' | 'error' | 'warning' | 'info' | 'neutral';

/**
 * Call participant info (inviter/invitee)
 */
export interface CallParticipant {
  user_id: string;
  email: string;
  full_name: string;
}

/**
 * Call state enum
 */
export type CallState =
  | 'ringing'
  | 'accepted'
  | 'rejected'
  | 'busy'
  | 'canceled'
  | 'missed'
  | 'ended'
  | 'failed';

/**
 * Call type enum
 */
export type CallType = 'audio' | 'video';

/**
 * Deduction status enum
 */
export type DeductionStatus = 'pending' | 'completed' | 'failed' | 'not_applicable';

/**
 * Call list item (from list endpoint)
 */
export interface CallListItem {
  call_id: string;
  inviter: CallParticipant;
  invitee: CallParticipant;
  call_type: CallType;
  state: CallState;
  initiated_at: string;
  ended_at: string | null;
  duration: number;
  was_connected: boolean;
  call_cost: string;
  deduction_status: DeductionStatus;
  call_quality_rating: number | null;
  created_at: string;
}

/**
 * Call detail (from detail endpoint)
 */
export interface CallDetail extends CallListItem {
  deducted_from_base: string;
  deducted_from_bonus: string;
  inviter_rating: number | null;
  invitee_rating: number | null;
  inviter_feedback: string | null;
  invitee_feedback: string | null;
  updated_at: string;
}

/**
 * Call event triggered by user
 */
export interface CallEventTriggeredBy {
  user_id: string;
  email: string;
}

/**
 * Call event item
 */
export interface CallEvent {
  id: string;
  call_id: string;
  event_type: string;
  event_data: Record<string, unknown>;
  timestamp: string;
  triggered_by: CallEventTriggeredBy | null;
  ip_address: string | null;
}

/**
 * Time period stats
 */
export interface TimePeriodStats {
  count: number;
  duration: number;
  revenue: string;
}

/**
 * Call summary statistics
 */
export interface CallSummaryStats {
  total_calls: number;
  connected_calls: number;
  failed_calls: number;
  total_duration: number;
  total_revenue: string;
  average_rating: number | null;
  time_period: {
    today: TimePeriodStats;
    this_week: TimePeriodStats;
    this_month: TimePeriodStats;
  };
  timeframe: string;
}

/**
 * User call stats item
 */
export interface UserCallStats {
  user_id: string;
  email: string;
  full_name: string;
  total_outgoing: number;
  total_incoming: number;
  total_calls: number;
  total_duration: number;
  total_spent: string;
  average_rating: number | null;
}

/**
 * Admin analytics data
 */
export interface CallAnalytics {
  overview: {
    total_calls: number;
    connected_calls: number;
    total_duration: number;
    total_revenue: string;
    average_rating: number | null;
  };
  top_users: Array<{
    inviter__email: string;
    inviter__user_id: string;
    call_count: number;
    total_duration: number;
    total_cost: string;
  }>;
}

/**
 * Call filters for list endpoint
 */
export interface CallFilters {
  page?: number;
  page_size?: number;
  search?: string;
  ordering?: string;
  state?: CallState;
  call_type?: CallType;
  deduction_status?: DeductionStatus;
  was_connected?: boolean;
  inviter_user_id?: string;
  inviter_email?: string;
  invitee_user_id?: string;
  invitee_email?: string;
  min_duration?: number;
  max_duration?: number;
  initiated_after?: string;
  initiated_before?: string;
}

/**
 * Call event filters
 */
export interface CallEventFilters {
  page?: number;
  page_size?: number;
  ordering?: string;
  event_type?: string;
}

/**
 * Bulk action types
 */
export type BulkActionType = 'delete' | 'update_status';

/**
 * Bulk action payload
 */
export interface BulkActionPayload {
  action: BulkActionType;
  call_ids: string[];
  status?: CallState;
}

/**
 * Bulk action response
 */
export interface BulkActionResponse {
  deleted_count?: number;
  updated_count?: number;
}

/**
 * Export type
 */
export type ExportType = 'calls' | 'events';

/**
 * Export filters for calls
 */
export interface CallExportFilters {
  state?: CallState;
  call_type?: CallType;
  deduction_status?: DeductionStatus;
  from_date?: string;
  to_date?: string;
  inviter_user_id?: string;
  invitee_user_id?: string;
  min_duration?: number;
  max_duration?: number;
}

/**
 * Export filters for events
 */
export interface EventExportFilters {
  call_id?: string;
  event_type?: string;
  from_date?: string;
  to_date?: string;
}

/**
 * Export request payload
 */
export interface ExportRequest {
  type: ExportType;
  filters?: CallExportFilters | EventExportFilters;
}

/**
 * Export task response (async)
 */
export interface ExportTaskResponse {
  task_id: string;
  status: 'processing' | 'completed' | 'failed';
  estimated_records?: number;
  estimated_completion?: string;
  download_url?: string;
  progress?: number;
  estimated_total?: number;
  check_again_in?: number;
}

/**
 * No data export response
 */
export interface ExportNoDataResponse {
  record_count: 0;
  filters_applied: Record<string, unknown>;
  suggestions: string[];
}

/**
 * Stats date range params
 */
export interface StatsDateRange {
  start_date?: string;
  end_date?: string;
}

/**
 * Call state display config
 */
export interface CallStateConfig {
  label: string;
  variant: BadgeVariant;
  icon: IconName;
}

/**
 * Call state display mapping
 */
export const CALL_STATE_CONFIG: Record<CallState, CallStateConfig> = {
  ringing: { label: 'Ringing', variant: 'info', icon: 'Phone' },
  accepted: { label: 'Accepted', variant: 'success', icon: 'PhoneIncoming' },
  rejected: { label: 'Rejected', variant: 'error', icon: 'PhoneOff' },
  busy: { label: 'Busy', variant: 'warning', icon: 'PhoneMissed' },
  canceled: { label: 'Canceled', variant: 'neutral', icon: 'PhoneOff' },
  missed: { label: 'Missed', variant: 'warning', icon: 'PhoneMissed' },
  ended: { label: 'Ended', variant: 'success', icon: 'PhoneOff' },
  failed: { label: 'Failed', variant: 'error', icon: 'AlertCircle' },
};

/**
 * Deduction status display config
 */
export const DEDUCTION_STATUS_CONFIG: Record<DeductionStatus, { label: string; variant: BadgeVariant }> = {
  pending: { label: 'Pending', variant: 'warning' },
  completed: { label: 'Completed', variant: 'success' },
  failed: { label: 'Failed', variant: 'error' },
  not_applicable: { label: 'N/A', variant: 'neutral' },
};
