import { ReactNode } from 'react';
import { cn } from '@utils';

// ✅ Export the interface
export interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

export const CardBody = ({ children, className }: CardBodyProps) => {
  return <div className={cn('p-6', className)}>{children}</div>;
};

CardBody.displayName = 'CardBody';
