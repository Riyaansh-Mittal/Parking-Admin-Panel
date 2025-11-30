import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Notification } from './Notification';

describe('Notification', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders notification with title and message', () => {
    const onClose = vi.fn();
    render(
      <Notification
        id="1"
        type="success"
        title="Success"
        message="Operation completed"
        onClose={onClose}
      />
    );

    expect(screen.getByText('Success')).toBeInTheDocument();
    expect(screen.getByText('Operation completed')).toBeInTheDocument();
  });

  it('renders success notification with correct styling', () => {
    const onClose = vi.fn();
    const { container } = render(
      <Notification
        id="1"
        type="success"
        title="Success"
        message="Done"
        onClose={onClose}
      />
    );

    const notification = container.firstChild;
    expect(notification).toHaveClass('bg-emerald-50', 'border-emerald-200');
  });

  it('renders error notification with correct styling', () => {
    const onClose = vi.fn();
    const { container } = render(
      <Notification
        id="1"
        type="error"
        title="Error"
        message="Failed"
        onClose={onClose}
      />
    );

    const notification = container.firstChild;
    expect(notification).toHaveClass('bg-rose-50', 'border-rose-200');
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = vi.fn();
    render(
      <Notification
        id="1"
        type="info"
        title="Info"
        message="Message"
        onClose={onClose}
      />
    );

    const closeButton = screen.getByLabelText('Close notification');
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledWith('1');
  });

  it('auto-closes after duration', () => {
    const onClose = vi.fn();
    render(
      <Notification
        id="1"
        type="info"
        title="Info"
        message="Message"
        duration={3000}
        onClose={onClose}
      />
    );

    expect(onClose).not.toHaveBeenCalled();

    vi.advanceTimersByTime(3000);

    expect(onClose).toHaveBeenCalledWith('1');
  });

  it('does not auto-close when duration is 0', () => {
    const onClose = vi.fn();
    render(
      <Notification
        id="1"
        type="info"
        title="Info"
        message="Message"
        duration={0}
        onClose={onClose}
      />
    );

    vi.advanceTimersByTime(10000);

    expect(onClose).not.toHaveBeenCalled();
  });
});
