import { ReactNode } from 'react';
import { Link } from 'react-router-dom'; // ✅ Add this
import { Button } from '@components/atoms/Button';
import { Icon } from '@components/atoms/Icon';
import { Card, CardBody } from '@components/organisms/Card';

interface DetailLayoutProps {
  title: string;
  subtitle?: string;
  backUrl?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export const DetailLayout = ({
  title,
  subtitle,
  backUrl,
  actions,
  children,
}: DetailLayoutProps) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            {backUrl && (
              <Button variant="ghost" size="sm">
                <Link 
                  to={backUrl} 
                  className="flex items-center gap-2" // ✅ Link inside Button
                >
                  <Icon name="ArrowLeft" size="sm" />
                  Back
                </Link>
              </Button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
              {subtitle && (
                <p className="text-sm text-slate-600">{subtitle}</p>
              )}
            </div>
          </div>
        </div>
        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>

      {/* Content */}
      <Card>
        <CardBody>{children}</CardBody>
      </Card>
    </div>
  );
};

DetailLayout.displayName = 'DetailLayout';
