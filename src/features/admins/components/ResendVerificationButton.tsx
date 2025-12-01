import { useState } from 'react';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Alert } from '@/components/molecules/Alert';
import { adminsService } from '@/api/services/admins.service';

interface ResendVerificationButtonProps {
  email: string;
  adminName?: string;
}

export const ResendVerificationButton = ({ email, adminName }: ResendVerificationButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResend = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await adminsService.resendVerification({ email });
      setSuccess(true);
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (err) {
      const errorMessage =
        err && typeof err === 'object' && 'response' in err
          ? ((err as { response?: { data?: { error?: string } } }).response?.data?.error ||
            'Failed to resend verification email')
          : 'Failed to resend verification email';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      {success && (
        <Alert variant="success" onClose={() => setSuccess(false)}>
          Verification email sent successfully to {email}
        </Alert>
      )}

      {error && (
        <Alert variant="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Button
        variant="secondary"
        size="sm"
        onClick={handleResend}
        loading={loading}
        disabled={success}
        leftIcon={<Icon name="Mail" size="sm" />}
      >
        {success ? 'Email Sent!' : 'Resend Verification Email'}
      </Button>

      {adminName && (
        <p className="text-sm text-slate-600">
          This will send a verification email to {adminName} at {email}
        </p>
      )}
    </div>
  );
};
