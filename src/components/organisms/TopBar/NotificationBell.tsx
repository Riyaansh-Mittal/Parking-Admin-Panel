import { useState, useRef } from 'react';
import { Icon } from '@components/atoms/Icon';
import { Badge } from '@components/atoms/Badge';
import { Button } from '@components/atoms/Button';
import { useClickOutside } from '@hooks';
import { useAppSelector } from '@redux/hooks';
import { formatRelativeTime } from '@utils/formatters';
import { cn } from '@utils';

export const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const notifications = useAppSelector((state) => state.notifications.notifications);
  const unreadCount = notifications.length;

  useClickOutside(dropdownRef, () => setIsOpen(false), isOpen);

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-lg p-2 text-slate-600 hover:bg-slate-100"
        aria-label="Notifications"
      >
        <Icon name="Bell" size="md" />
        {unreadCount > 0 && (
          <span className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-xs font-semibold text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 rounded-lg border border-slate-200 bg-white shadow-lg">
          <div className="flex items-center justify-between border-b border-slate-200 p-4">
            <h3 className="text-sm font-semibold text-slate-900">
              Notifications
            </h3>
            {unreadCount > 0 && (
              <Badge variant="neutral" size="sm">
                {unreadCount} new
              </Badge>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Icon name="Bell" size="lg" className="mx-auto text-slate-300" />
                <p className="mt-2 text-sm text-slate-500">
                  No notifications
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-slate-200">
                {notifications.map((notification) => (
                  <li
                    key={notification.id}
                    className="p-4 hover:bg-slate-50"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          'mt-1 h-2 w-2 shrink-0 rounded-full',
                          notification.type === 'success' && 'bg-emerald-500',
                          notification.type === 'error' && 'bg-rose-500',
                          notification.type === 'warning' && 'bg-amber-500',
                          notification.type === 'info' && 'bg-sky-500'
                        )}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-slate-900">
                          {notification.title}
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          {notification.message}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {formatRelativeTime(new Date(notification.timestamp))}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {notifications.length > 0 && (
            <div className="border-t border-slate-200 p-2">
              <Button
                variant="ghost"
                size="sm"
                fullWidth
                onClick={() => setIsOpen(false)}
              >
                View All
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

NotificationBell.displayName = 'NotificationBell';
