import { ReactNode } from 'react';
import type { SortDirection } from './common.types';

/**
 * Column definition for DataTable
 */
export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: unknown, row: T, index: number) => ReactNode;
  headerRender?: () => ReactNode;
  cellClassName?: string | ((row: T) => string);
  headerClassName?: string;
}

/**
 * Table configuration
 */
export interface TableConfig<T = Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: string;
  rowKey?: string | ((row: T) => string);
  selectable?: boolean;
  selectedRows?: string[];
  onRowSelect?: (selectedIds: string[]) => void;
  onRowClick?: (row: T) => void;
  sortConfig?: {
    field: string;
    direction: SortDirection;
  };
  onSort?: (field: string) => void;
  className?: string;
}

/**
 * Table action for bulk operations
 */
export interface TableAction {
  label: string;
  icon?: string;
  variant?: 'primary' | 'secondary' | 'danger';
  onClick: (selectedIds: string[]) => void;
  disabled?: boolean;
}

/**
 * Filter value types
 */
export type FilterValue = 
  | string 
  | number 
  | boolean 
  | null
  | Date
  | { start: string; end: string } // For date ranges
  | string[] 
  | number[];

/**
 * Table filter definition
 * ✅ Fixed: Options now match DropdownOption type
 */
export interface TableFilter {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'daterange' | 'number';
  options?: Array<{ label: string; value: string | number }>; // ✅ Removed boolean
  placeholder?: string;
  value?: FilterValue;
}

/**
 * Export format options
 */
export type ExportFormat = 'csv' | 'excel' | 'pdf';

/**
 * Export configuration
 */
export interface ExportConfig {
  format: ExportFormat;
  filename?: string;
  columns?: string[]; // Column keys to export
  includeHeaders?: boolean;
}
