import { Card, CardHeader, CardBody } from '@/components/organisms/Card';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { StatusBreakdown } from '../types';

interface StatusBreakdownChartProps {
  data: StatusBreakdown | null;  // Change from StatusBreakdown[]
  loading?: boolean;
}

const STATUS_COLORS: Record<string, string> = {
  completed: '#10b981',
  in_progress: '#3b82f6',
  failed: '#ef4444',
  cancelled: '#94a3b8',
  pending: '#f59e0b',
};

export const StatusBreakdownChart = ({ data, loading }: StatusBreakdownChartProps) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Call Status Breakdown</h3>
        </CardHeader>
        <CardBody>
          <div className="flex h-80 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"></div>
          </div>
        </CardBody>
      </Card>
    );
  }

  if (!data || !data.status_breakdown) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Call Status Breakdown</h3>
        </CardHeader>
        <CardBody>
          <div className="flex h-80 items-center justify-center text-slate-500">
            No status data available
          </div>
        </CardBody>
      </Card>
    );
  }

  // Convert object to array
  const statusArray = Object.entries(data.status_breakdown)
    .filter(([key]) => key !== 'total')
    .map(([status, count]) => ({
      status,
      count: count as number,
      percentage: (count as number / data.status_breakdown.total) * 100,
    }));

  const chartData = statusArray.map((item) => ({
    name: item.status.replace('_', ' ').toUpperCase(),
    value: item.count,
    percentage: item.percentage,
  }));

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Call Status Breakdown</h3>
        <p className="text-sm text-slate-600">Distribution by call status</p>
      </CardHeader>
      <CardBody>
        <ResponsiveContainer width="100%" height={320}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ percentage }) => `${percentage.toFixed(1)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((_, index) => {
                const status = statusArray[index].status;
                return (
                  <Cell
                    key={`cell-${index}`}
                    fill={STATUS_COLORS[status] || '#94a3b8'}
                  />
                );
              })}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string, props: any) => [
                `${value.toLocaleString()} (${props.payload.percentage.toFixed(1)}%)`,
                name,
              ]}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>

        <div className="mt-4 space-y-2">
          {statusArray.map((item) => (
            <div
              key={item.status}
              className="flex items-center justify-between border-b border-slate-100 py-2"
            >
              <div className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded"
                  style={{ backgroundColor: STATUS_COLORS[item.status] || '#94a3b8' }}
                />
                <span className="text-sm font-medium text-slate-700">
                  {item.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-slate-600">
                  {item.count.toLocaleString()}
                </span>
                <span className="text-sm font-semibold text-slate-900">
                  {item.percentage.toFixed(1)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  );
};
