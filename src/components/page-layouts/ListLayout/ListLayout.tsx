import { ReactNode } from 'react';
import { Card } from '@components/organisms/Card';
import { SearchBar } from '@components/molecules/SearchBar';
import { Icon } from '@components/atoms/Icon';
import { cn } from '@utils';

interface ListLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
  showSearch?: boolean;
  onSearch?: (query: string) => void;
  searchPlaceholder?: string;
  loading?: boolean;
  className?: string;
}

export const ListLayout = ({
  title,
  description,
  children,
  actions,
  showSearch = false,
  onSearch,
  searchPlaceholder = 'Search...',
  loading = false,
  className,
}: ListLayoutProps) => {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          {description && (
            <p className="mt-1 text-sm text-slate-600">{description}</p>
          )}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {/* Search Bar */}
      {showSearch && onSearch && (
        <SearchBar
          onSearch={onSearch}
          placeholder={searchPlaceholder}
          fullWidth
        />
      )}

      {/* Content */}
      <Card padding={false}>
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <Icon name="Loader" className="animate-spin text-slate-400" size="lg" />
          </div>
        ) : (
          children
        )}
      </Card>
    </div>
  );
};

ListLayout.displayName = 'ListLayout';
