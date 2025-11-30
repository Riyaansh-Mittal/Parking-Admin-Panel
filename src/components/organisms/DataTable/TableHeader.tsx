import { Icon } from '@components/atoms/Icon';
import { cn } from '@utils';
import type { TableColumn } from '@types';
import type { SortConfig } from '@types';

interface TableHeaderProps<T = Record<string, unknown>> {
  column: TableColumn<T>;
  sortConfig?: SortConfig;
  onSort?: (field: string) => void;
}

export function TableHeader<T extends Record<string, unknown>>({
  column,
  sortConfig,
  onSort,
}: TableHeaderProps<T>) {
  const isSortable = column.sortable && onSort;
  const isSorted = sortConfig?.field === column.key;
  const sortDirection = isSorted ? sortConfig?.direction : undefined;

  const handleSort = () => {
    if (isSortable) {
      onSort(column.key);
    }
  };

  return (
    <th
      className={cn(
        'border-b border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700',
        isSortable && 'cursor-pointer select-none hover:bg-slate-100',
        column.headerClassName
      )}
      style={{
        width: column.width,
        minWidth: column.minWidth,
        maxWidth: column.maxWidth,
        textAlign: column.align || 'left',
      }}
      onClick={handleSort}
    >
      {column.headerRender ? (
        column.headerRender()
      ) : (
        <div className="flex items-center gap-2">
          <span>{column.label}</span>
          {isSortable && (
            <span className="text-slate-400">
              {isSorted ? (
                <Icon
                  name={sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown'}
                  size="sm"
                />
              ) : (
                <Icon name="ChevronsUpDown" size="sm" />
              )}
            </span>
          )}
        </div>
      )}
    </th>
  );
}

TableHeader.displayName = 'TableHeader';
