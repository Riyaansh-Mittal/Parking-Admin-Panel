import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { Input } from '@components/atoms/Input';
import { cn } from '@utils';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      className,
      error = false,
      helperText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    const iconPadding = leftIcon ? 'pl-10' : rightIcon ? 'pr-10' : '';

    return (
      <div className={cn('relative', fullWidth && 'w-full')}>
        {leftIcon && (
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            {leftIcon}
          </div>
        )}
        
        <Input
          ref={ref}
          error={error}
          fullWidth={fullWidth}
          className={cn(iconPadding, className)}
          {...props}
        />
        
        {rightIcon && (
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
            {rightIcon}
          </div>
        )}
        
        {helperText && (
          <p className={cn('mt-1 text-sm', error ? 'text-rose-600' : 'text-slate-600')}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

InputField.displayName = 'InputField';
