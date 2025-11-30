import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { chartTheme } from '@theme/chartTheme';

interface PieChartProps {
  data: Array<{ name: string; value: number }>;
  height?: number;
  showLegend?: boolean;
  colors?: string[];
  innerRadius?: number;
}

export const PieChart = ({
  data,
  height = 300,
  showLegend = true,
  colors = chartTheme.colorPalette,
  innerRadius = 0,
}: PieChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
          outerRadius={80}
          innerRadius={innerRadius}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length]}
            />
          ))}
        </Pie>
        <Tooltip contentStyle={chartTheme.tooltip.contentStyle} />
        {showLegend && <Legend {...chartTheme.legend} />}
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};

PieChart.displayName = 'PieChart';
