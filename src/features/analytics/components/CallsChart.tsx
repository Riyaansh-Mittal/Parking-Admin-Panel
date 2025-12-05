import { Card, CardHeader, CardBody } from '@/components/organisms/Card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface CallData {
  date: string;
  count: number;
}

interface CallsChartProps {
  data: CallData[];
  loading?: boolean;
}

export const CallsChart = ({ data, loading }: CallsChartProps) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Call Volume</h3>
        </CardHeader>
        <CardBody>
          <div className="flex h-80 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"></div>
          </div>
        </CardBody>
      </Card>
    );
  }

  // Check if data is empty OR all counts are zero
  const hasData = data.length > 0 && data.some((item) => item.count > 0);

  if (!hasData) {
    return (
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Call Volume</h3>
        </CardHeader>
        <CardBody>
          <div className="flex h-80 flex-col items-center justify-center text-center">
            <div className="mb-2 text-4xl">📊</div>
            <p className="text-slate-600 font-medium">No call data available</p>
            <p className="text-sm text-slate-500 mt-1">
              Call volume will appear here once users start making calls
            </p>
          </div>
        </CardBody>
      </Card>
    );
  }

  const chartData = data.map((item) => ({
    date: item.date === 'Today' || item.date === 'This Week' || item.date === 'This Month'
      ? item.date
      : new Date(item.date).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
    'Total Calls': item.count,
  }));

  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-semibold">Call Volume</h3>
        <p className="text-sm text-slate-600">Daily call activity</p>
      </CardHeader>
      <CardBody>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="date"
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickLine={{ stroke: '#cbd5e1' }}
            />
            <YAxis
              tick={{ fill: '#64748b', fontSize: 12 }}
              tickLine={{ stroke: '#cbd5e1' }}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
              }}
            />
            <Legend />
            <Bar dataKey="Total Calls" fill="#6366f1" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardBody>
    </Card>
  );
};
