import { useState } from 'react';
import { Input } from '@/components/atoms/Input';
import { Select } from '@/components/atoms/Select';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import type { CampaignFilters as CampaignFiltersType } from '../types';

interface CampaignFiltersProps {
  onFilterChange: (filters: CampaignFiltersType) => void;
  initialFilters?: CampaignFiltersType;
}

export const CampaignFilters = ({ onFilterChange, initialFilters }: CampaignFiltersProps) => {
  const [filters, setFilters] = useState<CampaignFiltersType>(initialFilters || {});

  const handleChange = (key: keyof CampaignFiltersType, value: string | boolean | undefined) => {
    const updatedFilters = { ...filters, [key]: value || undefined };
    setFilters(updatedFilters);
  };

  const handleApply = () => {
    onFilterChange(filters);
  };

  const handleReset = () => {
    setFilters({});
    onFilterChange({});
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-slate-900">Filters</h3>
        <Button variant="ghost" size="sm" onClick={handleReset}>
          <Icon name="RotateCcw" size="sm" />
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Search */}
        <Input
          placeholder="Search campaigns..."
          value={filters.search || ''}
          onChange={(e) => handleChange('search', e.target.value)}
          leftIcon={<Icon name="Search" size="sm" />}
        />

        {/* Status Filter */}
        <Select
          placeholder="Status"
          options={[
            { value: '', label: 'All Status' },
            { value: 'true', label: 'Active' },
            { value: 'false', label: 'Inactive' },
          ]}
          value={filters.is_active !== undefined ? String(filters.is_active) : ''}
          onChange={(e) =>
            handleChange(
              'is_active',
              e.target.value === '' ? undefined : e.target.value === 'true'
            )
          }
        />

        {/* Expired Filter */}
        <Select
          placeholder="Expiration"
          options={[
            { value: '', label: 'All Campaigns' },
            { value: 'false', label: 'Current' },
            { value: 'true', label: 'Expired' },
          ]}
          value={filters.is_expired !== undefined ? String(filters.is_expired) : ''}
          onChange={(e) =>
            handleChange(
              'is_expired',
              e.target.value === '' ? undefined : e.target.value === 'true'
            )
          }
        />

        {/* Sort Order */}
        <Select
          placeholder="Sort by"
          options={[
            { value: '-created_at', label: 'Newest First' },
            { value: 'created_at', label: 'Oldest First' },
            { value: 'name', label: 'Name (A-Z)' },
            { value: '-name', label: 'Name (Z-A)' },
            { value: '-reward_for_referrer', label: 'Highest Reward' },
            { value: 'valid_until', label: 'Expiring Soon' },
          ]}
          value={filters.ordering || '-created_at'}
          onChange={(e) => handleChange('ordering', e.target.value)}
        />
      </div>

      <div className="mt-4 flex justify-end">
        <Button variant="primary" onClick={handleApply}>
          <Icon name="Filter" size="sm" />
          Apply Filters
        </Button>
      </div>
    </div>
  );
};
