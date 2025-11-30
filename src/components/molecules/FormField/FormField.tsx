import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { Input } from '@components/atoms/Input';
import { cn } from '@utils';

export interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  (
    {
      label,
      error,
      helperText,
      required,
      leftIcon,
      rightIcon,
      className,
      id,
      ...props
    },
    ref
  ) => {
    const fieldId = id || `field-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = Boolean(error);

    return (
      <div className={cn('flex flex-col gap-1.5', className)}>
        {label && (
          <label
            htmlFor={fieldId}
            className="text-sm font-semibold text-slate-700"
          >
            {label}
            {required && <span className="ml-1 text-rose-500">*</span>}
          </label>
        )}

        <Input
          ref={ref}
          id={fieldId}
          error={hasError}
          leftIcon={leftIcon}
          rightIcon={rightIcon}
          aria-invalid={hasError}
          aria-describedby={
            error || helperText ? `${fieldId}-description` : undefined
          }
          {...props}
        />

        {(error || helperText) && (
          <p
            id={`${fieldId}-description`}
            className={cn(
              'text-sm',
              hasError ? 'text-rose-500' : 'text-slate-500'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = 'FormField';
