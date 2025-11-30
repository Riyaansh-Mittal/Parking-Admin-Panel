import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { chartTheme } from '@theme/chartTheme';

interface LineChartProps {
  data: Record<string, unknown>[];
  xKey: string;
  lines: Array<{
    key: string;
    name: string;
    color?: string;
  }>;
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
}

export const LineChart = ({
  data,
  xKey,
  lines,
  height = 300,
  showGrid = true,
  showLegend = true,
}: LineChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsLineChart data={data}>
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
        {lines.map((line, index) => (
          <Line
            key={line.key}
            type="monotone"
            dataKey={line.key}
            name={line.name}
            stroke={line.color || chartTheme.colorPalette[index % chartTheme.colorPalette.length]}
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

LineChart.displayName = 'LineChart';
