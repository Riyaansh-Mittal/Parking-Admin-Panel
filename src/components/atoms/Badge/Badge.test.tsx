import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders children correctly', () => {
    render(<Badge>Active</Badge>);
    expect(screen.getByText('Active')).toBeInTheDocument();
  });

  it('applies success variant', () => {
    render(<Badge variant="success">Success</Badge>);
    const badge = screen.getByText('Success');
    expect(badge).toHaveClass('bg-emerald-50', 'text-emerald-700');
  });

  it('applies error variant', () => {
    render(<Badge variant="error">Error</Badge>);
    const badge = screen.getByText('Error');
    expect(badge).toHaveClass('bg-rose-50', 'text-rose-700');
  });

  it('applies warning variant', () => {
    render(<Badge variant="warning">Warning</Badge>);
    const badge = screen.getByText('Warning');
    expect(badge).toHaveClass('bg-amber-50', 'text-amber-700');
  });

  it('renders with dot indicator', () => {
    const { container } = render(
      <Badge dot variant="success">
        Active
      </Badge>
    );
    const dot = container.querySelector('.bg-emerald-500');
    expect(dot).toBeInTheDocument();
  });

  it('applies small size', () => {
    render(<Badge size="sm">Small</Badge>);
    const badge = screen.getByText('Small');
    expect(badge).toHaveClass('text-xs');
  });

  it('applies large size', () => {
    render(<Badge size="lg">Large</Badge>);
    const badge = screen.getByText('Large');
    expect(badge).toHaveClass('text-base');
  });

  it('applies custom className', () => {
    render(<Badge className="custom-badge">Custom</Badge>);
    const badge = screen.getByText('Custom');
    expect(badge).toHaveClass('custom-badge');
  });
});
