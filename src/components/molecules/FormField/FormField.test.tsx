import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormField } from './FormField';

describe('FormField', () => {
  it('renders input with label', () => {
    render(<FormField label="Email" placeholder="Enter email" />);
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
  });

  it('displays required indicator', () => {
    render(<FormField label="Password" required />);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(<FormField label="Email" error="Email is required" />);
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  it('displays helper text when no error', () => {
    render(<FormField label="Username" helperText="Choose a unique username" />);
    expect(screen.getByText('Choose a unique username')).toBeInTheDocument();
  });

  it('prioritizes error over helper text', () => {
    render(
      <FormField
        label="Email"
        error="Invalid email"
        helperText="Enter your email"
      />
    );
    expect(screen.getByText('Invalid email')).toBeInTheDocument();
    expect(screen.queryByText('Enter your email')).not.toBeInTheDocument();
  });

  it('renders with icons', () => {
    render(
      <FormField
        label="Search"
        leftIcon={<span data-testid="left-icon">🔍</span>}
        rightIcon={<span data-testid="right-icon">✓</span>}
      />
    );
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });
});
