import { useState, useRef, ReactNode } from 'react';
import { Icon } from '@components/atoms/Icon';
import { useClickOutside } from '@hooks';
import { cn } from '@utils';

export interface DropdownOption {
  label: string;
  value: string | number;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface DropdownProps {
  options: DropdownOption[];
  value?: string | number;
  onChange: (value: string | number) => void;
  placeholder?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export const Dropdown = ({
  options,
  value,
  onChange,
  placeholder = 'Select option',
  disabled = false,
  fullWidth = false,
  className,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpen(false), isOpen);

  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (optionValue: string | number) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className={cn('relative', fullWidth && 'w-full', className)}
    >
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          'flex h-11 w-full items-center justify-between gap-2 rounded-lg border bg-white px-3 py-2 text-left text-base transition-colors',
          'hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1',
          'disabled:cursor-not-allowed disabled:opacity-50',
          isOpen ? 'border-indigo-500 ring-2 ring-indigo-500' : 'border-slate-300'
        )}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2 truncate text-slate-900">
          {selectedOption?.icon && <span>{selectedOption.icon}</span>}
          {selectedOption?.label || (
            <span className="text-slate-400">{placeholder}</span>
          )}
        </span>
        <Icon
          name="ChevronDown"
          size="sm"
          className={cn(
            'shrink-0 text-slate-400 transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && (
        <div
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-slate-200 bg-white py-1 shadow-lg"
          role="listbox"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => !option.disabled && handleSelect(option.value)}
              disabled={option.disabled}
              className={cn(
                'flex w-full items-center gap-2 px-3 py-2 text-left text-sm transition-colors',
                'hover:bg-slate-100 focus:bg-slate-100 focus:outline-none',
                'disabled:cursor-not-allowed disabled:opacity-50',
                option.value === value && 'bg-indigo-50 text-indigo-600'
              )}
              role="option"
              aria-selected={option.value === value}
            >
              {option.icon && <span>{option.icon}</span>}
              <span className="flex-1">{option.label}</span>
              {option.value === value && (
                <Icon name="Check" size="sm" className="text-indigo-600" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

Dropdown.displayName = 'Dropdown';
