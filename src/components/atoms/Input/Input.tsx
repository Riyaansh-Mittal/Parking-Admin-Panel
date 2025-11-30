import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error = false, fullWidth = false, disabled, ...props }, ref) => {
    const baseStyles =
      'h-11 rounded-lg border bg-white px-3 py-2 text-base text-slate-900 transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50';

    const errorStyles = error
      ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500'
      : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-500';

    return (
      <input
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(baseStyles, errorStyles, fullWidth && 'w-full', className)}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';
