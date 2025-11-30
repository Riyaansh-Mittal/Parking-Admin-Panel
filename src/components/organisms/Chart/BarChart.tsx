import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { chartTheme } from '@theme/chartTheme';

interface BarChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  bars: Array<{
    key: string;
    name: string;
    color?: string;
  }>;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  stacked?: boolean;
}

export const BarChart = ({
  data,
  xKey,
  bars,
  height = 300,
  showGrid = true,
  showLegend = true,
  stacked = false,
}: BarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsBarChart data={data}>
        {showGrid && (
          <CartesianGrid
            strokeDasharray={chartTheme.grid.strokeDasharray}
            stroke={chartTheme.grid.stroke}
          />
        )}
        <XAxis
          dataKey={xKey}
          stroke={chartTheme.axis.stroke}
          tick={chartTheme.axis.tick}
        />
        <YAxis stroke={chartTheme.axis.stroke} tick={chartTheme.axis.tick} />
        <Tooltip contentStyle={chartTheme.tooltip.contentStyle} />
        {showLegend && <Legend {...chartTheme.legend} />}
        {bars.map((bar, index) => (
          <Bar
            key={bar.key}
            dataKey={bar.key}
            name={bar.name}
            fill={bar.color || chartTheme.colorPalette[index % chartTheme.colorPalette.length]}
            stackId={stacked ? 'stack' : undefined}
            radius={[4, 4, 0, 0]}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

BarChart.displayName = 'BarChart';
