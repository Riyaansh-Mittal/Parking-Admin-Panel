import { beforeAll, afterAll, afterEach, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
} as unknown as typeof IntersectionObserver;

vi.mock('@routes/routes.config', () => ({
  ROUTES: {
    DASHBOARD: '/dashboard',
    USERS: '/users',
    ADMINS: '/admins',
    CALLS: '/calls',
    CAMPAIGNS: '/campaigns',
    CODES: '/codes',
    RELATIONSHIPS: '/relationships',
    BALANCES: '/balances',
    SETTINGS: '/settings',
    ANALYTICS: '/analytics',
    EXPORTS: '/exports',
    LOGIN: '/login',
  },
  NAV_ITEMS: [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
    },
    {
      label: 'Users',
      path: '/users',
      icon: 'Users',
    },
    {
      label: 'Admins',
      path: '/admins',
      icon: 'Shield',
    },
  ],
  buildRoute: (route: string, params: Record<string, string>) => {
    let path = route;
    Object.entries(params).forEach(([key, value]) => {
      path = path.replace(`:${key}`, value);
    });
    return path;
  },
}));

// Suppress Icon warnings in tests
const originalWarn = console.warn;
const originalError = console.error;

beforeAll(() => {
  console.warn = (...args: unknown[]) => {
    const message = String(args[0]);
    if (message.includes('Icon "') || message.includes('not found in lucide-react')) {
      return;
    }
    originalWarn.call(console, ...args);
  };

  console.error = (...args: unknown[]) => {
    const message = String(args[0]);
    if (
      message.includes('Warning: ReactDOM.render') ||
      message.includes('Not implemented: HTMLFormElement.prototype.submit')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.warn = originalWarn;
  console.error = originalError;
});
