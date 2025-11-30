import { ReactNode, cloneElement, isValidElement, useId } from 'react';
import { cn } from '@utils';

export interface FormFieldProps {
  label?: string;
  error?: string;
  helperText?: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export const FormField = ({
  label,
  error,
  helperText,
  hint,
  required,
  children,
  className,
}: FormFieldProps) => {
  const generatedId = useId();
  const displayHint = hint || helperText;

  // Clone the child element and add the id prop
  const childWithId = isValidElement(children)
    ? cloneElement(children as React.ReactElement<{ id?: string }>, {
        id: (children as React.ReactElement<{ id?: string }>).props.id || generatedId,
      })
    : children;

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      {label && (
        <label htmlFor={generatedId} className="text-sm font-medium text-slate-700">
          {label}
          {required && <span className="ml-1 text-rose-500">*</span>}
        </label>
      )}

      {childWithId}

      {displayHint && !error && (
        <p className="text-xs text-slate-500">{displayHint}</p>
      )}

      {error && <p className="text-xs text-rose-600">{error}</p>}
    </div>
  );
};

FormField.displayName = 'FormField';
