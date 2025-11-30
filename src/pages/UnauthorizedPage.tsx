import { useNavigate } from 'react-router-dom';
import { Button } from '@components/atoms/Button';
import { Icon } from '@components/atoms/Icon';

export const UnauthorizedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="text-center">
        <Icon name="ShieldAlert" size={64} className="mx-auto text-rose-500" />
        <h1 className="mt-6 text-6xl font-bold text-slate-900">403</h1>
        <p className="mt-2 text-xl text-slate-600">Access Denied</p>
        <p className="mt-4 text-slate-500">
          You don't have permission to access this page.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button variant="secondary" onClick={() => navigate(-1)}>
            Go Back
          </Button>
          <Button variant="primary" onClick={() => navigate('/dashboard')}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

UnauthorizedPage.displayName = 'UnauthorizedPage';
