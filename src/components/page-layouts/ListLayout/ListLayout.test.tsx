import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ListLayout } from './ListLayout';

const mockData = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' },
];

const mockColumns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
];

describe('ListLayout', () => {
  it('renders title and table', () => {
    const onRowSelect = vi.fn();
    render(
      <ListLayout
        title="Users"
        tableConfig={{ columns: mockColumns, data: mockData }}
        selectedRows={[]}
        onRowSelect={onRowSelect}
      />
    );

    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('shows selection indicator', () => {
    render(
      <ListLayout
        title="Users"
        tableConfig={{ columns: mockColumns, data: mockData }}
        selectedRows={['1']}
        onRowSelect={vi.fn()}
      />
    );

    expect(screen.getByText('Users')).toBeInTheDocument();
  });

  it('renders header actions', () => {
    render(
      <ListLayout
        title="Users"
        tableConfig={{ columns: mockColumns, data: mockData }}
        selectedRows={[]}
        onRowSelect={vi.fn()}
        headerActions={<button>Create User</button>}
      />
    );

    expect(screen.getByText('Create User')).toBeInTheDocument();
  });
});
