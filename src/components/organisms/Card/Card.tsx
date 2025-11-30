import { ReactNode } from 'react';
import { CardHeader } from './CardHeader';
import { CardBody } from './CardBody';
import { cn } from '@utils';

// ✅ Export the interface
export interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: boolean;
}

export const Card = ({ children, className, padding = true }: CardProps) => {
  return (
    <div
      className={cn(
        'rounded-lg border border-slate-200 bg-white shadow-sm',
        !padding && 'p-0',
        className
      )}
    >
      {children}
    </div>
  );
};

Card.displayName = 'Card';
Card.Header = CardHeader;
Card.Body = CardBody;
