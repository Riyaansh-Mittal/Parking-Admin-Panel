import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Sidebar } from './Sidebar';
import uiReducer from '@redux/slices/uiSlice';

const createMockStore = () =>
  configureStore({
    reducer: {
      ui: uiReducer,
    },
    preloadedState: {
      ui: {
        sidebarCollapsed: false,
        theme: 'light' as const, // ✅ Fix here too
        currentPage: 'Dashboard',
        breadcrumbs: [],
      },
    },
  });

describe('Sidebar', () => {
  it('renders sidebar with navigation items', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Sidebar />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Admin Panel')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Users')).toBeInTheDocument();
  });
});
