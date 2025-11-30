import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@utils';

export interface SwitchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {  // ✅ Also omit 'size'
  label?: string;
  helperText?: string;
  size?: 'sm' | 'md';  // ✅ Now no conflict
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
  ({ label, helperText, size = 'md', className, id, disabled, checked, ...props }, ref) => {
    const switchId = id || `switch-${Math.random().toString(36).substr(2, 9)}`;

    const sizes = {
      sm: {
        track: 'h-5 w-9',
        thumb: 'h-4 w-4',
        translate: 'translate-x-4',
      },
      md: {
        track: 'h-6 w-11',
        thumb: 'h-5 w-5',
        translate: 'translate-x-5',
      },
    };

    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <div className="relative inline-block">
            <input
              type="checkbox"
              id={switchId}
              ref={ref}
              checked={checked}
              disabled={disabled}
              className="peer sr-only"
              aria-describedby={helperText ? `${switchId}-helper` : undefined}
              {...props}
            />
            <label
              htmlFor={switchId}
              className={cn(
                'block cursor-pointer rounded-full transition-colors',
                'peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-500 peer-focus:ring-offset-2',
                'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
                checked ? 'bg-indigo-600' : 'bg-slate-300',
                sizes[size].track,
                className
              )}
            >
              <span
                className={cn(
                  'block rounded-full bg-white transition-transform',
                  'translate-x-0.5 translate-y-0.5',
                  checked && sizes[size].translate,
                  sizes[size].thumb
                )}
              />
            </label>
          </div>
          {label && (
            <label
              htmlFor={switchId}
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
          <p id={`${switchId}-helper`} className="ml-14 text-sm text-slate-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Switch.displayName = 'Switch';
