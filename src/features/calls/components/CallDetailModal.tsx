import { Badge } from '@/components/atoms/Badge';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { formatDateTime, formatDuration } from '@/utils/formatters';
import { CallRatingDisplay } from './CallRatingDisplay';
import { CALL_STATE_CONFIG, DEDUCTION_STATUS_CONFIG } from '../types/call.types';
import type { CallDetail, CallState, DeductionStatus } from '../types';

interface CallDetailModalProps {
  call: CallDetail;
  onClose: () => void;
  onViewEvents?: () => void;
}

export const CallDetailModal = ({ call, onClose, onViewEvents }: CallDetailModalProps) => {
  const stateConfig = CALL_STATE_CONFIG[call.state as CallState];
  const deductionConfig = DEDUCTION_STATUS_CONFIG[call.deduction_status as DeductionStatus];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Call Details</h2>
            <p className="mt-1 font-mono text-xs text-slate-500">{call.call_id}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size="md" />
          </Button>
        </div>

        {/* Content */}
        <div className="space-y-6 p-6">
          {/* Status Badges */}
          <div className="flex flex-wrap gap-2">
            <Badge variant="info">
              <Icon name={call.call_type === 'video' ? 'Video' : 'Phone'} size="sm" />
              {call.call_type === 'video' ? 'Video Call' : 'Audio Call'}
            </Badge>
            <Badge variant={stateConfig.variant}>
              <Icon name={stateConfig.icon} size="sm" />
              {stateConfig.label}
            </Badge>
            <Badge variant={call.was_connected ? 'success' : 'neutral'}>
              {call.was_connected ? 'Connected' : 'Not Connected'}
            </Badge>
          </div>

          {/* Participants */}
          <div className="grid grid-cols-2 gap-6">
            <div className="rounded-lg bg-slate-50 p-4">
              <h3 className="mb-2 text-sm font-semibold text-slate-500">Inviter (Caller)</h3>
              <p className="font-medium text-slate-900">{call.inviter.full_name}</p>
              <p className="text-sm text-slate-600">{call.inviter.email}</p>
              {call.inviter_rating && (
                <div className="mt-2">
                  <CallRatingDisplay rating={call.inviter_rating} label="Rating" />
                </div>
              )}
              {call.inviter_feedback && (
                <p className="mt-2 text-sm italic text-slate-600">"{call.inviter_feedback}"</p>
              )}
            </div>

            <div className="rounded-lg bg-slate-50 p-4">
              <h3 className="mb-2 text-sm font-semibold text-slate-500">Invitee (Receiver)</h3>
              <p className="font-medium text-slate-900">{call.invitee.full_name}</p>
              <p className="text-sm text-slate-600">{call.invitee.email}</p>
              {call.invitee_rating && (
                <div className="mt-2">
                  <CallRatingDisplay rating={call.invitee_rating} label="Rating" />
                </div>
              )}
              {call.invitee_feedback && (
                <p className="mt-2 text-sm italic text-slate-600">"{call.invitee_feedback}"</p>
              )}
            </div>
          </div>

          {/* Call Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-slate-500">Initiated At</p>
              <p className="font-medium text-slate-900">{formatDateTime(call.initiated_at)}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Ended At</p>
              <p className="font-medium text-slate-900">
                {call.ended_at ? formatDateTime(call.ended_at) : '-'}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Duration</p>
              <p className="font-medium text-slate-900">
                {call.duration > 0 ? formatDuration(call.duration) : '-'}
              </p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Quality Rating</p>
              <div className="font-medium text-slate-900">
                {call.call_quality_rating ? (
                  <CallRatingDisplay rating={call.call_quality_rating} size="sm" />
                ) : (
                  '-'
                )}
              </div>
            </div>
          </div>

          {/* Billing Info */}
          <div className="rounded-lg border border-slate-200 p-4">
            <h3 className="mb-3 font-semibold text-slate-900">Billing Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-500">Total Cost</p>
                <p className="text-lg font-bold text-slate-900">{call.call_cost}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">Deduction Status</p>
                <Badge variant={deductionConfig.variant}>{deductionConfig.label}</Badge>
              </div>
              <div>
                <p className="text-sm text-slate-500">From Base Balance</p>
                <p className="font-medium text-slate-900">{call.deducted_from_base}</p>
              </div>
              <div>
                <p className="text-sm text-slate-500">From Bonus Balance</p>
                <p className="font-medium text-slate-900">{call.deducted_from_bonus}</p>
              </div>
            </div>
          </div>

          {/* Timestamps */}
          <div className="text-xs text-slate-500">
            <p>Created: {formatDateTime(call.created_at)}</p>
            <p>Updated: {formatDateTime(call.updated_at)}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
          {onViewEvents && (
            <Button variant="secondary" onClick={onViewEvents}>
              <Icon name="List" size="sm" />
              View Events
            </Button>
          )}
          <Button variant="primary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
