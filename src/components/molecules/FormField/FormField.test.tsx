import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FormField } from './FormField';
import { Input } from '@components/atoms/Input';

describe('FormField', () => {
  it('renders with label and input', () => {
    render(
      <FormField label="Email">
        <Input placeholder="Enter email" />
      </FormField>
    );

    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
  });

  it('displays required indicator', () => {
    render(
      <FormField label="Username" required>
        <Input />
      </FormField>
    );

    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('displays error message', () => {
    render(
      <FormField label="Email" error="Email is required">
        <Input />
      </FormField>
    );

    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  it('displays hint text when no error', () => {
    render(
      <FormField label="Username" hint="Choose a unique username">
        <Input />
      </FormField>
    );

    expect(screen.getByText('Choose a unique username')).toBeInTheDocument();
  });

  it('displays helperText when no error', () => {
    render(
      <FormField label="Password" helperText="At least 8 characters">
        <Input type="password" />
      </FormField>
    );

    expect(screen.getByText('At least 8 characters')).toBeInTheDocument();
  });

  it('prioritizes error over hint text', () => {
    render(
      <FormField
        label="Email"
        error="Invalid email"
        hint="Enter your email"
      >
        <Input />
      </FormField>
    );

    expect(screen.getByText('Invalid email')).toBeInTheDocument();
    expect(screen.queryByText('Enter your email')).not.toBeInTheDocument();
  });

  it('renders without label', () => {
    render(
      <FormField>
        <Input placeholder="No label input" />
      </FormField>
    );

    expect(screen.getByPlaceholderText('No label input')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <FormField label="Test" className="custom-field">
        <Input />
      </FormField>
    );

    const fieldDiv = container.firstChild;
    expect(fieldDiv).toHaveClass('custom-field');
  });
});
