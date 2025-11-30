import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@components/organisms/Card';
import { Button } from '@components/atoms/Button';
import { Icon } from '@components/atoms/Icon';
import { cn } from '@utils';

interface DetailLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  actions?: ReactNode;
  backUrl?: string;
  loading?: boolean;
  className?: string;
}

export const DetailLayout = ({
  title,
  subtitle,
  children,
  actions,
  backUrl,
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

  return (
    <div className={cn('space-y-6', className)}>
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleBack}
        leftIcon={<Icon name="ArrowLeft" size="sm" />}
      >
        Back
      </Button>

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          {subtitle && (
            <p className="mt-1 text-sm text-slate-600">{subtitle}</p>
          )}
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
