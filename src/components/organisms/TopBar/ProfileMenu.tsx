import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar } from '@components/atoms/Avatar';
import { Icon } from '@components/atoms/Icon';
import { useClickOutside } from '@hooks';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import { logout } from '@redux/slices/authSlice';
import { ROUTES } from '@routes/routes.config';

export const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  const { user } = useAppSelector((state) => state.auth);

  useClickOutside(dropdownRef, () => setIsOpen(false), isOpen);

  const handleLogout = async () => {
    await dispatch(logout(false)); // ✅ Pass false (don't logout all devices)
    navigate(ROUTES.LOGIN);
  };

  if (!user) return null;

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 rounded-lg p-2 hover:bg-slate-100"
        aria-label="Profile menu"
      >
        <Avatar
          name={user.full_name}
          size="sm"
          // ✅ Remove is_active - not in user type
        />
        <div className="hidden text-left lg:block">
          <p className="text-sm font-medium text-slate-900">
            {user.full_name}
          </p>
          <p className="text-xs text-slate-500 capitalize">
            {user.user_type}
          </p>
        </div>
        <Icon name="ChevronDown" size="sm" className="hidden text-slate-400 lg:block" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-slate-200 bg-white shadow-lg">
          <div className="border-b border-slate-200 p-4">
            <p className="text-sm font-semibold text-slate-900">
              {user.full_name}
            </p>
            <p className="text-xs text-slate-500">{user.email}</p>
          </div>

          <ul className="p-2">
            <li>
              <Link
                to="/profile"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                onClick={() => setIsOpen(false)}
              >
                <Icon name="User" size="sm" />
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link
                to={ROUTES.SETTINGS}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"
                onClick={() => setIsOpen(false)}
              >
                <Icon name="Settings" size="sm" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>

          <div className="border-t border-slate-200 p-2">
            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-rose-600 hover:bg-rose-50"
            >
              <Icon name="LogOut" size="sm" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

ProfileMenu.displayName = 'ProfileMenu';
