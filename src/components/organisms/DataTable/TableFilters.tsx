import { FormField } from '@components/molecules/FormField';
import { Dropdown } from '@components/molecules/Dropdown';
import { Button } from '@components/atoms/Button';
import { Icon } from '@components/atoms/Icon';
import type { TableFilter } from '@types';

interface TableFiltersProps {
  filters: TableFilter[];
  onFilterChange: (key: string, value: unknown) => void;
  onClear?: () => void;
}

export const TableFilters = ({
  filters,
  onFilterChange,
  onClear,
}: TableFiltersProps) => {
  return (
    <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="Filter" size="sm" className="text-slate-500" />
          <h3 className="text-sm font-semibold text-slate-900">Filters</h3>
        </div>
        {onClear && (
          <Button variant="ghost" size="sm" onClick={onClear}>
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filters.map((filter) => {
          switch (filter.type) {
            case 'select':
              return (
                <div key={filter.key}>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    {filter.label}
                  </label>
                  <Dropdown
                    options={filter.options || []}
                    value={filter.value as string | number | undefined}
                    onChange={(value) => onFilterChange(filter.key, value)}
                    placeholder={filter.placeholder}
                    fullWidth
                  />
                </div>
              );

            case 'text':
            case 'number':
            case 'date':
            default:
              return (
                <FormField
                  key={filter.key}
                  type={filter.type}
                  label={filter.label}
                  placeholder={filter.placeholder}
                  value={String(filter.value ?? '')}
                  onChange={(e) =>
                    onFilterChange(filter.key, e.target.value)
                  }
                />
              );
          }
        })}
      </div>
    </div>
  );
};

TableFilters.displayName = 'TableFilters';
