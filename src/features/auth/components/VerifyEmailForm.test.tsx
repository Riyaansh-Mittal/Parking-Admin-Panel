import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { VerifyEmailForm } from './VerifyEmailForm';
import authReducer from '@redux/slices/authSlice';

const createMockStore = (initialState = {}) =>
  configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        isAuthenticated: false,
        user: null,
        accessToken: null,
        refreshToken: null,
        loading: true, // ✅ Start with loading state
        error: null,
        ...initialState,
      },
    },
  });

describe('VerifyEmailForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('shows loading state initially', async () => {
    const store = createMockStore({ loading: true });
    
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/verify-email?token=test-token']}>
          <VerifyEmailForm />
        </MemoryRouter>
      </Provider>
    );

    // Wait for component to render
    await waitFor(() => {
      expect(screen.getByText(/verifying your email/i)).toBeInTheDocument();
    });
  });

  it('shows error state on failure', async () => {
    const store = createMockStore({ 
      loading: false, 
      error: 'Invalid verification token' 
    });
    
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/verify-email?token=invalid']}>
          <VerifyEmailForm />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/verification failed/i)).toBeInTheDocument();
    });
  });
});
