import { Icon } from '@components/atoms/Icon';
import { cn } from '@utils';
import { formatNumber, formatPercentage } from '@utils/formatters';
import type { IconName } from '@components/atoms/Icon';

export interface StatCardProps {
  title: string;
  value: string | number;
  icon?: IconName;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
  valuePrefix?: string;
  valueSuffix?: string;
  loading?: boolean;
  className?: string;
}

export const StatCard = ({
  title,
  value,
  icon,
  trend,
  subtitle,
  valuePrefix,
  valueSuffix,
  loading = false,
  className,
}: StatCardProps) => {
  const formattedValue =
    typeof value === 'number' ? formatNumber(value) : value;

  return (
    <div
      className={cn(
        'rounded-lg border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-slate-600">{title}</p>

          {loading ? (
            <div className="mt-2 h-8 w-32 animate-pulse rounded bg-slate-200" />
          ) : (
            <div className="mt-2 flex items-baseline gap-1">
              {valuePrefix && (
                <span className="text-xl font-semibold text-slate-400">
                  {valuePrefix}
                </span>
              )}
              <p className="text-3xl font-bold text-slate-900">
                {formattedValue}
              </p>
              {valueSuffix && (
                <span className="text-xl font-semibold text-slate-400">
                  {valueSuffix}
                </span>
              )}
            </div>
          )}

          {trend && !loading && (
            <div
              className={cn(
                'mt-2 inline-flex items-center gap-1 text-sm font-medium',
                trend.isPositive ? 'text-emerald-600' : 'text-rose-600'
              )}
            >
              <Icon
                name={trend.isPositive ? 'TrendingUp' : 'TrendingDown'}
                size="sm"
              />
              <span>{formatPercentage(Math.abs(trend.value))}</span>
            </div>
          )}

          {subtitle && !loading && (
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          )}
        </div>

        {icon && (
          <div className="rounded-lg bg-indigo-50 p-3">
            <Icon name={icon} size="lg" className="text-indigo-600" />
          </div>
        )}
      </div>
    </div>
  );
};

StatCard.displayName = 'StatCard';
