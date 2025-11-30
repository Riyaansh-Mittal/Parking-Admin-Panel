import { ReactNode } from 'react';
import { DataTable } from '@components/organisms/DataTable';
import { Icon } from '@components/atoms/Icon';
import { Card, CardBody } from '@components/organisms/Card';
import { BulkActionBar } from '@components/organisms/BulkActionBar';
import type { TableConfig } from '@types';

interface ListLayoutProps<T = Record<string, unknown>> {
  title: string;
  tableConfig: TableConfig<T>;
  selectedRows: string[];
  onRowSelect: (selectedIds: string[]) => void;
  actions?: ReactNode;
  filters?: ReactNode;
  headerActions?: ReactNode;
  bulkActions?: Array<{
    label: string;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'danger';
    disabled?: boolean;
  }>;
}

export const ListLayout = <T extends Record<string, unknown>>({
  title,
  tableConfig,
  selectedRows,
  onRowSelect,
  actions,
  filters,
  headerActions,
  bulkActions = [],
}: ListLayoutProps<T>) => {
  const handleClearSelection = () => {
    onRowSelect([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          {selectedRows.length > 0 && (
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
              <Icon name="CheckSquare" size="sm" />
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3">
          {headerActions}
          {actions}
        </div>
      </div>

      {/* Filters */}
      {filters}

      {/* Table Card */}
      <Card>
        <CardBody className="p-0">
          <DataTable
            {...tableConfig}
            selectable
            selectedRows={selectedRows}
            onRowSelect={onRowSelect}
          />
        </CardBody>
      </Card>

      {/* Bulk Actions */}
      <BulkActionBar
        selectedCount={selectedRows.length}
        totalCount={tableConfig.data.length}
        actions={bulkActions.map((action) => ({
          label: action.label,
          onClick: action.onClick,
          variant: action.variant,
          disabled: action.disabled,
        }))}
        onClearSelection={handleClearSelection}
      />
    </div>
  );
};

ListLayout.displayName = 'ListLayout';
