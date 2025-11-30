import { ReactNode, useState } from 'react';
import { Outlet } from 'react-router-dom';

interface AuthLayoutProps {
  children?: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        <Outlet />
      </div>
    </div>
  );
};

AuthLayout.displayName = 'AuthLayout';
