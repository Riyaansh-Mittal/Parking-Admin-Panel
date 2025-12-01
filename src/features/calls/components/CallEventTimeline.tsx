import { Icon } from '@/components/atoms/Icon';
import { Badge } from '@/components/atoms/Badge';
import { formatDateTime } from '@/utils/formatters';
import type { IconName } from '@/components/atoms/Icon';
import type { CallEvent } from '../types';

interface CallEventTimelineProps {
  events: CallEvent[];
  loading?: boolean;
}

interface EventTypeConfig {
  icon: IconName;
  color: string;
}

const EVENT_TYPE_CONFIG: Record<string, EventTypeConfig> = {
  onIncomingCallReceived: { icon: 'PhoneIncoming', color: 'bg-sky-500' },
  onOutgoingCallAccepted: { icon: 'PhoneOutgoing', color: 'bg-emerald-500' },
  onCallEnded: { icon: 'PhoneOff', color: 'bg-slate-500' },
  onCallRejected: { icon: 'PhoneMissed', color: 'bg-rose-500' },
  onCallCanceled: { icon: 'X', color: 'bg-amber-500' },
  onCallBusy: { icon: 'Phone', color: 'bg-amber-500' },
  onCallMissed: { icon: 'PhoneMissed', color: 'bg-amber-500' },
};

const DEFAULT_EVENT_CONFIG: EventTypeConfig = { icon: 'Activity', color: 'bg-slate-400' };

export const CallEventTimeline = ({ events, loading }: CallEventTimelineProps) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-indigo-600" />
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="py-8 text-center text-slate-500">No events recorded for this call</div>
    );
  }

  return (
    <div className="relative space-y-0">
      {/* Timeline line */}
      <div className="absolute left-4 top-0 h-full w-0.5 bg-slate-200" />

      {events.map((event, index) => {
        const config = EVENT_TYPE_CONFIG[event.event_type] ?? DEFAULT_EVENT_CONFIG;

        return (
          <div key={event.id} className="relative flex gap-4 pb-6">
            {/* Timeline dot */}
            <div
              className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${config.color} text-white`}
            >
              <Icon name={config.icon} size="sm" />
            </div>

            {/* Event content */}
            <div className="flex-1 rounded-lg border border-slate-200 bg-white p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-slate-900">{event.event_type}</h4>
                  <p className="text-sm text-slate-500">{formatDateTime(event.timestamp)}</p>
                </div>
                {event.triggered_by && (
                  <Badge variant="neutral">
                    {event.triggered_by.email}
                  </Badge>
                )}
              </div>

              {/* Event data */}
              {Object.keys(event.event_data).length > 0 && (
                <div className="mt-3 rounded bg-slate-50 p-3">
                  <pre className="overflow-x-auto text-xs text-slate-600">
                    {JSON.stringify(event.event_data, null, 2)}
                  </pre>
                </div>
              )}

              {/* IP Address */}
              {event.ip_address && (
                <p className="mt-2 text-xs text-slate-400">IP: {event.ip_address}</p>
              )}
            </div>

            {/* Connection line to next event */}
            {index < events.length - 1 && (
              <div className="absolute left-4 top-8 h-full w-0.5 bg-slate-200" />
            )}
          </div>
        );
      })}
    </div>
  );
};
