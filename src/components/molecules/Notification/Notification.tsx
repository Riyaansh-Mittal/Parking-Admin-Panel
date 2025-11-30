import { useEffect } from 'react';
import { Icon } from '@components/atoms/Icon';
import { cn } from '@utils';
import type { IconName } from '@components/atoms/Icon';

export interface NotificationProps {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

export const Notification = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
}: NotificationProps) => {
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        onClose(id);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [id, duration, onClose]);

  const config = {
    success: {
      icon: 'CheckCircle' as IconName,
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      iconColor: 'text-emerald-500',
      titleColor: 'text-emerald-900',
      messageColor: 'text-emerald-700',
    },
    error: {
      icon: 'XCircle' as IconName,
      bgColor: 'bg-rose-50',
      borderColor: 'border-rose-200',
      iconColor: 'text-rose-500',
      titleColor: 'text-rose-900',
      messageColor: 'text-rose-700',
    },
    warning: {
      icon: 'AlertCircle' as IconName,
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      iconColor: 'text-amber-500',
      titleColor: 'text-amber-900',
      messageColor: 'text-amber-700',
    },
    info: {
      icon: 'Info' as IconName,
      bgColor: 'bg-sky-50',
      borderColor: 'border-sky-200',
      iconColor: 'text-sky-500',
      titleColor: 'text-sky-900',
      messageColor: 'text-sky-700',
    },
  };

  const {
    icon,
    bgColor,
    borderColor,
    iconColor,
    titleColor,
    messageColor,
  } = config[type];

  return (
    <div
      className={cn(
        'pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg border shadow-lg',
        bgColor,
        borderColor
      )}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          <div className={cn('shrink-0', iconColor)}>
            <Icon name={icon} size="lg" />
          </div>

          <div className="flex-1">
            <p className={cn('text-sm font-semibold', titleColor)}>{title}</p>
            <p className={cn('mt-1 text-sm', messageColor)}>{message}</p>
          </div>

          <button
            type="button"
            onClick={() => onClose(id)}
            className={cn(
              'shrink-0 rounded-lg p-1 transition-colors hover:bg-black/5',
              messageColor
            )}
            aria-label="Close notification"
          >
            <Icon name="X" size="sm" />
          </button>
        </div>
      </div>

      {duration > 0 && (
        <div className="h-1 w-full bg-black/10">
          <div
            className={cn('h-full bg-current', iconColor)}
            style={{
              animation: `shrink ${duration}ms linear`,
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
};

Notification.displayName = 'Notification';
