import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { DataTable } from './DataTable';

const mockData = [
  { id: '1', name: 'John Doe', email: 'john@example.com', status: 'active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
];

const mockColumns = [
  { key: 'name', label: 'Name', sortable: true },
  { key: 'email', label: 'Email' },
  { key: 'status', label: 'Status' },
];

describe('DataTable', () => {
  it('renders table with data', () => {
    render(<DataTable columns={mockColumns} data={mockData} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<DataTable columns={mockColumns} data={[]} loading />);
    // ✅ Use getByRole instead of getByText to avoid multiple matches
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('shows empty message when no data', () => {
    render(<DataTable columns={mockColumns} data={[]} emptyMessage="No users found" />);
    expect(screen.getByText('No users found')).toBeInTheDocument();
  });

  it('renders selectable rows', () => {
    render(<DataTable columns={mockColumns} data={mockData} selectable />);
    const checkboxes = screen.getAllByRole('checkbox');
    expect(checkboxes.length).toBe(3); // 1 for select all + 2 for rows
  });

  it('handles row selection', () => {
    const onRowSelect = vi.fn();
    render(
      <DataTable
        columns={mockColumns}
        data={mockData}
        selectable
        onRowSelect={onRowSelect}
      />
    );

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]); // Click first row checkbox

    expect(onRowSelect).toHaveBeenCalledWith(['1']);
  });

  it('handles select all', () => {
    const onRowSelect = vi.fn();
    render(
      <DataTable
        columns={mockColumns}
        data={mockData}
        selectable
        onRowSelect={onRowSelect}
      />
    );

    const selectAllCheckbox = screen.getByLabelText('Select all rows');
    fireEvent.click(selectAllCheckbox);

    expect(onRowSelect).toHaveBeenCalledWith(['1', '2']);
  });

  it('handles row click', () => {
    const onRowClick = vi.fn();
    render(
      <DataTable
        columns={mockColumns}
        data={mockData}
        onRowClick={onRowClick}
      />
    );

    const firstRow = screen.getByText('John Doe').closest('tr');
    fireEvent.click(firstRow!);

    expect(onRowClick).toHaveBeenCalledWith(mockData[0]);
  });
});
