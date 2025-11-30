/**
 * Recharts theme configuration
 */
export const chartTheme = {
  colors: {
    primary: '#6366f1', // indigo-500
    secondary: '#0ea5e9', // sky-500
    success: '#10b981', // emerald-500
    warning: '#f59e0b', // amber-500
    danger: '#f43f5e', // rose-500
    neutral: '#64748b', // slate-500
  },
  
  colorPalette: [
    '#6366f1', // indigo
    '#0ea5e9', // sky
    '#10b981', // emerald
    '#f59e0b', // amber
    '#f43f5e', // rose
    '#8b5cf6', // violet
    '#ec4899', // pink
    '#14b8a6', // teal
  ],
  
  grid: {
    strokeDasharray: '3 3',
    stroke: '#e2e8f0', // slate-200
  },
  
  axis: {
    stroke: '#cbd5e1', // slate-300
    tick: {
      fill: '#64748b', // slate-500
      fontSize: 12,
    },
  },
  
  tooltip: {
    contentStyle: {
      backgroundColor: '#ffffff',
      border: '1px solid #e2e8f0',
      borderRadius: '8px',
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    },
    labelStyle: {
      color: '#0f172a', // slate-900
      fontWeight: 600,
    },
  },
  
  legend: {
    iconType: 'circle' as const,
    wrapperStyle: {
      paddingTop: '20px',
    },
  },
};

export type ChartTheme = typeof chartTheme;
