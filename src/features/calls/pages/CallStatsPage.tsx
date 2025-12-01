import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DetailLayout } from '@/components/page-layouts/DetailLayout';
import { CallStatsCards } from '../components/CallStatsCards';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Input } from '@/components/atoms/Input';
import { useCallStats } from '../hooks/useCallStats';
import type { CallSummaryStats } from '../types';

export const CallStatsPage = () => {
  const navigate = useNavigate();
  const { stats, loading, updateDateRange } = useCallStats();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleApplyDateRange = () => {
    updateDateRange({
      start_date: startDate ? new Date(startDate).toISOString() : undefined,
      end_date: endDate ? new Date(endDate).toISOString() : undefined,
    });
  };

  const handleClearDateRange = () => {
    setStartDate('');
    setEndDate('');
    updateDateRange({});
  };

  return (
    <DetailLayout
      title="Call Analytics"
      subtitle="Comprehensive call statistics and insights"
      backUrl="/calls"
      actions={
        <Button variant="secondary" onClick={() => navigate('/calls')}>
          <Icon name="List" size="sm" />
          View All Calls
        </Button>
      }
    >
      <div className="space-y-6">
        {/* Date Range Filter */}
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <h3 className="mb-4 font-semibold text-slate-900">Filter by Date Range</h3>
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">Start Date</label>
              <Input
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-700">End Date</label>
              <Input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
            <Button variant="primary" onClick={handleApplyDateRange}>
              <Icon name="Filter" size="sm" />
              Apply
            </Button>
            {(startDate || endDate) && (
              <Button variant="ghost" onClick={handleClearDateRange}>
                <Icon name="X" size="sm" />
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <CallStatsCards stats={stats as CallSummaryStats | null} loading={loading} />

        {/* Additional Info */}
        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <h3 className="mb-4 font-semibold text-slate-900">About Call Statistics</h3>
          <div className="space-y-3 text-sm text-slate-600">
            <p>
              <strong>Total Calls:</strong> All call attempts regardless of outcome.
            </p>
            <p>
              <strong>Connected Calls:</strong> Calls that were successfully connected between
              parties.
            </p>
            <p>
              <strong>Failed Calls:</strong> Calls that failed due to technical issues or errors.
            </p>
            <p>
              <strong>Total Revenue:</strong> Sum of all call costs deducted from user balances.
            </p>
            <p>
              <strong>Average Rating:</strong> Mean quality rating from user feedback (1-5 scale).
            </p>
          </div>
        </div>
      </div>
    </DetailLayout>
  );
};
