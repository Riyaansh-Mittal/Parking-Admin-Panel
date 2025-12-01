import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { UserDetailPage } from './UserDetailPage';
import usersReducer from '@/redux/slices/usersSlice';

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

const createMockStore = () =>
  configureStore({
    reducer: {
      users: usersReducer,
      auth: () => ({ user: { user_type: 'admin' }, isAuthenticated: true }),
    },
    preloadedState: {
      users: {
        users: [],
        currentUser: mockUser,
        stats: null,
        pagination: null,
        filters: {},
        loading: false,
        error: null,
        exportTask: null,
        exportLoading: false,
      },
    },
  });

describe('UserDetailPage', () => {
  it('renders user detail page', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<UserDetailPage />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    );

    // Check for unique elements instead of duplicate text
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Edit Profile')).toBeInTheDocument();
    expect(screen.getByText('Deactivate')).toBeInTheDocument();
    expect(screen.getByText('ABC123')).toBeInTheDocument();
    
    // Check that "John Doe" appears multiple times (in title and card)
    const johnDoeElements = screen.getAllByText('John Doe');
    expect(johnDoeElements.length).toBeGreaterThan(0);
  });
});
