import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Alert } from './Alert';

describe('Alert', () => {
  it('renders alert with children', () => {
    render(<Alert>Test alert message</Alert>);
    expect(screen.getByText('Test alert message')).toBeInTheDocument();
  });

  it('renders different variants', () => {
    const { rerender } = render(<Alert variant="success">Success message</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('bg-emerald-50');

    rerender(<Alert variant="error">Error message</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('bg-rose-50');
  });

  it('calls onClose when close button is clicked', async () => {
    const handleClose = vi.fn();
    const user = userEvent.setup();

    render(<Alert onClose={handleClose}>Closable alert</Alert>);

    const closeButton = screen.getByLabelText('Close alert');
    await user.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
