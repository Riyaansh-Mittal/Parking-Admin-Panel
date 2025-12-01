import { useParams, useNavigate } from 'react-router-dom';
import { DetailLayout } from '@/components/page-layouts/DetailLayout';
import { CallDetailModal } from '../components/CallDetailModal';
import { CallEventTimeline } from '../components/CallEventTimeline';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Alert } from '@/components/molecules/Alert';
import { Skeleton } from '@/components/atoms/Skeleton';
import { useCallDetail } from '../hooks/useCallDetail';
import { useCallEvents } from '../hooks/useCallEvents';
import type { CallDetail } from '../types';

export const CallDetailPage = () => {
  const { callId } = useParams<{ callId: string }>();
  const navigate = useNavigate();
  const { call, loading, error } = useCallDetail(callId);
  const { events, loading: eventsLoading } = useCallEvents(callId);

  if (loading) {
    return (
      <DetailLayout title="Loading..." backUrl="/calls">
        <div className="space-y-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      </DetailLayout>
    );
  }

  if (error || !call) {
    return (
      <DetailLayout title="Error" backUrl="/calls">
        <Alert variant="error">{error || 'Call record not found'}</Alert>
      </DetailLayout>
    );
  }

  // Cast to CallDetail since we know it's loaded
  const callDetail = call as unknown as CallDetail;

  return (
    <DetailLayout
      title="Call Details"
      subtitle={callDetail.call_id}
      backUrl="/calls"
      actions={
        <Button variant="secondary" onClick={() => navigate('/calls')}>
          <Icon name="ArrowLeft" size="sm" />
          Back to List
        </Button>
      }
    >
      <div className="space-y-8">
        {/* Call Detail Card */}
        <div className="rounded-lg border border-slate-200 bg-white">
          <CallDetailModal
            call={callDetail}
            onClose={() => navigate('/calls')}
          />
        </div>

        {/* Event Timeline */}
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h3 className="mb-6 flex items-center gap-2 text-lg font-semibold text-slate-900">
            <Icon name="Activity" size="md" />
            Event Timeline
          </h3>
          <CallEventTimeline events={events} loading={eventsLoading} />
        </div>
      </div>
    </DetailLayout>
  );
};
