import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { Button } from '@components/atoms/Button';
import { Input } from '@components/atoms/Input';
import { Checkbox } from '@components/atoms/Checkbox';
import { Alert } from '@components/molecules/Alert';
import { FormField } from '@components/molecules/FormField';
import { emailSchema } from '@utils/validators';
import { useLogin } from '../hooks/useLogin';
import type { LoginFormData } from '../types';

const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

export const LoginForm = () => {
  const { handleLogin, loading, error, clearError } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    clearError();
    await handleLogin(data);
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>
        <p className="mt-2 text-slate-600">Sign in to your admin account</p>
      </div>

      {error && (
        <Alert variant="error" className="mb-6">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email Field */}
        <FormField
          label="Email Address"
          error={errors.email?.message}
          required
        >
          <Input
            {...register('email')}
            type="email"
            placeholder="admin@example.com"
            error={!!errors.email}
            disabled={loading}
            autoComplete="email"
          />
        </FormField>

        {/* Password Field */}
        <FormField
          label="Password"
          error={errors.password?.message}
          required
        >
          <Input
            {...register('password')}
            type="password"
            placeholder="Enter your password"
            error={!!errors.password}
            disabled={loading}
            autoComplete="current-password"
          />
        </FormField>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <Checkbox
            {...register('rememberMe')}
            label="Remember me"
            disabled={loading}
          />
          <Link
            to="/forgot-password"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            Forgot password?
          </Link>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
          disabled={loading}
        >
          Sign In
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Need help?{' '}
        <Link
          to="/support"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Contact Support
        </Link>
      </p>
    </div>
  );
};

LoginForm.displayName = 'LoginForm';
