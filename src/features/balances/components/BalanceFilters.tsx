import { useState } from 'react';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import type { BalanceFilters as Filters } from '@/features/balances/types';

interface BalanceFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onReset: () => void;
}

export const BalanceFilters = ({
  filters,
  onFilterChange,
  onReset,
}: BalanceFiltersProps) => {
  const [localFilters, setLocalFilters] = useState<Filters>(filters);

  const handleChange = (key: keyof Filters, value: string | number) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const handleApply = () => {
    onFilterChange(localFilters);
  };

  const handleReset = () => {
    setLocalFilters({});
    onReset();
  };

  const hasActiveFilters = Object.values(localFilters).some(
    (value) => value !== '' && value !== undefined && value !== null
  );

  return (
    <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="md:col-span-2">
          <Input
            placeholder="Search by name, email, or ID..."
            value={localFilters.search || ''}
            onChange={(e) => handleChange('search', e.target.value)}
            leftIcon={<Icon name="Search" size="sm" />}
          />
        </div>

        {/* Min Balance */}
        <Input
          label="Min Balance"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          value={localFilters.min_balance || ''}
          onChange={(e) => handleChange('min_balance', parseFloat(e.target.value) || 0)}
        />

        {/* Max Balance */}
        <Input
          label="Max Balance"
          type="number"
          step="0.01"
          min="0"
          placeholder="10000.00"
          value={localFilters.max_balance || ''}
          onChange={(e) => handleChange('max_balance', parseFloat(e.target.value) || 0)}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button variant="primary" onClick={handleApply}>
          <Icon name="Filter" size="sm" className="mr-2" />
          Apply Filters
        </Button>
        {hasActiveFilters && (
          <Button variant="secondary" onClick={handleReset}>
            <Icon name="X" size="sm" className="mr-2" />
            Reset
          </Button>
        )}
      </div>
    </div>
  );
};
