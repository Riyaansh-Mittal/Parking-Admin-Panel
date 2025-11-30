import { useState } from 'react';
import { Modal } from '@components/organisms/Modal';
import { Button } from '@components/atoms/Button';
import { Radio } from '@components/atoms/Radio';
import { Checkbox } from '@components/atoms/Checkbox';
import { Icon } from '@components/atoms/Icon';
import type { ExportFormat, ExportConfig } from '@types';

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (config: ExportConfig) => void;
  availableColumns: Array<{ key: string; label: string }>;
  loading?: boolean;
}

export const ExportDialog = ({
  isOpen,
  onClose,
  onExport,
  availableColumns,
  loading = false,
}: ExportDialogProps) => {
  const [format, setFormat] = useState<ExportFormat>('csv');
  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    availableColumns.map((col) => col.key)
  );
  const [includeHeaders, setIncludeHeaders] = useState(true);

  const handleColumnToggle = (columnKey: string) => {
    setSelectedColumns((prev) =>
      prev.includes(columnKey)
        ? prev.filter((key) => key !== columnKey)
        : [...prev, columnKey]
    );
  };

  const handleSelectAll = () => {
    setSelectedColumns(availableColumns.map((col) => col.key));
  };

  const handleDeselectAll = () => {
    setSelectedColumns([]);
  };

  const handleExport = () => {
    onExport({
      format,
      columns: selectedColumns,
      includeHeaders,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <Modal.Header onClose={onClose}>Export Data</Modal.Header>

      <Modal.Body>
        <div className="space-y-6">
          {/* Format Selection */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-slate-900">
              Export Format
            </h3>
            <div className="space-y-2">
              <Radio
                name="format"
                value="csv"
                checked={format === 'csv'}
                onChange={() => setFormat('csv')}
                label="CSV - Comma Separated Values"
              />
              <Radio
                name="format"
                value="excel"
                checked={format === 'excel'}
                onChange={() => setFormat('excel')}
                label="Excel - Microsoft Excel Format"
              />
              <Radio
                name="format"
                value="pdf"
                checked={format === 'pdf'}
                onChange={() => setFormat('pdf')}
                label="PDF - Portable Document Format"
              />
            </div>
          </div>

          {/* Column Selection */}
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900">
                Select Columns
              </h3>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSelectAll}
                >
                  Select All
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleDeselectAll}
                >
                  Deselect All
                </Button>
              </div>
            </div>

            <div className="max-h-60 space-y-2 overflow-y-auto rounded-lg border border-slate-200 p-3">
              {availableColumns.map((column) => (
                <Checkbox
                  key={column.key}
                  checked={selectedColumns.includes(column.key)}
                  onChange={() => handleColumnToggle(column.key)}
                  label={column.label}
                />
              ))}
            </div>
          </div>

          {/* Options */}
          <div>
            <Checkbox
              checked={includeHeaders}
              onChange={(e) => setIncludeHeaders(e.target.checked)}
              label="Include column headers"
            />
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleExport}
          disabled={selectedColumns.length === 0 || loading}
          loading={loading}
          leftIcon={<Icon name="Download" size="sm" />}
        >
          Export
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ExportDialog.displayName = 'ExportDialog';
