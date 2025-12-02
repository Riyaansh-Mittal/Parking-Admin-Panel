import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@components/organisms/Card';
import { Button } from '@components/atoms/Button';
import { Icon } from '@components/atoms/Icon';
import { cn } from '@utils';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface DetailLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  actions?: ReactNode;
  backUrl?: string;
  breadcrumbs?: Breadcrumb[];
  loading?: boolean;
  className?: string;
}

export const DetailLayout = ({
  title,
  subtitle,
  children,
  actions,
  backUrl,
  breadcrumbs,
  loading = false,
  className,
}: DetailLayoutProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backUrl) {
      navigate(backUrl);
    } else {
      navigate(-1);
    }
  };

  const handleBreadcrumbClick = (href?: string) => {
    if (href) {
      navigate(href);
    }
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Breadcrumbs (if provided, show instead of back button) */}
      {breadcrumbs && breadcrumbs.length > 0 ? (
        <nav className="flex items-center space-x-2 text-sm text-slate-600">
          {breadcrumbs.map((crumb, index) => (
            <span key={index} className="flex items-center">
              {crumb.href ? (
                <button
                  onClick={() => handleBreadcrumbClick(crumb.href)}
                  className="hover:text-slate-900 transition-colors"
                >
                  {crumb.label}
                </button>
              ) : (
                <span className="font-medium text-slate-900">{crumb.label}</span>
              )}
              {index < breadcrumbs.length - 1 && (
                <Icon name="ChevronRight" size="sm" className="mx-2 text-slate-400" />
              )}
            </span>
          ))}
        </nav>
      ) : (
        /* Back Button (fallback if no breadcrumbs) */
        <Button
          variant="ghost"
          size="sm"
          onClick={handleBack}
          leftIcon={<Icon name="ArrowLeft" size="sm" />}
        >
          Back
        </Button>
      )}

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-slate-600">{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>

      {/* Content */}
      {loading ? (
        <Card>
          <div className="flex items-center justify-center p-12">
            <Icon name="Loader" className="animate-spin text-slate-400" size="lg" />
          </div>
        </Card>
      ) : (
        children
      )}
    </div>
  );
};

DetailLayout.displayName = 'DetailLayout';
