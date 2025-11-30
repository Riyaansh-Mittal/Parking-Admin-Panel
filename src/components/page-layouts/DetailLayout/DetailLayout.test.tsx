import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DetailLayout } from './DetailLayout';

describe('DetailLayout', () => {
  it('renders title and content', () => {
    render(
      <DetailLayout title="User Profile" backUrl="/users">
        <div>Content</div>
      </DetailLayout>
    );

    expect(screen.getByText('User Profile')).toBeInTheDocument();
    expect(screen.getByText('Back')).toBeInTheDocument();
  });

  it('renders actions', () => {
    render(
      <DetailLayout title="User Profile">
        <div>Content</div>
        actions={<button>Edit</button>}
      </DetailLayout>
    );

    expect(screen.getByText('Edit')).toBeInTheDocument();
  });
});
