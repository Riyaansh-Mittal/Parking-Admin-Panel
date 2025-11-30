import { ReactNode } from 'react';
import { Icon } from '@components/atoms/Icon';
import { cn } from '@utils';

export interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  children: ReactNode;
  className?: string;
  onClose?: () => void;
}

const variantStyles = {
  info: {
    container: 'bg-blue-50 border-blue-200',
    icon: 'text-blue-600',
    text: 'text-blue-900',
    iconName: 'Info' as const,
  },
  success: {
    container: 'bg-emerald-50 border-emerald-200',
    icon: 'text-emerald-600',
    text: 'text-emerald-900',
    iconName: 'CheckCircle' as const,
  },
  warning: {
    container: 'bg-amber-50 border-amber-200',
    icon: 'text-amber-600',
    text: 'text-amber-900',
    iconName: 'AlertTriangle' as const,
  },
  error: {
    container: 'bg-rose-50 border-rose-200',
    icon: 'text-rose-600',
    text: 'text-rose-900',
    iconName: 'AlertCircle' as const,
  },
};

export const Alert = ({
  variant = 'info',
  children,
  className,
  onClose,
}: AlertProps) => {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-lg border p-4',
        styles.container,
        className
      )}
      role="alert"
    >
      <Icon name={styles.iconName} size="md" className={cn('shrink-0', styles.icon)} />
      <div className={cn('flex-1 text-sm', styles.text)}>{children}</div>
      {onClose && (
        <button
          onClick={onClose}
          className={cn('shrink-0 rounded p-1 hover:bg-black/5', styles.icon)}
          aria-label="Close alert"
        >
          <Icon name="X" size="sm" />
        </button>
      )}
    </div>
  );
};

Alert.displayName = 'Alert';
