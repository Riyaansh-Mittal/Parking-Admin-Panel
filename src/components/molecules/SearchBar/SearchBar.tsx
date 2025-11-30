import { useState, useEffect, ChangeEvent } from 'react';
import { InputField } from '@components/molecules/InputField';
import { Icon } from '@components/atoms/Icon';

export interface SearchBarProps {
  onSearch: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  showClearButton?: boolean;
  fullWidth?: boolean; // ✅ Add this prop
}

export const SearchBar = ({
  onSearch,
  placeholder = 'Search...',
  debounceMs = 300,
  showClearButton = true,
  fullWidth = false, // ✅ Default value
}: SearchBarProps) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [value, debounceMs, onSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue('');
  };

  const rightIcon = showClearButton && value ? (
    <button
      onClick={handleClear}
      aria-label="Clear search"
      className="cursor-pointer text-slate-400 hover:text-slate-600"
      type="button"
    >
      <Icon name="X" size="sm" />
    </button>
  ) : undefined;

  return (
    <InputField
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      leftIcon={<Icon name="Search" size="sm" />}
      rightIcon={rightIcon}
      fullWidth={fullWidth} // ✅ Pass it through to InputField
    />
  );
};

SearchBar.displayName = 'SearchBar';
