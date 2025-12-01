import { useState } from 'react';
import { FormField } from '@/components/molecules/FormField';
import { Button } from '@/components/atoms/Button';
import { Icon } from '@/components/atoms/Icon';
import { Alert } from '@/components/molecules/Alert';
import { isValidEmail } from '@/utils/validators'; // ✅ Fixed import
import type { AdminFormData, AdminFormErrors } from '@/features/admins/types';

interface AdminRegisterFormProps {
  onSubmit: (data: AdminFormData) => Promise<void>;
  loading?: boolean;
  error?: string | null;
  isSuperuser?: boolean;
}

// ✅ Add validation helpers
const validateRequired = (value: string, fieldName: string): string | undefined => {
  if (!value || value.trim() === '') {
    return `${fieldName} is required`;
  }
  return undefined;
};

const validateEmail = (value: string): string | undefined => {
  if (!value || value.trim() === '') {
    return 'Email is required';
  }
  if (!isValidEmail(value)) {
    return 'Invalid email format';
  }
  return undefined;
};

export const AdminRegisterForm = ({
  onSubmit,
  loading = false,
  error = null,
  isSuperuser = false,
}: AdminRegisterFormProps) => {
  const [formData, setFormData] = useState<AdminFormData>({
    email: '',
    first_name: '',
    last_name: '',
    user_type: 'admin',
  });

  const [errors, setErrors] = useState<AdminFormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (field: keyof AdminFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleBlur = (field: keyof AdminFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const validateField = (field: keyof AdminFormData, value: string) => {
    let error: string | undefined;

    switch (field) {
      case 'email':
        error = validateEmail(value);
        break;
      case 'first_name':
        error = validateRequired(value, 'First name');
        break;
      case 'last_name':
        error = validateRequired(value, 'Last name');
        break;
      case 'user_type':
        error = validateRequired(value, 'User type');
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    return !error;
  };

  const validateForm = (): boolean => {
    let isValid = true;

    // Validate all fields
    (Object.keys(formData) as Array<keyof AdminFormData>).forEach((field) => {
      const fieldError = validateField(field, formData[field]);
      if (!fieldError) {
        isValid = false;
      }
    });

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched
    setTouched({
      email: true,
      first_name: true,
      last_name: true,
      user_type: true,
    });

    if (!validateForm()) {
      return;
    }

    await onSubmit(formData);
    // Reset form on success
    setFormData({
      email: '',
      first_name: '',
      last_name: '',
      user_type: 'admin',
    });
    setTouched({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <Alert variant="error" onClose={() => {}}>
          {error}
        </Alert>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <FormField
          label="First Name"
          error={touched.first_name ? errors.first_name : undefined}
          required
        >
          <input
            type="text"
            value={formData.first_name}
            onChange={(e) => handleChange('first_name', e.target.value)}
            onBlur={() => handleBlur('first_name')}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="Enter first name"
            disabled={loading}
          />
        </FormField>

        <FormField
          label="Last Name"
          error={touched.last_name ? errors.last_name : undefined}
          required
        >
          <input
            type="text"
            value={formData.last_name}
            onChange={(e) => handleChange('last_name', e.target.value)}
            onBlur={() => handleBlur('last_name')}
            className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="Enter last name"
            disabled={loading}
          />
        </FormField>
      </div>

      <FormField label="Email" error={touched.email ? errors.email : undefined} required>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          onBlur={() => handleBlur('email')}
          className="w-full rounded-lg border border-slate-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          placeholder="admin@example.com"
          disabled={loading}
        />
      </FormField>

      <FormField
        label="User Type"
        error={touched.user_type ? errors.user_type : undefined}
        required
        helperText={ // ✅ Changed from helpText to helperText
          !isSuperuser
            ? 'Only superusers can be created by other superusers'
            : 'Choose admin type carefully'
        }
      >
        <div className="space-y-3">
          <label className="flex items-center gap-3 rounded-lg border border-slate-200 p-4 hover:bg-slate-50">
            <input
              type="radio"
              value="admin"
              checked={formData.user_type === 'admin'}
              onChange={(e) => handleChange('user_type', e.target.value)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              disabled={loading}
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Icon name="User" size="sm" />
                <span className="font-medium text-slate-900">Admin</span>
              </div>
              <p className="mt-1 text-sm text-slate-600">
                Can manage users and view reports
              </p>
            </div>
          </label>

          <label
            className={`flex items-center gap-3 rounded-lg border border-slate-200 p-4 ${
              isSuperuser ? 'hover:bg-slate-50' : 'cursor-not-allowed opacity-50'
            }`}
          >
            <input
              type="radio"
              value="superuser"
              checked={formData.user_type === 'superuser'}
              onChange={(e) => handleChange('user_type', e.target.value)}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
              disabled={loading || !isSuperuser}
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Icon name="Shield" size="sm" />
                <span className="font-medium text-slate-900">Superuser</span>
              </div>
              <p className="mt-1 text-sm text-slate-600">
                Full system access including admin management
              </p>
            </div>
          </label>
        </div>
      </FormField>

      <div className="flex items-center justify-end gap-3 border-t border-slate-200 pt-6">
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            setFormData({
              email: '',
              first_name: '',
              last_name: '',
              user_type: 'admin',
            });
            setTouched({});
            setErrors({});
          }}
          disabled={loading}
        >
          Reset
        </Button>
        <Button type="submit" variant="primary" loading={loading}>
          <Icon name="UserPlus" size="sm" />
          Create Admin User
        </Button>
      </div>
    </form>
  );
};
