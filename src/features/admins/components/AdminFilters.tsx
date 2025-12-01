import { useState, useEffect } from 'react';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import type { AdminFilters as AdminFiltersType } from '@/features/admins/types';

interface AdminFiltersComponentProps {
  filters: AdminFiltersType;
  onFiltersChange: (filters: AdminFiltersType) => void;
  onReset: () => void;
}

export const AdminFilters = ({ filters, onFiltersChange, onReset }: AdminFiltersComponentProps) => {
  const [localFilters, setLocalFilters] = useState<AdminFiltersType>(filters);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showTypeMenu, setShowTypeMenu] = useState(false);
  const [showEmailMenu, setShowEmailMenu] = useState(false);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = <K extends keyof AdminFiltersType>(
    key: K,
    value: AdminFiltersType[K]
  ) => {
    const newFilters = { ...localFilters, [key]: value } as AdminFiltersType;
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleReset = () => {
    setLocalFilters({} as AdminFiltersType);
    onReset();
  };

  const activeFilterCount = Object.values(localFilters).filter(
    (v) => v !== undefined && v !== null && v !== ''
  ).length;

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Status Filter */}
      <div className="relative">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowStatusMenu(!showStatusMenu)}
        >
          <Icon name="Filter" size="sm" />
          Status
          {localFilters.is_active !== undefined && (
            <span className="ml-1 rounded-full bg-indigo-100 px-1.5 py-0.5 text-xs font-medium text-indigo-700">
              1
            </span>
          )}
        </Button>
        {showStatusMenu && (
          <div className="absolute left-0 top-full z-10 mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-lg">
            <div className="space-y-1 p-2">
              <button
                onClick={() => {
                  handleFilterChange('is_active', undefined);
                  setShowStatusMenu(false);
                }}
                className="block w-full rounded px-3 py-2 text-left text-sm hover:bg-slate-50"
              >
                All
              </button>
              <button
                onClick={() => {
                  handleFilterChange('is_active', true);
                  setShowStatusMenu(false);
                }}
                className="block w-full rounded px-3 py-2 text-left text-sm hover:bg-slate-50"
              >
                Active
              </button>
              <button
                onClick={() => {
                  handleFilterChange('is_active', false);
                  setShowStatusMenu(false);
                }}
                className="block w-full rounded px-3 py-2 text-left text-sm hover:bg-slate-50"
              >
                Inactive
              </button>
            </div>
          </div>
        )}
      </div>

      {/* User Type Filter */}
      <div className="relative">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowTypeMenu(!showTypeMenu)}
        >
          <Icon name="Shield" size="sm" />
          Type
          {localFilters.user_type && (
            <span className="ml-1 rounded-full bg-indigo-100 px-1.5 py-0.5 text-xs font-medium text-indigo-700">
              1
            </span>
          )}
        </Button>
        {showTypeMenu && (
          <div className="absolute left-0 top-full z-10 mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-lg">
            <div className="space-y-1 p-2">
              <button
                onClick={() => {
                  handleFilterChange('user_type', undefined);
                  setShowTypeMenu(false);
                }}
                className="block w-full rounded px-3 py-2 text-left text-sm hover:bg-slate-50"
              >
                All
              </button>
              <button
                onClick={() => {
                  handleFilterChange('user_type', 'admin');
                  setShowTypeMenu(false);
                }}
                className="block w-full rounded px-3 py-2 text-left text-sm hover:bg-slate-50"
              >
                Admin
              </button>
              <button
                onClick={() => {
                  handleFilterChange('user_type', 'superuser');
                  setShowTypeMenu(false);
                }}
                className="block w-full rounded px-3 py-2 text-left text-sm hover:bg-slate-50"
              >
                Superuser
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Email Verified Filter */}
      <div className="relative">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowEmailMenu(!showEmailMenu)}
        >
          <Icon name="Mail" size="sm" />
          Email
          {localFilters.email_verified !== undefined && (
            <span className="ml-1 rounded-full bg-indigo-100 px-1.5 py-0.5 text-xs font-medium text-indigo-700">
              1
            </span>
          )}
        </Button>
        {showEmailMenu && (
          <div className="absolute left-0 top-full z-10 mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-lg">
            <div className="space-y-1 p-2">
              <button
                onClick={() => {
                  handleFilterChange('email_verified', undefined);
                  setShowEmailMenu(false);
                }}
                className="block w-full rounded px-3 py-2 text-left text-sm hover:bg-slate-50"
              >
                All
              </button>
              <button
                onClick={() => {
                  handleFilterChange('email_verified', true);
                  setShowEmailMenu(false);
                }}
                className="block w-full rounded px-3 py-2 text-left text-sm hover:bg-slate-50"
              >
                Verified
              </button>
              <button
                onClick={() => {
                  handleFilterChange('email_verified', false);
                  setShowEmailMenu(false);
                }}
                className="block w-full rounded px-3 py-2 text-left text-sm hover:bg-slate-50"
              >
                Unverified
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Reset Button */}
      {activeFilterCount > 0 && (
        <Button variant="ghost" size="sm" onClick={handleReset}>
          <Icon name="X" size="sm" />
          Reset ({activeFilterCount})
        </Button>
      )}
    </div>
  );
};
