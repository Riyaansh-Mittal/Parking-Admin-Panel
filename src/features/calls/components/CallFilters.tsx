import { useState, useEffect } from 'react';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Input } from '@/components/atoms/Input';
import type { CallFilters as CallFiltersType, CallState, CallType, DeductionStatus } from '../types';

interface CallFiltersProps {
  filters: CallFiltersType;
  onFiltersChange: (filters: Partial<CallFiltersType>) => void;
  onReset: () => void;
}

const CALL_STATES: { value: CallState; label: string }[] = [
  { value: 'ringing', label: 'Ringing' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'busy', label: 'Busy' },
  { value: 'canceled', label: 'Canceled' },
  { value: 'missed', label: 'Missed' },
  { value: 'ended', label: 'Ended' },
  { value: 'failed', label: 'Failed' },
];

const CALL_TYPES: { value: CallType; label: string }[] = [
  { value: 'audio', label: 'Audio' },
  { value: 'video', label: 'Video' },
];

const DEDUCTION_STATUSES: { value: DeductionStatus; label: string }[] = [
  { value: 'pending', label: 'Pending' },
  { value: 'completed', label: 'Completed' },
  { value: 'failed', label: 'Failed' },
  { value: 'not_applicable', label: 'N/A' },
];

export const CallFilters = ({ filters, onFiltersChange, onReset }: CallFiltersProps) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [localFilters, setLocalFilters] = useState<CallFiltersType>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleChange = <K extends keyof CallFiltersType>(key: K, value: CallFiltersType[K]) => {
    const newFilters = { ...localFilters, [key]: value || undefined };
    setLocalFilters(newFilters);
    onFiltersChange({ [key]: value || undefined });
  };

  const activeFilterCount = Object.entries(localFilters).filter(
    ([key, value]) =>
      value !== undefined &&
      value !== null &&
      value !== '' &&
      !['page', 'page_size'].includes(key)
  ).length;

  return (
    <div className="space-y-4">
      {/* Primary Filters */}
      <div className="flex flex-wrap items-center gap-3">
        {/* State Filter */}
        <select
          value={localFilters.state || ''}
          onChange={(e) => handleChange('state', e.target.value as CallState || undefined)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          <option value="">All States</option>
          {CALL_STATES.map((state) => (
            <option key={state.value} value={state.value}>
              {state.label}
            </option>
          ))}
        </select>

        {/* Call Type Filter */}
        <select
          value={localFilters.call_type || ''}
          onChange={(e) => handleChange('call_type', e.target.value as CallType || undefined)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          <option value="">All Types</option>
          {CALL_TYPES.map((type) => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>

        {/* Deduction Status */}
        <select
          value={localFilters.deduction_status || ''}
          onChange={(e) =>
            handleChange('deduction_status', e.target.value as DeductionStatus || undefined)
          }
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          <option value="">All Deductions</option>
          {DEDUCTION_STATUSES.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>

        {/* Connected Filter */}
        <select
          value={
            localFilters.was_connected === undefined ? '' : localFilters.was_connected.toString()
          }
          onChange={(e) =>
            handleChange(
              'was_connected',
              e.target.value === '' ? undefined : e.target.value === 'true'
            )
          }
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        >
          <option value="">Connection Status</option>
          <option value="true">Connected</option>
          <option value="false">Not Connected</option>
        </select>

        {/* Advanced Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          <Icon name={showAdvanced ? 'ChevronUp' : 'ChevronDown'} size="sm" />
          Advanced
        </Button>

        {/* Reset */}
        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onReset}>
            <Icon name="X" size="sm" />
            Reset ({activeFilterCount})
          </Button>
        )}
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div className="grid grid-cols-1 gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Duration Range */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Min Duration (s)</label>
            <Input
              type="number"
              value={localFilters.min_duration || ''}
              onChange={(e) =>
                handleChange('min_duration', e.target.value ? parseInt(e.target.value) : undefined)
              }
              placeholder="0"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">Max Duration (s)</label>
            <Input
              type="number"
              value={localFilters.max_duration || ''}
              onChange={(e) =>
                handleChange('max_duration', e.target.value ? parseInt(e.target.value) : undefined)
              }
              placeholder="3600"
            />
          </div>

          {/* Date Range */}
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">From Date</label>
            <Input
              type="datetime-local"
              value={localFilters.initiated_after?.slice(0, 16) || ''}
              onChange={(e) =>
                handleChange(
                  'initiated_after',
                  e.target.value ? new Date(e.target.value).toISOString() : undefined
                )
              }
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">To Date</label>
            <Input
              type="datetime-local"
              value={localFilters.initiated_before?.slice(0, 16) || ''}
              onChange={(e) =>
                handleChange(
                  'initiated_before',
                  e.target.value ? new Date(e.target.value).toISOString() : undefined
                )
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};
