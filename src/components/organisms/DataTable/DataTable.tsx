import { useState, useMemo } from 'react';
import { Checkbox } from '@components/atoms/Checkbox';
import { Spinner } from '@components/atoms/Spinner';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { cn } from '@utils';
import type { TableConfig } from '@types';

export type DataTableProps<T = Record<string, unknown>> = TableConfig<T>;

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  loading = false,
  emptyMessage = 'No data available',
  rowKey = 'id',
  selectable = false,
  selectedRows = [],
  onRowSelect,
  onRowClick,
  sortConfig,
  onSort,
  className,
}: DataTableProps<T>) {
  const [localSelectedRows, setLocalSelectedRows] = useState<string[]>(
    selectedRows
  );

  const selectedRowIds = useMemo(
    () => (onRowSelect ? selectedRows : localSelectedRows),
    [onRowSelect, selectedRows, localSelectedRows]
  );

  const getRowKey = (row: T): string => {
    if (typeof rowKey === 'function') {
      return rowKey(row);
    }
    return String(row[rowKey]);
  };

  const handleSelectAll = (checked: boolean) => {
    const allIds = data.map(getRowKey);
    const newSelection = checked ? allIds : [];

    if (onRowSelect) {
      onRowSelect(newSelection);
    } else {
      setLocalSelectedRows(newSelection);
    }
  };

  const handleSelectRow = (rowId: string, checked: boolean) => {
    const newSelection = checked
      ? [...selectedRowIds, rowId]
      : selectedRowIds.filter((id) => id !== rowId);

    if (onRowSelect) {
      onRowSelect(newSelection);
    } else {
      setLocalSelectedRows(newSelection);
    }
  };

  const allSelected =
    data.length > 0 && selectedRowIds.length === data.length;
  const someSelected = selectedRowIds.length > 0 && !allSelected;

  return (
    <div className={cn('w-full overflow-x-auto rounded-lg border border-slate-200', className)}>
      <table className="w-full border-collapse">
        <thead className="bg-slate-50">
          <tr>
            {selectable && (
              <th className="w-12 border-b border-slate-200 px-4 py-3 text-left">
                <Checkbox
                  checked={allSelected}
                  onChange={(e) => handleSelectAll(e.target.checked)}
                  aria-label="Select all rows"
                  className={cn(someSelected && 'opacity-50')}
                />
              </th>
            )}
            {columns.map((column) => (
              <TableHeader
                key={column.key}
                column={column}
                sortConfig={sortConfig}
                onSort={onSort}
              />
            ))}
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="border-b border-slate-200 px-4 py-8 text-center"
              >
                <div className="flex items-center justify-center gap-2">
                  <Spinner size="md" />
                  <span className="text-sm text-slate-600">Loading...</span>
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td
                colSpan={columns.length + (selectable ? 1 : 0)}
                className="border-b border-slate-200 px-4 py-8 text-center text-sm text-slate-500"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => {
              const rowId = getRowKey(row);
              const isSelected = selectedRowIds.includes(rowId);

              return (
                <TableRow
                  key={rowId}
                  row={row}
                  index={index}
                  columns={columns}
                  selectable={selectable}
                  isSelected={isSelected}
                  onSelect={(checked) => handleSelectRow(rowId, checked)}
                  onClick={onRowClick}
                />
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}

DataTable.displayName = 'DataTable';
