import { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import type { DateRange } from '../types';

interface DateRangeFilterProps {
  onApply: (range: DateRange) => void;
  loading?: boolean;
}

export const DateRangeFilter = ({ onApply, loading }: DateRangeFilterProps) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleQuickSelect = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);

    const range: DateRange = {
      start_date: start.toISOString().split('T')[0],
      end_date: end.toISOString().split('T')[0],
    };

    setStartDate(range.start_date);
    setEndDate(range.end_date);
    onApply(range);
  };

  const handleApply = () => {
    if (startDate && endDate) {
      onApply({ start_date: startDate, end_date: endDate });
    }
  };

  const handleReset = () => {
    setStartDate('');
    setEndDate('');
    const today = new Date().toISOString().split('T')[0];
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    onApply({
      start_date: thirtyDaysAgo.toISOString().split('T')[0],
      end_date: today,
    });
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="mb-4 flex items-center gap-2">
        <Icon name="Calendar" size="sm" className="text-slate-600" />
        <h3 className="font-semibold text-slate-900">Date Range</h3>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => handleQuickSelect(7)}
          disabled={loading}
        >
          Last 7 Days
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => handleQuickSelect(30)}
          disabled={loading}
        >
          Last 30 Days
        </Button>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => handleQuickSelect(90)}
          disabled={loading}
        >
          Last 90 Days
        </Button>
      </div>

      <div className="space-y-3">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Start Date
          </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            disabled={loading}
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            End Date
          </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            disabled={loading}
          />
        </div>

        <div className="flex gap-2">
          <Button
            variant="primary"
            size="sm"
            onClick={handleApply}
            disabled={!startDate || !endDate || loading}
            fullWidth
          >
            Apply
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleReset}
            disabled={loading}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};
