import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Dropdown } from './Dropdown';

const mockOptions = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
];

describe('Dropdown', () => {
  it('renders with placeholder', () => {
    const onChange = vi.fn();
    render(<Dropdown options={mockOptions} onChange={onChange} placeholder="Select" />);
    expect(screen.getByText('Select')).toBeInTheDocument();
  });

  it('displays selected option', () => {
    const onChange = vi.fn();
    render(<Dropdown options={mockOptions} value="2" onChange={onChange} />);
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('opens dropdown on click', () => {
    const onChange = vi.fn();
    render(<Dropdown options={mockOptions} onChange={onChange} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('selects option and closes dropdown', () => {
    const onChange = vi.fn();
    render(<Dropdown options={mockOptions} onChange={onChange} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const option = screen.getByText('Option 2');
    fireEvent.click(option);

    expect(onChange).toHaveBeenCalledWith('2');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('disables dropdown when disabled prop is true', () => {
    const onChange = vi.fn();
    render(<Dropdown options={mockOptions} onChange={onChange} disabled />);

    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });

  it('shows check icon for selected option', () => {
    const onChange = vi.fn();
    render(<Dropdown options={mockOptions} value="2" onChange={onChange} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    const selectedOption = screen.getByRole('option', { name: /Option 2/ });
    expect(selectedOption).toHaveAttribute('aria-selected', 'true');
  });
});
