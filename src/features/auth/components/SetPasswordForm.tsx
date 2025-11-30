import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { setPassword } from '@redux/slices/authSlice';
import { Button } from '@components/atoms/Button';
import { Input } from '@components/atoms/Input';
import { Alert } from '@components/molecules/Alert';
import { FormField } from '@components/molecules/FormField';
import { passwordSchema } from '@utils/validators';
import { ROUTES } from '@routes/routes.config';
import type { SetPasswordFormData } from '../types';

const setPasswordFormSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export const SetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SetPasswordFormData>({
    resolver: zodResolver(setPasswordFormSchema),
  });

  const password = watch('password');

  const onSubmit = async (data: SetPasswordFormData) => {
    const token = searchParams.get('token');
    if (!token) {
      navigate(ROUTES.LOGIN);
      return;
    }

    const result = await dispatch(
      setPassword({
        token,
        password: data.password,
      })
    );

    if (setPassword.fulfilled.match(result)) {
      navigate(ROUTES.LOGIN, {
        state: { message: 'Password set successfully! You can now log in.' },
      });
    }
  };

  // Password strength indicator
  const getPasswordStrength = (pwd: string) => {
    if (!pwd) return { strength: 0, label: '' };
    
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;

    const labels = ['', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    return { strength, label: labels[strength] };
  };

  const { strength, label } = getPasswordStrength(password);

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Set Your Password</h1>
        <p className="mt-2 text-slate-600">
          Create a strong password to secure your account
        </p>
      </div>

      {error && (
        <Alert variant="error" className="mb-6">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Password Field */}
        <FormField
          label="Password"
          error={errors.password?.message}
          required
          helperText="Must contain uppercase, lowercase, number, and special character"
        >
          <Input
            {...register('password')}
            type="password"
            placeholder="Enter your password"
            error={!!errors.password}
            disabled={loading}
            autoComplete="new-password"
          />
          
          {/* Password Strength Indicator */}
          {password && (
            <div className="mt-2">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((level) => (
                  <div
                    key={level}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      level <= strength
                        ? strength <= 2
                          ? 'bg-rose-500'
                          : strength <= 3
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                        : 'bg-slate-200'
                    }`}
                  />
                ))}
              </div>
              <p className="mt-1 text-xs text-slate-600">
                Password strength: <span className="font-medium">{label}</span>
              </p>
            </div>
          )}
        </FormField>

        {/* Confirm Password Field */}
        <FormField
          label="Confirm Password"
          error={errors.confirmPassword?.message}
          required
        >
          <Input
            {...register('confirmPassword')}
            type="password"
            placeholder="Confirm your password"
            error={!!errors.confirmPassword}
            disabled={loading}
            autoComplete="new-password"
          />
        </FormField>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
          disabled={loading}
        >
          Set Password
        </Button>
      </form>
    </div>
  );
};

SetPasswordForm.displayName = 'SetPasswordForm';
