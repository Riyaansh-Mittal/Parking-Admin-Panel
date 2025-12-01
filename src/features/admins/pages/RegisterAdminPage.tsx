import { useNavigate } from 'react-router-dom';
import { DetailLayout } from '@/components/page-layouts/DetailLayout';
import { AdminRegisterForm } from '../components/AdminRegisterForm';
import { Alert } from '@/components/molecules/Alert';
import { useRegisterAdmin } from '../hooks/useRegisterAdmin';
import { useAppSelector } from '@/redux/hooks';
import type { AdminFormData } from '@/features/admins/types';

export const RegisterAdminPage = () => {
  const navigate = useNavigate();
  const { register, loading, error, success, reset } = useRegisterAdmin();
  const isSuperuser = useAppSelector((state) => state.auth.user?.is_superuser ?? false);

  const handleSubmit = async (data: AdminFormData) => {
    await register(data);
    // Show success message and redirect after 2 seconds
    setTimeout(() => {
      navigate('/admins');
    }, 2000);
  };

  // Redirect if not superuser
  if (!isSuperuser) {
    return (
      <DetailLayout title="Access Denied" backUrl="/admins"> {/* ✅ Use backUrl */}
        <Alert variant="error">
          Only superusers can register new admin users.
        </Alert>
      </DetailLayout>
    );
  }

  return (
    <DetailLayout
      title="Register Admin User"
      subtitle="Create a new admin or superuser account"
      backUrl="/admins" // ✅ Use backUrl
    >
      <div className="space-y-6">
        {success && (
          <Alert variant="success" onClose={reset}>
            Admin user registered successfully! A verification email has been sent to the provided
            email address. Redirecting to admin list...
          </Alert>
        )}

        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-slate-900">Admin Information</h2>
            <p className="mt-1 text-sm text-slate-600">
              Enter the details for the new admin user. They will receive a verification email to
              complete their registration.
            </p>
          </div>

          <AdminRegisterForm
            onSubmit={handleSubmit}
            loading={loading}
            error={error}
            isSuperuser={isSuperuser}
          />
        </div>

        {/* Information Card */}
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
          <h3 className="mb-2 font-semibold text-blue-900">Registration Process</h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start gap-2">
              <span className="mt-0.5">1.</span>
              <span>Admin receives verification email with a secure link</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5">2.</span>
              <span>Admin clicks the link to verify their email address</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5">3.</span>
              <span>Admin sets their password and completes registration</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5">4.</span>
              <span>Admin can then log in with their email and password</span>
            </li>
          </ul>
        </div>
      </div>
    </DetailLayout>
  );
};
