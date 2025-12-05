export const ROUTES = {
  // Auth
  LOGIN: '/login',
  VERIFY_EMAIL: '/verify-email',
  SET_PASSWORD: '/set-password',

  // Main
  HOME: '/',
  DASHBOARD: '/dashboard',

  // Users
  USERS: '/users',
  USER_DETAIL: '/users/:userId',

  // Admins
  ADMINS: '/admins',
  ADMIN_DETAIL: '/admins/:adminId',
  REGISTER_ADMIN: '/admins/register',

  // Calls
  CALLS: '/calls',
  CALL_DETAIL: '/calls/:callId',
  CALL_STATS: '/calls/stats',

  // Campaigns
  CAMPAIGNS: '/campaigns',
  CAMPAIGN_DETAIL: '/campaigns/:campaignId',
  CREATE_CAMPAIGN: '/campaigns/create',

  // Codes
  CODES: '/codes',
  CODE_DETAIL: '/codes/:id',

  // Relationships
  RELATIONSHIPS: '/relationships',
  RELATIONSHIP_DETAIL: '/relationships/:relationshipId',

  // Balances
  BALANCES: '/balances',
  BALANCE_DETAIL: '/balances/:userId',
  BALANCE_RESET_LOGS: '/balances/reset-logs/:userId',

  // Settings
  SETTINGS: '/settings',
  SETTING_DETAIL: '/settings/:key',

  // Analytics
  ANALYTICS: '/analytics',
  CALL_ANALYTICS: '/analytics/calls',
  REFERRAL_ANALYTICS: '/analytics/referrals',

  // Exports
  EXPORTS: '/exports',

  // Errors
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/403',
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RouteValue = (typeof ROUTES)[RouteKey];

/**
 * Helper to build route with params
 */
export const buildRoute = (
  route: string,
  params: Record<string, string>
): string => {
  let path = route;
  Object.entries(params).forEach(([key, value]) => {
    path = path.replace(`:${key}`, value);
  });
  return path;
};

/**
 * Navigation items for sidebar
 */
export interface NavItem {
  label: string;
  path: string;
  icon: string; // lucide-react icon name
  badge?: string | number;
  children?: NavItem[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: 'LayoutDashboard',
  },
  {
    label: 'Users',
    path: ROUTES.USERS,
    icon: 'Users',
  },
  {
    label: 'Admins',
    path: ROUTES.ADMINS,
    icon: 'Shield',
  },
  {
    label: 'Calls',
    path: ROUTES.CALLS,
    icon: 'Phone',
  },
  {
    label: 'Campaigns',
    path: ROUTES.CAMPAIGNS,
    icon: 'Megaphone',
    children: [
      {
        label: 'All Campaigns',
        path: ROUTES.CAMPAIGNS,
        icon: 'List',
      },
      {
        label: 'Codes',
        path: ROUTES.CODES,
        icon: 'Hash',
      },
      {
        label: 'Relationships',
        path: ROUTES.RELATIONSHIPS,
        icon: 'Link',
      },
    ],
  },
  {
    label: 'Balances',
    path: ROUTES.BALANCES,
    icon: 'Wallet',
  },
  {
    label: 'Analytics',
    path: '/analytics/calls',
    icon: 'ChartBar', // Lucide icon name for bar chart
    children: [
      {
        label: 'Call Analytics',
        path: '/analytics/calls',
        icon: 'Phone', // or 'PhoneCall'
      },
      {
        label: 'Referral Analytics',
        path: '/analytics/referrals',
        icon: 'Users', // or 'UserPlus' or 'Share2'
      },
    ],
  },
  {
    label: 'Settings',
    path: ROUTES.SETTINGS,
    icon: 'Settings',
  },
  {
    label: 'Exports',
    path: ROUTES.EXPORTS,
    icon: 'Download',
  },
];
