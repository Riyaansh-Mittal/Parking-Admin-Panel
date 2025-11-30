import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@utils';
import { Spinner } from '@components/atoms/Spinner';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-colors rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

    const variants = {
      primary:
        'bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-700 focus-visible:ring-indigo-500',
      secondary:
        'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 active:bg-slate-100 focus-visible:ring-slate-500',
      danger:
        'bg-rose-500 text-white hover:bg-rose-600 active:bg-rose-700 focus-visible:ring-rose-500',
      ghost:
        'bg-transparent text-indigo-600 hover:bg-indigo-50 active:bg-indigo-100 focus-visible:ring-indigo-500',
    };

    const sizes = {
      sm: 'h-9 px-3 text-sm gap-1.5',
      md: 'h-11 px-4 text-base gap-2',
      lg: 'h-12 px-6 text-lg gap-2.5',
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <Spinner size="sm" />
          </div>
        ) : (
          <>
            {leftIcon && <span className="mr-2">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="ml-2">{rightIcon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
