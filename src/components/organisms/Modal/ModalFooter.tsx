import { ReactNode } from 'react';
import { cn } from '@utils';

// ✅ Export the interface
export interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}

export const ModalFooter = ({ children, className }: ModalFooterProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-end gap-3 border-t border-slate-200 p-6',
        className
      )}
    >
      {children}
    </div>
  );
};

ModalFooter.displayName = 'ModalFooter';
