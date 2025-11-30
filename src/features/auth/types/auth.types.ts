/**
 * Login form data
 */
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Set password form data
 */
export interface SetPasswordFormData {
  password: string;
  confirmPassword: string;
}

/**
 * Verify email response
 */
export interface VerifyEmailResponse {
  email: string;
  email_verified: boolean;
}

/**
 * Set password response
 */
export interface SetPasswordResponse {
  email: string;
  password_set: boolean;
  can_login: boolean;
}
