import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { UsersListPage } from './UsersListPage';
import usersReducer from '@/redux/slices/usersSlice';

const createMockStore = () =>
  configureStore({
    reducer: {
      users: usersReducer,
      auth: () => ({ user: { user_type: 'admin' }, isAuthenticated: true }),
    },
    preloadedState: {
      users: {
        users: [],
        currentUser: null,
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

describe('UsersListPage', () => {
  it('renders users list page', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <UsersListPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Users')).toBeInTheDocument();
    expect(screen.getByText('Manage and monitor all registered users')).toBeInTheDocument();
  });

  it('shows export button', () => {
    const store = createMockStore();

    render(
      <Provider store={store}>
        <BrowserRouter>
          <UsersListPage />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Export Users')).toBeInTheDocument();
  });
});
