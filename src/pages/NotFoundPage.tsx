import { Link } from 'react-router-dom';
import { Button } from '@components/atoms/Button';
import { Icon } from '@components/atoms/Icon';

export const NotFoundPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <Icon name="AlertCircle" size={64} className="mx-auto text-slate-300" />
        <h1 className="mt-4 text-4xl font-bold text-slate-900">404</h1>
        <p className="mt-2 text-lg text-slate-600">Page not found</p>
        <Link to="/dashboard" className="mt-6 inline-block">
          <Button variant="primary">Go to Dashboard</Button>
        </Link>
      </div>
    </div>
  );
};
