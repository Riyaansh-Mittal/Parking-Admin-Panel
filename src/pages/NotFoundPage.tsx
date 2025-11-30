import { Link } from 'react-router-dom';
import { Button } from '@components/atoms/Button';
import { Icon } from '@components/atoms/Icon';
import { ROUTES } from '@routes/routes.config';

export const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="text-center">
        <Icon
          name="AlertCircle"
          size={64}
          className="mx-auto text-slate-300"
        />
        <h1 className="mt-6 text-6xl font-bold text-slate-900">404</h1>
        <p className="mt-2 text-xl text-slate-600">Page not found</p>
        <p className="mt-4 text-slate-500">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link to={ROUTES.DASHBOARD}>
            <Button variant="primary" size="lg">
              Go to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

NotFoundPage.displayName = 'NotFoundPage';
