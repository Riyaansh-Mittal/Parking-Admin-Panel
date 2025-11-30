import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InputField } from './InputField';

describe('InputField', () => {
  it('renders input element', () => {
    render(<InputField placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('displays helper text', () => {
    render(<InputField helperText="This is helper text" />);
    expect(screen.getByText('This is helper text')).toBeInTheDocument();
  });

  it('displays error helper text with error styling', () => {
    render(<InputField error helperText="This is an error" />);
    const helperText = screen.getByText('This is an error');
    expect(helperText).toHaveClass('text-rose-600');
  });

  it('renders with left icon', () => {
    render(
      <InputField
        leftIcon={<span data-testid="left-icon">🔍</span>}
        placeholder="Search"
      />
    );
    expect(screen.getByTestId('left-icon')).toBeInTheDocument();
  });

  it('renders with right icon', () => {
    render(
      <InputField
        rightIcon={<span data-testid="right-icon">✓</span>}
        placeholder="Valid"
      />
    );
    expect(screen.getByTestId('right-icon')).toBeInTheDocument();
  });

  it('applies fullWidth class to wrapper', () => {
    const { container } = render(<InputField fullWidth />);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('w-full');
  });

  it('handles onChange events', async () => {
    const handleChange = vi.fn();
    const user = userEvent.setup();
    
    render(<InputField onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    await user.type(input, 'test');
    
    expect(handleChange).toHaveBeenCalled();
  });

  it('disables input when disabled prop is true', () => {
    render(<InputField disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('forwards ref to input element', () => {
    const ref = { current: null };
    render(<InputField ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
