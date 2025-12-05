import { Card, CardHeader, CardBody } from '@/components/organisms/Card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface TrendData {
  date: string;
  value: number;
  comparison_value?: number;
}

interface TrendsChartProps {
  data: TrendData[];
  title: string;
  valueLabel: string;
  loading?: boolean;
}

export const TrendsChart = ({ data, title, valueLabel, loading }: TrendsChartProps) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">{title}</h3>
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
          <h3 className="text-lg font-semibold">{title}</h3>
        </CardHeader>
        <CardBody>
          <div className="flex h-80 items-center justify-center text-slate-500">
            No data available
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
    [valueLabel]: item.value,
    ...(item.comparison_value !== undefined && {
      'Previous Period': item.comparison_value,
    }),
  }));

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">{title}</h3>
      </CardHeader>
      <CardBody>
        <ResponsiveContainer width="100%" height={320}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorComparison" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="date"
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickLine={{ stroke: '#cbd5e1' }}
            />
            <YAxis
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickLine={{ stroke: '#cbd5e1' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
              }}
            />
            <Area
              type="monotone"
              dataKey={valueLabel}
              stroke="#6366f1"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorValue)"
            />
            {chartData[0]?.['Previous Period'] !== undefined && (
              <Area
                type="monotone"
                dataKey="Previous Period"
                stroke="#94a3b8"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorComparison)"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
};
