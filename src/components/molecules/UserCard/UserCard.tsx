import { Avatar } from '@components/atoms/Avatar';
import { Badge } from '@components/atoms/Badge';
import { Icon } from '@components/atoms/Icon';
import { cn } from '@utils';
import { formatDate } from '@utils/formatters';

export interface UserCardProps {
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  isVerified?: boolean;
  isActive?: boolean;
  joinedAt?: string;
  onClick?: () => void;
  className?: string;
}

export const UserCard = ({
  name,
  email,
  avatar,
  role,
  isVerified = false,
  isActive = true,
  joinedAt,
  onClick,
  className,
}: UserCardProps) => {
  return (
    <div
      className={cn(
        'rounded-lg border border-slate-200 bg-white p-4 transition-shadow',
        onClick && 'cursor-pointer hover:shadow-md',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="flex items-start gap-3">
        <Avatar
          src={avatar}
          name={name}
          size="lg"
          status={isActive ? 'online' : 'offline'}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-base font-semibold text-slate-900">
              {name}
            </h3>
            {isVerified && (
              <Icon
                name="CheckCircle"
                size="sm"
                className="shrink-0 text-emerald-500"
              />
            )}
          </div>

          <p className="truncate text-sm text-slate-500">{email}</p>

          {role && (
            <div className="mt-2">
              <Badge variant="neutral" size="sm">
                {role}
              </Badge>
            </div>
          )}

          {joinedAt && (
            <p className="mt-2 text-xs text-slate-400">
              Joined {formatDate(joinedAt)}
            </p>
          )}
        </div>

        {!isActive && (
          <Badge variant="neutral" size="sm">
            Inactive
          </Badge>
        )}
      </div>
    </div>
  );
};

UserCard.displayName = 'UserCard';
