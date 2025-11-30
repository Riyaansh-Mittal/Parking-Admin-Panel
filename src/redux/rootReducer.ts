import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';
import usersReducer from './slices/usersSlice';
import adminsReducer from './slices/adminsSlice';
import callsReducer from './slices/callsSlice';
import campaignsReducer from './slices/campaignsSlice';
import codesReducer from './slices/codesSlice';
import relationshipsReducer from './slices/relationshipsSlice';
import balancesReducer from './slices/balancesSlice';
import settingsReducer from './slices/settingsSlice';
import analyticsReducer from './slices/analyticsSlice';
import notificationReducer from './slices/notificationSlice';
import type { AuthState } from './slices/authSlice';
import type { UIState } from './slices/uiSlice';
import type { UsersState } from './slices/usersSlice';
import type { AdminsState } from './slices/adminsSlice';
import type { CallsState } from './slices/callsSlice';
import type { CampaignsState } from './slices/campaignsSlice';
import type { CodesState } from './slices/codesSlice';
import type { RelationshipsState } from './slices/relationshipsSlice';
import type { BalancesState } from './slices/balancesSlice';
import type { SettingsState } from './slices/settingsSlice';
import type { AnalyticsState } from './slices/analyticsSlice';
import type { NotificationState } from './slices/notificationSlice';

export interface RootState {
  auth: AuthState;
  ui: UIState;
  users: UsersState;
  admins: AdminsState;
  calls: CallsState;
  campaigns: CampaignsState;
  codes: CodesState;
  relationships: RelationshipsState;
  balances: BalancesState;
  settings: SettingsState;
  analytics: AnalyticsState;
  notifications: NotificationState;
}

export const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  users: usersReducer,
  admins: adminsReducer,
  calls: callsReducer,
  campaigns: campaignsReducer,
  codes: codesReducer,
  relationships: relationshipsReducer,
  balances: balancesReducer,
  settings: settingsReducer,
  analytics: analyticsReducer,
  notifications: notificationReducer,
});
