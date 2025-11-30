import { Checkbox } from '@components/atoms/Checkbox';
import { TableCell } from './TableCell';
import { cn } from '@utils';
import type { TableColumn } from '@types';

interface TableRowProps<T = Record<string, unknown>> {
  row: T;
  index: number;
  columns: TableColumn<T>[];
  selectable: boolean;
  isSelected: boolean;
  onSelect: (checked: boolean) => void;
  onClick?: (row: T) => void;
}

export function TableRow<T extends Record<string, unknown>>({
  row,
  index,
  columns,
  selectable,
  isSelected,
  onSelect,
  onClick,
}: TableRowProps<T>) {
  const handleRowClick = () => {
    if (onClick) {
      onClick(row);
    }
  };

  return (
    <tr
      className={cn(
        'border-b border-slate-200 transition-colors',
        isSelected && 'bg-indigo-50',
        onClick && 'cursor-pointer hover:bg-slate-50'
      )}
      onClick={handleRowClick}
    >
      {selectable && (
        <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={isSelected}
            onChange={(e) => onSelect(e.target.checked)}
            aria-label={`Select row ${index + 1}`}
          />
        </td>
      )}
      {columns.map((column) => (
        <TableCell
          key={column.key}
          column={column}
          row={row}
          index={index}
        />
      ))}
    </tr>
  );
}

TableRow.displayName = 'TableRow';
