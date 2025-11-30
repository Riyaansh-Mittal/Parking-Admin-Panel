// API Configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
export const API_TIMEOUT = parseInt(import.meta.env.VITE_API_TIMEOUT || '30000', 10);

// Storage Keys
export const STORAGE_KEYS = {
  ACCESS_TOKEN: import.meta.env.VITE_TOKEN_STORAGE_KEY || 'admin_access_token',
  REFRESH_TOKEN: import.meta.env.VITE_REFRESH_TOKEN_STORAGE_KEY || 'admin_refresh_token',
  USER_INFO: 'admin_user_info',
  SIDEBAR_STATE: 'sidebar_collapsed',
  THEME: 'theme',
} as const;

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// Debounce Delays
export const SEARCH_DEBOUNCE_MS = 300;
export const INPUT_DEBOUNCE_MS = 500;

// Status Values
export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  SUSPENDED: 'suspended',
  PENDING: 'pending',
} as const;

export const CALL_STATUS = {
  RINGING: 'ringing',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected',
  BUSY: 'busy',
  CANCELED: 'canceled',
  MISSED: 'missed',
  ENDED: 'ended',
  FAILED: 'failed',
} as const;

// Date Formats
export const DATE_FORMAT = 'MMM dd, yyyy';
export const DATETIME_FORMAT = 'MMM dd, yyyy HH:mm';
export const TIME_FORMAT = 'HH:mm:ss';

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
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
} as const;
