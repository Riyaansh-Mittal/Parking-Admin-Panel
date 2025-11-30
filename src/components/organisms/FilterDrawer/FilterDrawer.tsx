import { ReactNode, useEffect } from 'react';
import { Portal } from '@utils/Portal';
import { Icon } from '@components/atoms/Icon';
import { Button } from '@components/atoms/Button';
import { cn } from '@utils';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onApply?: () => void;
  onClear?: () => void;
  children: ReactNode;
  title?: string;
}

export const FilterDrawer = ({
  isOpen,
  onClose,
  onApply,
  onClear,
  children,
  title = 'Filters',
}: FilterDrawerProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <Portal>
      <div className="fixed inset-0 z-50 flex">
        {/* Overlay */}
        <div
          className="flex-1 bg-black/50"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Drawer */}
        <aside
          className={cn(
            'flex h-full w-full max-w-md flex-col bg-white shadow-xl',
            'animate-slide-in-right'
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby="filter-drawer-title"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 p-6">
            <div className="flex items-center gap-2">
              <Icon name="Filter" size="md" className="text-slate-500" />
              <h2
                id="filter-drawer-title"
                className="text-lg font-semibold text-slate-900"
              >
                {title}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              aria-label="Close filters"
            >
              <Icon name="X" size="md" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">{children}</div>
          </div>

          {/* Footer */}
          <div className="flex items-center gap-3 border-t border-slate-200 p-6">
            {onClear && (
              <Button
                variant="secondary"
                onClick={onClear}
                fullWidth
              >
                Clear All
              </Button>
            )}
            {onApply && (
              <Button
                variant="primary"
                onClick={onApply}
                fullWidth
              >
                Apply Filters
              </Button>
            )}
          </div>
        </aside>
      </div>

      <style>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </Portal>
  );
};

FilterDrawer.displayName = 'FilterDrawer';
