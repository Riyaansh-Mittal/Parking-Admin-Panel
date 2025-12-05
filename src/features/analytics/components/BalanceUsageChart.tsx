import { Card, CardHeader, CardBody } from '@/components/organisms/Card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface BalanceUsageData {
  date: string;
  balance_used: number;
}

interface BalanceUsageChartProps {
  data: BalanceUsageData[];
  loading?: boolean;
}

export const BalanceUsageChart = ({ data, loading }: BalanceUsageChartProps) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Balance Usage Trends</h3>
        </CardHeader>
        <CardBody>
          <div className="flex h-80 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"></div>
          </div>
        </CardBody>
      </Card>
    );
  }

  if (data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Balance Usage Trends</h3>
        </CardHeader>
        <CardBody>
          <div className="flex h-80 items-center justify-center text-slate-500">
            No balance usage data available
          </div>
        </CardBody>
      </Card>
    );
  }

  const chartData = data.map((item) => ({
    date: new Date(item.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    'Balance Used': parseFloat(item.balance_used.toString()),
  }));

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Balance Usage Trends</h3>
        <p className="text-sm text-slate-600">Total calls made over time</p>
      </CardHeader>
      <CardBody>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="date"
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickLine={{ stroke: '#cbd5e1' }}
            />
            <YAxis
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickLine={{ stroke: '#cbd5e1' }}
              tickFormatter={(value) => `${value} calls`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
              }}
              formatter={(value: number) => [`${value} calls`, '']}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }} iconType="line" />
            <Line
              type="monotone"
              dataKey="Balance Used"
              stroke="#6366f1"
              strokeWidth={2}
              dot={{ fill: '#6366f1', r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
};
