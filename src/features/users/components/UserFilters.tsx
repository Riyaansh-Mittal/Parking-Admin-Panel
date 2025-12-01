import { useState, useEffect } from 'react';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import type { UserFilters as UserFiltersType } from '@/features/users/types';

interface UserFiltersProps {
  filters: UserFiltersType;
  onFiltersChange: (filters: UserFiltersType) => void;
  onReset: () => void;
}

export const UserFilters = ({
  filters,
  onFiltersChange,
  onReset,
}: UserFiltersProps) => {
  const [localFilters, setLocalFilters] = useState<UserFiltersType>(filters);
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [showEmailMenu, setShowEmailMenu] = useState(false);
  const [showPhoneMenu, setShowPhoneMenu] = useState(false);
  const [showVehicleMenu, setShowVehicleMenu] = useState(false);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleFilterChange = <K extends keyof UserFiltersType>(
    key: K,
    value: UserFiltersType[K]
  ) => {
    const newFilters = { ...localFilters, [key]: value } as UserFiltersType;
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const handleReset = () => {
    setLocalFilters({});
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

      {/* Phone Verified Filter */}
      <div className="relative">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowPhoneMenu(!showPhoneMenu)}
        >
          <Icon name="Phone" size="sm" />
          Phone
          {localFilters.phone_verified !== undefined && (
            <span className="ml-1 rounded-full bg-indigo-100 px-1.5 py-0.5 text-xs font-medium text-indigo-700">
              1
            </span>
          )}
        </Button>
        {showPhoneMenu && (
          <div className="absolute left-0 top-full z-10 mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-lg">
            <div className="space-y-1 p-2">
              <button
                onClick={() => {
                  handleFilterChange('phone_verified', undefined);
                  setShowPhoneMenu(false);
                }}
                className="block w-full rounded px-3 py-2 text-left text-sm hover:bg-slate-50"
              >
                All
              </button>
              <button
                onClick={() => {
                  handleFilterChange('phone_verified', true);
                  setShowPhoneMenu(false);
                }}
                className="block w-full rounded px-3 py-2 text-left text-sm hover:bg-slate-50"
              >
                Verified
              </button>
              <button
                onClick={() => {
                  handleFilterChange('phone_verified', false);
                  setShowPhoneMenu(false);
                }}
                className="block w-full rounded px-3 py-2 text-left text-sm hover:bg-slate-50"
              >
                Unverified
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Vehicle Filter */}
      <div className="relative">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setShowVehicleMenu(!showVehicleMenu)}
        >
          <Icon name="Car" size="sm" />
          Vehicle
          {localFilters.has_vehicle !== undefined && (
            <span className="ml-1 rounded-full bg-indigo-100 px-1.5 py-0.5 text-xs font-medium text-indigo-700">
              1
            </span>
          )}
        </Button>
        {showVehicleMenu && (
          <div className="absolute left-0 top-full z-10 mt-2 w-48 rounded-lg border border-slate-200 bg-white shadow-lg">
            <div className="space-y-1 p-2">
              <button
                onClick={() => {
                  handleFilterChange('has_vehicle', undefined);
                  setShowVehicleMenu(false);
                }}
                className="block w-full rounded px-3 py-2 text-left text-sm hover:bg-slate-50"
              >
                All
              </button>
              <button
                onClick={() => {
                  handleFilterChange('has_vehicle', true);
                  setShowVehicleMenu(false);
                }}
                className="block w-full rounded px-3 py-2 text-left text-sm hover:bg-slate-50"
              >
                With Vehicle
              </button>
              <button
                onClick={() => {
                  handleFilterChange('has_vehicle', false);
                  setShowVehicleMenu(false);
                }}
                className="block w-full rounded px-3 py-2 text-left text-sm hover:bg-slate-50"
              >
                Without Vehicle
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
