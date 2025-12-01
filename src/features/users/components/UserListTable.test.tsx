import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { UserListTable } from './UserListTable';

const mockUsers = [
  {
    user_id: '1',
    user_name: 'john_doe',
    full_name: 'John Doe',
    email: 'john@example.com',
    phone_number: '+1234567890',
    is_active: true,
    email_verified: true,
    phone_verified: false,
    has_vehicle: true,
    license_plate: 'ABC123',
    created_at: '2025-11-01T10:00:00Z',
  },
];

describe('UserListTable', () => {
  it('renders user data correctly', () => {
    const onStatusChange = vi.fn();

    render(
      <BrowserRouter>
        <UserListTable users={mockUsers} loading={false} onStatusChange={onStatusChange} />
      </BrowserRouter>
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('ABC123')).toBeInTheDocument();
  });

  it('shows empty message when no users', () => {
    const onStatusChange = vi.fn();

    render(
      <BrowserRouter>
        <UserListTable users={[]} loading={false} onStatusChange={onStatusChange} />
      </BrowserRouter>
    );

    expect(screen.getByText('No users found')).toBeInTheDocument();
  });
});
