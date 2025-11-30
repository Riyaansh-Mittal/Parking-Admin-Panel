import { ReactNode } from 'react';
import { cn } from '@utils';

// ✅ Export the interface
export interface CardHeaderProps {
  children: ReactNode;
  action?: ReactNode;
  className?: string;
}

export const CardHeader = ({
  children,
  action,
  className,
}: CardHeaderProps) => {
  return (
    <div
      className={cn(
        'flex items-center justify-between border-b border-slate-200 p-6',
        className
      )}
    >
      <h3 className="text-lg font-semibold text-slate-900">{children}</h3>
      {action && <div>{action}</div>}
    </div>
  );
};

CardHeader.displayName = 'CardHeader';
