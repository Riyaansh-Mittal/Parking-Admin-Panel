import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from './Input';

describe('Input', () => {
  it('renders input element', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('applies error styles when error prop is true', () => {
    render(<Input error placeholder="Error input" />);
    const input = screen.getByPlaceholderText('Error input');
    expect(input).toHaveClass('border-rose-500');
  });

  it('displays helper text', () => {
    render(<Input helperText="This is helper text" />);
    expect(screen.getByText('This is helper text')).toBeInTheDocument();
  });

  it('displays error helper text with error styling', () => {
    render(<Input error helperText="This is an error" />);
    const helperText = screen.getByText('This is an error');
    expect(helperText).toHaveClass('text-rose-500');
  });

  it('handles onChange events', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(handleChange).toHaveBeenCalled();
  });

  it('disables input when disabled prop is true', () => {
    render(<Input disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('renders with left icon', () => {
    render(
      <Input leftIcon={<span data-testid="left-icon">🔍</span>} />
    );
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders with right icon', () => {
    render(
      <Input rightIcon={<span data-testid="right-icon">✓</span>} />
    );
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('applies fullWidth class', () => {
    render(<Input fullWidth data-testid="input" />);
    const inputWrapper = screen.getByTestId('input').parentElement;
    expect(inputWrapper).toHaveClass('w-full');
  });
});
