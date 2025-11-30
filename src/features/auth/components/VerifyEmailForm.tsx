import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { verifyEmail } from '@redux/slices/authSlice';
import { Button } from '@components/atoms/Button';
import { Icon } from '@components/atoms/Icon';
import { Alert } from '@components/molecules/Alert';
import { ROUTES } from '@routes/routes.config';

export const VerifyEmailForm = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);
  const [verified, setVerified] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      navigate(ROUTES.LOGIN);
      return;
    }

    const verify = async () => {
      const result = await dispatch(verifyEmail(token));
      if (verifyEmail.fulfilled.match(result)) {
        setVerified(true);
        setEmail(result.payload.email);
      }
    };

    verify();
  }, [searchParams, dispatch, navigate]);

  if (loading) {
    return (
      <div className="w-full text-center">
        <Icon
          name="Loader"
          size="lg"
          className="mx-auto animate-spin text-indigo-600"
        />
        <h2 className="mt-4 text-xl font-semibold text-slate-900">
          Verifying your email...
        </h2>
        <p className="mt-2 text-slate-600">Please wait a moment</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <div className="mb-6 text-center">
          <Icon name="AlertCircle" size="lg" className="mx-auto text-rose-500" />
          <h2 className="mt-4 text-xl font-semibold text-slate-900">
            Verification Failed
          </h2>
        </div>

        <Alert variant="error" className="mb-6">
          {error}
        </Alert>

        <Button
          variant="primary"
          fullWidth
          onClick={() => navigate(ROUTES.LOGIN)}
        >
          Back to Login
        </Button>
      </div>
    );
  }

  if (verified) {
    return (
      <div className="w-full">
        <div className="mb-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <Icon name="Check" size="lg" className="text-emerald-600" />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-slate-900">
            Email Verified!
          </h2>
          <p className="mt-2 text-slate-600">
            Your email <span className="font-medium">{email}</span> has been
            verified successfully.
          </p>
        </div>

        <Button
          variant="primary"
          fullWidth
          onClick={() => {
            const token = searchParams.get('token');
            navigate(`${ROUTES.SET_PASSWORD}?token=${token}`);
          }}
        >
          Set Your Password
        </Button>
      </div>
    );
  }

  return null;
};

VerifyEmailForm.displayName = 'VerifyEmailForm';
