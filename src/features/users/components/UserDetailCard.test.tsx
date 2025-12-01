import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { UserDetailCard } from './UserDetailCard';

const mockUser = {
  id: '1',
  user_id: 'user_123',
  username: 'john_doe',
  email: 'john@example.com',
  first_name: 'John',
  last_name: 'Doe',
  full_name: 'John Doe',
  phone_number: '+1234567890',
  phone_verified: true,
  email_verified: true,
  license_plate_number: 'ABC123',
  vehicle_type: 'sedan',
  vehicle_model: 'Tesla Model 3',
  is_active: true,
  created_at: '2025-11-01T10:00:00Z',
  updated_at: '2025-11-01T10:00:00Z',
  profile_status: {
    is_complete: true,
    can_scan_qr: true,
    has_vehicle: true,
  },
};

describe('UserDetailCard', () => {
  it('renders user details correctly', () => {
    render(<UserDetailCard user={mockUser} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('ABC123')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('shows profile status badges', () => {
    render(<UserDetailCard user={mockUser} />);

    expect(screen.getByText('Complete')).toBeInTheDocument();
    expect(screen.getByText('Has Vehicle')).toBeInTheDocument();
    expect(screen.getByText('Can Scan QR')).toBeInTheDocument();
  });
});
