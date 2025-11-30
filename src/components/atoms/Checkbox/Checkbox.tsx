import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@utils';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: boolean;
  helperText?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, helperText, className, id, disabled, ...props }, ref) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            id={checkboxId}
            ref={ref}
            disabled={disabled}
            className={cn(
              'mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border transition-colors',
              'focus:outline-none focus:ring-2 focus:ring-offset-1',
              'disabled:cursor-not-allowed disabled:opacity-50',
              error
                ? 'border-rose-500 text-rose-600 focus:ring-rose-500'
                : 'border-slate-300 text-indigo-600 focus:ring-indigo-500',
              className
            )}
            aria-invalid={error}
            aria-describedby={helperText ? `${checkboxId}-helper` : undefined}
            {...props}
          />
          {label && (
            <label
              htmlFor={checkboxId}
              className={cn(
                'cursor-pointer text-sm font-medium text-slate-700',
                disabled && 'cursor-not-allowed opacity-50'
              )}
            >
              {label}
            </label>
          )}
        </div>
        {helperText && (
          <p
            id={`${checkboxId}-helper`}
            className={cn(
              'ml-6 text-sm',
              error ? 'text-rose-500' : 'text-slate-500'
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
