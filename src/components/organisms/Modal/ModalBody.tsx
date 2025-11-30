import { ReactNode } from 'react';
import { cn } from '@utils';

// ✅ Export the interface
export interface ModalBodyProps {
  children: ReactNode;
  className?: string;
}

export const ModalBody = ({ children, className }: ModalBodyProps) => {
  return (
    <div className={cn('p-6', className)}>
      {children}
    </div>
  );
};

ModalBody.displayName = 'ModalBody';
