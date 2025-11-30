import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@redux/hooks';
import { logout } from '@redux/slices/authSlice';
import { ROUTES } from '@routes/routes.config';

/**
 * Custom hook for logout functionality
 */
export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = async (logoutAllDevices = false) => {
    await dispatch(logout(logoutAllDevices));
    navigate(ROUTES.LOGIN);
  };

  return {
    handleLogout,
  };
};
