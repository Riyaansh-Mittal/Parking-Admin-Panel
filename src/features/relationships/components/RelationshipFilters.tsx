import { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Dropdown } from '@/components/molecules/Dropdown';
import type { RelationshipFilters as Filters } from '../types';

interface RelationshipFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Partial<Filters>) => void;
  onReset: () => void;
}

const STATUS_OPTIONS = [
  { label: 'All Statuses', value: '' },
  { label: 'Pending', value: 'pending' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
  { label: 'Reversed', value: 'reversed' },
];

const CODE_TYPE_OPTIONS = [
  { label: 'All Types', value: '' },
  { label: 'Campaign', value: 'campaign' },
  { label: 'User', value: 'user' },
];

const REWARD_STATUS_OPTIONS = [
  { label: 'All', value: '' },
  { label: 'Credited', value: 'true' },
  { label: 'Not Credited', value: 'false' },
];

const PARTIAL_OPTIONS = [
  { label: 'All', value: '' },
  { label: 'Partial Failures Only', value: 'true' },
];

export const RelationshipFilters = ({
  filters,
  onFilterChange,
  onReset,
}: RelationshipFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasActiveFilters = 
    filters.status || 
    filters.code_type || 
    filters.referrer_reward_credited !== undefined ||
    filters.referred_reward_credited !== undefined ||
    filters.is_partially_completed;

  return (
    <div className="space-y-4">
      {/* Primary Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Dropdown
          options={STATUS_OPTIONS}
          value={filters.status || ''}
          onChange={(value) => onFilterChange({ status: value as string })}
          placeholder="Status"
          className="min-w-[140px]"
        />

        <Dropdown
          options={CODE_TYPE_OPTIONS}
          value={filters.code_type || ''}
          onChange={(value) => onFilterChange({ code_type: value as string })}
          placeholder="Code Type"
          className="min-w-[140px]"
        />

        <Button
          variant="secondary"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size="sm" />
          {isExpanded ? 'Less' : 'More'} Filters
        </Button>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="text-rose-600 hover:text-rose-700"
          >
            <Icon name="X" size="sm" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Referrer Reward
            </label>
            <Dropdown
              options={REWARD_STATUS_OPTIONS}
              value={
                filters.referrer_reward_credited === undefined
                  ? ''
                  : String(filters.referrer_reward_credited)
              }
              onChange={(value) =>
                onFilterChange({
                  referrer_reward_credited:
                    value === '' ? undefined : value === 'true',
                })
              }
              placeholder="Select..."
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Referred Reward
            </label>
            <Dropdown
              options={REWARD_STATUS_OPTIONS}
              value={
                filters.referred_reward_credited === undefined
                  ? ''
                  : String(filters.referred_reward_credited)
              }
              onChange={(value) =>
                onFilterChange({
                  referred_reward_credited:
                    value === '' ? undefined : value === 'true',
                })
              }
              placeholder="Select..."
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Partial Failures
            </label>
            <Dropdown
              options={PARTIAL_OPTIONS}
              value={
                filters.is_partially_completed === undefined
                  ? ''
                  : String(filters.is_partially_completed)
              }
              onChange={(value) =>
                onFilterChange({
                  is_partially_completed:
                    value === '' ? undefined : value === 'true',
                })
              }
              placeholder="Select..."
            />
          </div>
        </div>
      )}
    </div>
  );
};
