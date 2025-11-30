import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('renders page numbers', () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('highlights current page', () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />);

    const currentPageButton = screen.getByLabelText('Go to page 3');
    expect(currentPageButton).toHaveClass('bg-indigo-600');
  });

  it('calls onPageChange when page number is clicked', () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);

    const page3Button = screen.getByLabelText('Go to page 3');
    fireEvent.click(page3Button);

    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('disables Previous button on first page', () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />);

    const previousButton = screen.getByLabelText('Previous page');
    expect(previousButton).toBeDisabled();
  });

  it('disables Next button on last page', () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={5} totalPages={5} onPageChange={onPageChange} />);

    const nextButton = screen.getByLabelText('Next page');
    expect(nextButton).toBeDisabled();
  });

  it('shows ellipsis for many pages', () => {
    const onPageChange = vi.fn();
    render(<Pagination currentPage={5} totalPages={20} onPageChange={onPageChange} />);

    const ellipses = screen.getAllByText('...');
    expect(ellipses.length).toBeGreaterThan(0);
  });

  it('renders page size selector when enabled', () => {
    const onPageChange = vi.fn();
    const onPageSizeChange = vi.fn();
    render(
      <Pagination
        currentPage={1}
        totalPages={5}
        onPageChange={onPageChange}
        pageSize={20}
        onPageSizeChange={onPageSizeChange}
        showPageSizeSelector
      />
    );

    expect(screen.getByText('Show')).toBeInTheDocument();
    expect(screen.getByText('per page')).toBeInTheDocument();
  });
});
