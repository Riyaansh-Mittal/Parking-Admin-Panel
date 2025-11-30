import { ReactNode } from 'react';
import { Button } from '@components/atoms/Button';
import { Icon } from '@components/atoms/Icon';
import { cn } from '@utils';

export interface FilterPanelProps {
  children: ReactNode;
  onClear?: () => void;
  onApply?: () => void;
  showActions?: boolean;
  title?: string;
  className?: string;
}

export const FilterPanel = ({
  children,
  onClear,
  onApply,
  showActions = true,
  title = 'Filters',
  className,
}: FilterPanelProps) => {
  return (
    <div
      className={cn(
        'rounded-lg border border-slate-200 bg-white p-4',
        className
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="Filter" size="sm" className="text-slate-500" />
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        </div>
      </div>

      <div className="space-y-4">{children}</div>

      {showActions && (onClear || onApply) && (
        <div className="mt-4 flex items-center gap-2 border-t border-slate-200 pt-4">
          {onClear && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onClear}
              fullWidth
            >
              Clear
            </Button>
          )}
          {onApply && (
            <Button
              variant="primary"
              size="sm"
              onClick={onApply}
              fullWidth
            >
              Apply Filters
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

FilterPanel.displayName = 'FilterPanel';
