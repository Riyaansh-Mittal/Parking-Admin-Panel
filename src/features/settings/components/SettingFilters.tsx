import { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { Select } from '@/components/atoms/Select';
import { Input } from '@/components/atoms/Input';
import { Icon } from '@/components/atoms/Icon';
import type { SettingFilters as Filters } from '../types';

interface SettingFiltersProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  onReset: () => void;
}

export const SettingFilters = ({
  filters,
  onFiltersChange,
  onReset,
}: SettingFiltersProps) => {
  const [localFilters, setLocalFilters] = useState<Filters>(filters);

  const handleFilterChange = (key: keyof Filters, value: string) => {
    const updated = { ...localFilters, [key]: value || undefined };
    setLocalFilters(updated);
  };

  const handleApply = () => {
    onFiltersChange(localFilters);
  };

  const handleReset = () => {
    const resetFilters: Filters = { page: 1, page_size: 20 };
    setLocalFilters(resetFilters);
    onReset();
  };

  return (
    <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="Filter" size="sm" className="text-slate-500" />
          <h3 className="text-sm font-semibold text-slate-900">Filters</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={handleReset}>
          Clear All
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Category Filter */}
        <Select
          label="Category"
          value={localFilters.category || ''}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          options={[
            { value: '', label: 'All Categories' },
            { value: 'call_management', label: 'Call Management' },
            { value: 'referral_system', label: 'Referral System' },
            { value: 'automation', label: 'Automation' },
            { value: 'security', label: 'Security' },
            { value: 'notifications', label: 'Notifications' },
          ]}
          fullWidth
        />

        {/* Type Filter */}
        <Select
          label="Setting Type"
          value={localFilters.setting_type || ''}
          onChange={(e) => handleFilterChange('setting_type', e.target.value)}
          options={[
            { value: '', label: 'All Types' },
            { value: 'string', label: 'String' },
            { value: 'integer', label: 'Integer' },
            { value: 'decimal', label: 'Decimal' },
            { value: 'boolean', label: 'Boolean' },
            { value: 'json', label: 'JSON' },
          ]}
          fullWidth
        />

        {/* Editable By Filter */}
        <Select
          label="Editable By"
          value={localFilters.editable_by || ''}
          onChange={(e) => handleFilterChange('editable_by', e.target.value)}
          options={[
            { value: '', label: 'All Users' },
            { value: 'admin', label: 'Admin' },
            { value: 'superuser', label: 'Superuser' },
          ]}
          fullWidth
        />

        {/* Search */}
        <Input
          type="text"
          label="Search"
          placeholder="Search by key or name..."
          value={localFilters.search || ''}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          fullWidth
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={handleApply} size="sm">
          Apply Filters
        </Button>
      </div>
    </div>
  );
};
