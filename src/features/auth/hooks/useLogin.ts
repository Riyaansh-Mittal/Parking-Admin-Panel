import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@redux/hooks';
import { login, clearError } from '@redux/slices/authSlice';
import { ROUTES } from '@routes/routes.config';
import type { LoginFormData } from '../types';

/**
 * Custom hook for login functionality
 */
export const useLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error } = useAppSelector((state) => state.auth);

  const handleLogin = async (data: LoginFormData) => {
    const result = await dispatch(
      login({
        email: data.email,
        password: data.password,
      })
    );

    if (login.fulfilled.match(result)) {
      navigate(ROUTES.DASHBOARD);
    }
  };

  const clearLoginError = () => {
    dispatch(clearError());
  };

  return {
    handleLogin,
    loading,
    error,
    clearError: clearLoginError,
  };
};
