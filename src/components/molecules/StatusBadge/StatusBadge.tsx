import { Badge } from '@components/atoms/Badge';
import type { BadgeProps } from '@components/atoms/Badge';

export type Status =
  | 'active'
  | 'inactive'
  | 'pending'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'expired'
  | 'suspended';

export interface StatusBadgeProps extends Omit<BadgeProps, 'variant'> {
  status: Status;
}

const statusConfig: Record<
  Status,
  { variant: BadgeProps['variant']; label: string }
> = {
  active: { variant: 'success', label: 'Active' },
  inactive: { variant: 'neutral', label: 'Inactive' },
  pending: { variant: 'warning', label: 'Pending' },
  completed: { variant: 'success', label: 'Completed' },
  failed: { variant: 'error', label: 'Failed' },
  cancelled: { variant: 'neutral', label: 'Cancelled' },
  expired: { variant: 'error', label: 'Expired' },
  suspended: { variant: 'warning', label: 'Suspended' },
};

export const StatusBadge = ({ status, ...props }: StatusBadgeProps) => {
  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} dot {...props}>
      {config.label}
    </Badge>
  );
};

StatusBadge.displayName = 'StatusBadge';
