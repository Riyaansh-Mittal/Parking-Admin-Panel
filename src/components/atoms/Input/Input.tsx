import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      error = false,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'h-11 rounded-lg border bg-white px-3 py-2 text-base text-slate-900 transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50';

    const errorStyles = error
      ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
      : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500';

    const iconPadding = leftIcon ? 'pl-10' : rightIcon ? 'pr-10' : '';

    return (
      <div className={cn('relative', fullWidth && 'w-full')}>
        {leftIcon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            {leftIcon}
          </div>
        )}
        
        <input
          type={type}
          className={cn(
            baseStyles,
            errorStyles,
            iconPadding,
            fullWidth && 'w-full',
            className
          )}
          ref={ref}
          disabled={disabled}
          aria-invalid={error}
          aria-describedby={helperText ? 'helper-text' : undefined}
          {...props}
        />

        {rightIcon && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
            {rightIcon}
          </div>
        )}

        {helperText && (
          <p
            id="helper-text"
            className={cn(
              'mt-1 text-sm',
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

Input.displayName = 'Input';
