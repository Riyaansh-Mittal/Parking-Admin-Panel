import { Button } from '@components/atoms/Button';
import { Icon } from '@components/atoms/Icon';
import { cn } from '@utils';
import type { TableAction } from '@types';

interface BulkActionBarProps {
  selectedCount: number;
  totalCount: number;
  actions: TableAction[];
  onClearSelection: () => void;
  className?: string;
}

export const BulkActionBar = ({
  selectedCount,
  totalCount,
  actions,
  onClearSelection,
  className,
}: BulkActionBarProps) => {
  if (selectedCount === 0) return null;

  return (
    <div
      className={cn(
        'fixed bottom-6 left-1/2 z-40 flex -translate-x-1/2 items-center gap-4 rounded-lg border border-slate-200 bg-white px-6 py-4 shadow-xl',
        className
      )}
    >
      {/* Selection Info */}
      <div className="flex items-center gap-3 border-r border-slate-200 pr-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
          <Icon name="CheckSquare" size="sm" className="text-indigo-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">
            {selectedCount} selected
          </p>
          <p className="text-xs text-slate-500">
            out of {totalCount} items
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {actions.map((action) => (
          <Button
            key={action.label}
            variant={action.variant || 'secondary'}
            size="sm"
            onClick={() => action.onClick([])}
            disabled={action.disabled}
            leftIcon={action.icon ? <Icon name={action.icon as any} size="sm" /> : undefined}
          >
            {action.label}
          </Button>
        ))}
      </div>

      {/* Clear Selection */}
      <button
        onClick={onClearSelection}
        className="ml-2 rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
        aria-label="Clear selection"
      >
        <Icon name="X" size="sm" />
      </button>
    </div>
  );
};

BulkActionBar.displayName = 'BulkActionBar';
