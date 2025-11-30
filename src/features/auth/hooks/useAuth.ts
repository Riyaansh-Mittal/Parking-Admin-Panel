import { useAppSelector } from '@redux/hooks';
import { selectIsAuthenticated, selectUser, selectIsSuperuser } from '@redux/slices/authSlice';

/**
 * Custom hook for accessing auth state
 */
export const useAuth = () => {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectUser);
  const isSuperuser = useAppSelector(selectIsSuperuser);
  const loading = useAppSelector((state) => state.auth.loading);
  const error = useAppSelector((state) => state.auth.error);

  return {
    isAuthenticated,
    user,
    isSuperuser,
    loading,
    error,
  };
};
