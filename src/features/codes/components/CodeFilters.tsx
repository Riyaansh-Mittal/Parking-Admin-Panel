import { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Dropdown } from '@/components/molecules/Dropdown';
import type { CodeFilters as CodeFiltersType } from '../types';

interface CodeFiltersProps {
  filters: CodeFiltersType;
  onFilterChange: (filters: CodeFiltersType) => void;
  onClear: () => void;
}

const CODE_TYPE_OPTIONS = [
  { label: 'All Types', value: '' },
  { label: 'Campaign Codes', value: 'campaign' },
  { label: 'User Codes', value: 'user' },
];

const STATUS_OPTIONS = [
  { label: 'All Statuses', value: '' },
  { label: 'Active', value: 'active' },
  { label: 'Inactive', value: 'inactive' },
  { label: 'Expired', value: 'expired' },
  { label: 'Exhausted', value: 'exhausted' },
];

const SORT_OPTIONS = [
  { label: 'Newest First', value: '-created_at' },
  { label: 'Oldest First', value: 'created_at' },
  { label: 'Code A-Z', value: 'code' },
  { label: 'Code Z-A', value: '-code' },
  { label: 'Most Used', value: '-usage_count' },
  { label: 'Least Used', value: 'usage_count' },
];

export const CodeFilters = ({ filters, onFilterChange, onClear }: CodeFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key: keyof CodeFiltersType, value: string | number | boolean) => {
    onFilterChange({ ...filters, [key]: value || undefined });
  };

  const activeFilterCount = Object.values(filters).filter(
    (value) => value !== undefined && value !== null && value !== ''
  ).length;

  return (
    <div className="space-y-4">
      {/* Quick Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <Dropdown
          options={CODE_TYPE_OPTIONS}
          value={filters.code_type || ''}
          onChange={(value) => handleFilterChange('code_type', value)}
          placeholder="Code Type"
        />

        <Dropdown
          options={STATUS_OPTIONS}
          value={filters.status || ''}
          onChange={(value) => handleFilterChange('status', value)}
          placeholder="Status"
        />

        <Dropdown
          options={SORT_OPTIONS}
          value={filters.ordering || '-created_at'}
          onChange={(value) => handleFilterChange('ordering', value)}
          placeholder="Sort By"
        />

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          leftIcon={<Icon name={isExpanded ? 'ChevronUp' : 'ChevronDown'} size="sm" />}
        >
          {isExpanded ? 'Less' : 'More'} Filters
        </Button>

        {activeFilterCount > 0 && (
          <Button variant="ghost" size="sm" onClick={onClear} leftIcon={<Icon name="X" size="sm" />}>
            Clear ({activeFilterCount})
          </Button>
        )}
      </div>

      {/* Advanced Filters */}
      {isExpanded && (
        <div className="grid grid-cols-1 gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4 md:grid-cols-3">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Min Usage Count
            </label>
            <input
              type="number"
              min={0}
              value={filters.usage_min || ''}
              onChange={(e) =>
                handleFilterChange('usage_min', e.target.value ? parseInt(e.target.value) : '')
              }
              className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Min usage"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Max Usage Count
            </label>
            <input
              type="number"
              min={0}
              value={filters.usage_max || ''}
              onChange={(e) =>
                handleFilterChange('usage_max', e.target.value ? parseInt(e.target.value) : '')
              }
              className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Max usage"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-700">
              Owner Email
            </label>
            <input
              type="email"
              value={filters.owner_email || ''}
              onChange={(e) => handleFilterChange('owner_email', e.target.value)}
              className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Filter by owner"
            />
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.is_valid || false}
                onChange={(e) => handleFilterChange('is_valid', e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-slate-700">Valid Codes Only</span>
            </label>
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.usage_available || false}
                onChange={(e) => handleFilterChange('usage_available', e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-slate-700">Available Usage Only</span>
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

CodeFilters.displayName = 'CodeFilters';
