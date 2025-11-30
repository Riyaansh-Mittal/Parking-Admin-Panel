import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { DashboardStats } from '@api/services/analytics.service';

export interface AnalyticsState {
  dashboardStats: DashboardStats | null;
  referralSummary: unknown | null;
  loading: boolean;
  error: string | null;
}

const initialState: AnalyticsState = {
  dashboardStats: null,
  referralSummary: null,
  loading: false,
  error: null,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setDashboardStats: (state, action: PayloadAction<DashboardStats | null>) => {
      state.dashboardStats = action.payload;
    },
    setReferralSummary: (state, action: PayloadAction<unknown | null>) => {
      state.referralSummary = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setDashboardStats, setReferralSummary, setLoading, setError } =
  analyticsSlice.actions;

export default analyticsSlice.reducer;
