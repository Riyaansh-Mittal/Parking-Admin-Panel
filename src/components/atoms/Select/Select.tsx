import { forwardRef, SelectHTMLAttributes } from 'react';
import { cn } from '@/utils';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label?: string;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  fullWidth?: boolean;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, options, placeholder, fullWidth, className, ...props }, ref) => {
    const selectClasses = cn(
      'block rounded-lg border px-3 py-2 text-sm transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent',
      'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-slate-50',
      error
        ? 'border-rose-300 bg-rose-50 text-rose-900 placeholder-rose-400'
        : 'border-slate-300 bg-white text-slate-900 placeholder-slate-400',
      fullWidth ? 'w-full' : '',
      className
    );

    return (
      <div className={fullWidth ? 'w-full' : ''}>
        {label && (
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            {label}
          </label>
        )}
        <select ref={ref} className={selectClasses} {...props}>
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="mt-1.5 text-sm text-rose-600">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
