import { Card } from '@/components/organisms/Card';
import { CardBody } from '@/components/organisms/Card';
import { Icon } from '@/components/atoms/Icon';

export const BalanceStatsCard = () => {
  // TODO: Implement when stats API endpoint is available
  // For now, showing placeholder

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardBody>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Users</p>
              <p className="text-2xl font-bold text-slate-900">-</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Icon name="Users" className="text-blue-600" />
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Total Balance</p>
              <p className="text-2xl font-bold text-slate-900">-</p>
            </div>
            <div className="p-3 bg-emerald-100 rounded-lg">
              <Icon name="DollarSign" className="text-emerald-600" />
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Base Total</p>
              <p className="text-2xl font-bold text-slate-900">-</p>
            </div>
            <div className="p-3 bg-indigo-100 rounded-lg">
              <Icon name="Wallet" className="text-indigo-600" />
            </div>
          </div>
        </CardBody>
      </Card>

      <Card>
        <CardBody>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">Bonus Total</p>
              <p className="text-2xl font-bold text-slate-900">-</p>
            </div>
            <div className="p-3 bg-amber-100 rounded-lg">
              <Icon name="Gift" className="text-amber-600" />
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
