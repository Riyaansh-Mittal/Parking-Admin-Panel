import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { TopBar } from './TopBar';
import authReducer from '@redux/slices/authSlice';
import uiReducer from '@redux/slices/uiSlice';
import notificationReducer from '@redux/slices/notificationSlice';

const createMockStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      ui: uiReducer,
      notifications: notificationReducer,
    },
    preloadedState: {
      auth: {
        isAuthenticated: true,
        user: {
          admin_id: '1',
          email: 'admin@example.com',
          first_name: 'Admin',
          last_name: 'User',
          full_name: 'Admin User',
          user_type: 'admin' as const, // ✅ Use 'as const' for literal type
          is_superuser: false,
        },
        accessToken: 'token',
        refreshToken: 'refresh',
        loading: false,
        error: null,
      },
      ui: {
        sidebarCollapsed: false,
        theme: 'light' as const, // ✅ Use 'as const' for literal type
        currentPage: 'Dashboard',
        breadcrumbs: [],
      },
      notifications: {
        notifications: [],
      },
    },
  });

describe('TopBar', () => {
  it('renders topbar with breadcrumbs', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <TopBar />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByLabelText('Notifications')).toBeInTheDocument();
    expect(screen.getByLabelText('Profile menu')).toBeInTheDocument();
  });
});
