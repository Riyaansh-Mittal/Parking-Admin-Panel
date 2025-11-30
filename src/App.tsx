import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@redux/hooks';
import { toggleSidebar } from '@redux/slices/uiSlice';

function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { sidebarCollapsed } = useAppSelector((state) => state.ui);

  useEffect(() => {
    console.log('Admin Panel initialized with Redux');
    console.log('Authenticated:', isAuthenticated);
    console.log('Environment:', import.meta.env.VITE_ENV);
    console.log('API Base URL:', import.meta.env.VITE_API_BASE_URL);
  }, [isAuthenticated]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900">Admin Panel</h1>
        <p className="mt-4 text-lg text-slate-600">
          React + TypeScript + Tailwind CSS + Redux Toolkit
        </p>
        <div className="mt-4 space-y-2 text-sm text-slate-500">
          <p>Environment: {import.meta.env.VITE_ENV}</p>
          <p>Auth Status: {isAuthenticated ? '✅ Authenticated' : '❌ Not Authenticated'}</p>
          <p>Sidebar: {sidebarCollapsed ? 'Collapsed' : 'Expanded'}</p>
        </div>
        <div className="mt-8">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-500"
          >
            Toggle Sidebar (Test Redux)
          </button>
        </div>
        <div className="mt-8">
          <span className="inline-block h-4 w-4 animate-pulse rounded-full bg-emerald-500"></span>
          <span className="ml-2 text-sm text-slate-600">
            Redux Store Connected
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
