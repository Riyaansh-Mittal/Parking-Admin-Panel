import { Card, CardHeader, CardBody } from '@/components/organisms/Card';
import { Badge } from '@/components/atoms/Badge';
import { Icon } from '@/components/atoms/Icon';
import type { Balance, RecentChange } from '@/features/balances/types';
import { getResetTypeConfig } from '@/features/balances/types';
import { formatCurrency, formatDate, formatDateTime } from '@/utils/formatters';

interface BalanceDetailCardProps {
  balance: Balance;
  recentChanges: RecentChange[];
  loading?: boolean;
}

export const BalanceDetailCard = ({ balance, recentChanges, loading }: BalanceDetailCardProps) => {
  if (loading) {
    return (
      <Card>
        <CardBody>
          <div className="animate-pulse space-y-4">
            <div className="h-20 bg-slate-200 rounded"></div>
            <div className="h-40 bg-slate-200 rounded"></div>
          </div>
        </CardBody>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Balance Summary Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Balance Summary</h3>
            <Icon name="DollarSign" size="md" className="text-slate-400" />
          </div>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Base Balance */}
            <div className="space-y-1">
              <p className="text-sm text-slate-500">Base Balance</p>
              <p className="text-2xl font-bold text-slate-900">
                {formatCurrency(balance.base_balance)}
              </p>
            </div>

            {/* Bonus Balance */}
            <div className="space-y-1">
              <p className="text-sm text-slate-500">Bonus Balance</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(balance.bonus_balance)}
              </p>
            </div>

            {/* Total Balance */}
            <div className="space-y-1">
              <p className="text-sm text-slate-500">Total Balance</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(balance.total_balance)}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <Icon name="Clock" size="sm" />
              <span>Last Reset: {formatDateTime(balance.last_reset)}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Icon name="Calendar" size="sm" />
              <span>Created: {formatDate(balance.created_at)}</span>
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Recent Changes Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Recent Changes</h3>
            <Badge variant="neutral">{recentChanges.length} changes</Badge>
          </div>
        </CardHeader>
        <CardBody>
          {recentChanges.length === 0 ? (
            <div className="text-center py-8 text-slate-500">
              <Icon name="Info" size="lg" className="mx-auto mb-2 text-slate-400" />
              <p>No recent balance changes</p>
            </div>
          ) : (
            <div className="space-y-4">
              {recentChanges.map((change) => {
                const typeConfig = getResetTypeConfig(change.reset_type);
                const isPositive = parseFloat(change.reset_amount) >= 0;

                return (
                  <div
                    key={change.id}
                    className="flex items-start gap-4 p-4 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    {/* Icon */}
                    <div className={`
                      flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center
                      ${isPositive ? 'bg-green-100' : 'bg-red-100'}
                    `}>
                      <Icon 
                        name={typeConfig.icon} 
                        size="sm" 
                        className={isPositive ? 'text-green-600' : 'text-red-600'}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant={typeConfig.variant} size="sm">
                          {typeConfig.label}
                        </Badge>
                        <span className="text-xs text-slate-500">
                          {formatDateTime(change.created_at)}
                        </span>
                      </div>

                      <p className="text-sm text-slate-600 mb-2">
                        {change.notes}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-slate-500">
                        <span>
                          Previous: <span className="font-medium text-slate-700">
                            {formatCurrency(change.previous_balance)}
                          </span>
                        </span>
                        <Icon name="ArrowRight" size="sm" className="text-slate-400" />
                        <span>
                          New: <span className="font-medium text-slate-700">
                            {formatCurrency(change.new_balance)}
                          </span>
                        </span>
                      </div>
                    </div>

                    {/* Amount Badge */}
                    <div className="flex-shrink-0">
                      <span className={`
                        text-lg font-bold
                        ${isPositive ? 'text-green-600' : 'text-red-600'}
                      `}>
                        {isPositive ? '+' : ''}{formatCurrency(change.reset_amount)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};
