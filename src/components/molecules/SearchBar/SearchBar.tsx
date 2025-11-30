import { useState, useCallback, InputHTMLAttributes } from 'react';
import { Input } from '@components/atoms/Input';
import { Icon } from '@components/atoms/Icon';
import { useDebounce } from '@hooks';
import { cn } from '@utils';

export interface SearchBarProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  onSearch: (query: string) => void;
  debounceMs?: number;
  showClearButton?: boolean;
  fullWidth?: boolean;
}

export const SearchBar = ({
  onSearch,
  debounceMs = 300,
  showClearButton = true,
  fullWidth = false,
  placeholder = 'Search...',
  className,
  ...props
}: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, debounceMs);

  // Trigger search when debounced query changes
  useCallback(() => {
    onSearch(debouncedQuery);
  }, [debouncedQuery, onSearch])();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <div className={cn('relative', fullWidth && 'w-full', className)}>
      <Input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        leftIcon={<Icon name="Search" size="sm" />}
        rightIcon={
          showClearButton && query ? (
            <button
              type="button"
              onClick={handleClear}
              className="text-slate-400 hover:text-slate-600"
              aria-label="Clear search"
            >
              <Icon name="X" size="sm" />
            </button>
          ) : undefined
        }
        fullWidth={fullWidth}
        {...props}
      />
    </div>
  );
};

SearchBar.displayName = 'SearchBar';
