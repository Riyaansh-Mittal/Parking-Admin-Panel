import { cn } from '@utils';
import type { TableColumn } from '@types';

interface TableCellProps<T = Record<string, unknown>> {
  column: TableColumn<T>;
  row: T;
  index: number;
}

export function TableCell<T extends Record<string, unknown>>({
  column,
  row,
  index,
}: TableCellProps<T>) {
  const value = row[column.key as keyof T];

  const cellClassName =
    typeof column.cellClassName === 'function'
      ? column.cellClassName(row)
      : column.cellClassName;

  return (
    <td
      className={cn(
        'px-4 py-3 text-sm text-slate-900',
        cellClassName
      )}
      style={{
        width: column.width,
        minWidth: column.minWidth,
        maxWidth: column.maxWidth,
        textAlign: column.align || 'left',
      }}
    >
      {column.render ? column.render(value, row, index) : String(value ?? '')}
    </td>
  );
}

TableCell.displayName = 'TableCell';
