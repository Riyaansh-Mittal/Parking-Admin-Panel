import { ReactNode } from 'react';
import { Icon } from '@components/atoms/Icon';
import { cn } from '@utils';

// ✅ Export the interface
export interface ModalHeaderProps {
  children: ReactNode;
  onClose?: () => void;
  className?: string;
}

export const ModalHeader = ({
  children,
  onClose,
  className,
}: ModalHeaderProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between border-b border-slate-200 p-6',
        className
      )}
    >
      <h2 className="text-xl font-semibold text-slate-900">{children}</h2>
      {onClose && (
        <button
          onClick={onClose}
          className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
          aria-label="Close modal"
        >
          <Icon name="X" size="md" />
        </button>
      )}
    </div>
  );
};

ModalHeader.displayName = 'ModalHeader';
