import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { SetPasswordForm } from './SetPasswordForm';
import authReducer from '@redux/slices/authSlice';

const createMockStore = () =>
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
        loading: false,
        error: null,
      },
    },
  });

describe('SetPasswordForm', () => {
  it('renders set password form', () => {
    const store = createMockStore();
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/set-password?token=test']}>
          <SetPasswordForm />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText('Set Your Password')).toBeInTheDocument();
    // Use placeholder text instead of label
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm your password')).toBeInTheDocument();
  });
});
