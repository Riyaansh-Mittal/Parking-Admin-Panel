import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders image when src is provided', () => {
    render(<Avatar src="/avatar.jpg" alt="User Avatar" />);
    const img = screen.getByAltText('User Avatar');
    expect(img).toBeInTheDocument();
  });

  it('displays initials when name is provided and no image', () => {
    render(<Avatar name="John Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('displays single letter for single word name', () => {
    render(<Avatar name="John" />);
    expect(screen.getByText('JO')).toBeInTheDocument();
  });

  it('displays question mark when no name or image', () => {
    render(<Avatar />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  it('renders with online status indicator', () => {
    const { container } = render(<Avatar name="John" status="online" />);
    const statusIndicator = container.querySelector('.bg-emerald-500');
    expect(statusIndicator).toBeInTheDocument();
  });

  it('applies circle shape by default', () => {
    const { container } = render(<Avatar name="John" />);
    const avatar = container.firstChild?.firstChild;
    expect(avatar).toHaveClass('rounded-full');
  });

  it('applies square shape', () => {
    const { container } = render(<Avatar name="John" shape="square" />);
    const avatar = container.firstChild?.firstChild;
    expect(avatar).toHaveClass('rounded-lg');
  });

  it('applies different sizes', () => {
    const { rerender, container } = render(<Avatar name="John" size="sm" />);
    expect(container.firstChild?.firstChild).toHaveClass('h-8', 'w-8');

    rerender(<Avatar name="John" size="lg" />);
    expect(container.firstChild?.firstChild).toHaveClass('h-12', 'w-12');
  });
});
