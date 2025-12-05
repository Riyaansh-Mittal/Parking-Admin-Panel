import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type {
  CallSummaryStats,
  CallAnalyticsOverview,
  ReferralSummary,
  TopReferrer,
  ConversionStats,
  CampaignPerformance,
  StatusBreakdown,
  AnalyticsFilters,
  ReferralAnalyticsFilters,
} from '@features/analytics/types';
import {
  getCallSummary,
  getCallAnalytics,
  getReferralSummary,
  getTopReferrers,
  getConversionStats,
  getCampaignPerformance,
  getStatusBreakdown,
} from '@/api/services/analytics.service';

export interface AnalyticsState {
  // Call Analytics
  callSummary: CallSummaryStats | null;
  callAnalytics: CallAnalyticsOverview | null;
  
  // Referral Analytics
  referralSummary: ReferralSummary | null;
  topReferrers: TopReferrer[];
  conversionStats: ConversionStats | null;
  campaignPerformance: CampaignPerformance[];
  statusBreakdown: StatusBreakdown | null;
  
  // Loading States
  loading: {
    callSummary: boolean;
    callAnalytics: boolean;
    referralSummary: boolean;
    topReferrers: boolean;
    conversionStats: boolean;
    campaignPerformance: boolean;
    statusBreakdown: boolean;
  };
  
  // Error States
  error: {
    callSummary: string | null;
    callAnalytics: string | null;
    referralSummary: string | null;
    topReferrers: string | null;
    conversionStats: string | null;
    campaignPerformance: string | null;
    statusBreakdown: string | null;
  };
}

const initialState: AnalyticsState = {
  callSummary: null,
  callAnalytics: null,
  referralSummary: null,
  topReferrers: [],
  conversionStats: null,
  campaignPerformance: [],
  statusBreakdown: null,
  loading: {
    callSummary: false,
    callAnalytics: false,
    referralSummary: false,
    topReferrers: false,
    conversionStats: false,
    campaignPerformance: false,
    statusBreakdown: false,
  },
  error: {
    callSummary: null,
    callAnalytics: null,
    referralSummary: null,
    topReferrers: null,
    conversionStats: null,
    campaignPerformance: null,
    statusBreakdown: null,
  },
};

// ============================================================================
// ASYNC THUNKS - CALL ANALYTICS
// ============================================================================

export const fetchCallSummary = createAsyncThunk(
  'analytics/fetchCallSummary',
  async (filters?: AnalyticsFilters) => {
    const response = await getCallSummary(filters);
    return response.data;
  }
);

export const fetchCallAnalytics = createAsyncThunk(
  'analytics/fetchCallAnalytics',
  async (filters?: AnalyticsFilters) => {
    const response = await getCallAnalytics(filters);
    return response.data;
  }
);

// ============================================================================
// ASYNC THUNKS - REFERRAL ANALYTICS
// ============================================================================

export const fetchReferralSummary = createAsyncThunk(
  'analytics/fetchReferralSummary',
  async (filters?: ReferralAnalyticsFilters) => {
    const response = await getReferralSummary(filters);
    return response.data;
  }
);

export const fetchTopReferrers = createAsyncThunk(
  'analytics/fetchTopReferrers',
  async (filters?: ReferralAnalyticsFilters) => {
    const response = await getTopReferrers(filters);
    return response.data;
  }
);

export const fetchConversionStats = createAsyncThunk(
  'analytics/fetchConversionStats',
  async (filters?: ReferralAnalyticsFilters) => {
    const response = await getConversionStats(filters);
    return response.data;
  }
);

export const fetchCampaignPerformance = createAsyncThunk(
  'analytics/fetchCampaignPerformance',
  async (filters?: ReferralAnalyticsFilters) => {
    const response = await getCampaignPerformance(filters);
    return response.data;
  }
);

export const fetchStatusBreakdown = createAsyncThunk(
  'analytics/fetchStatusBreakdown',
  async (filters?: ReferralAnalyticsFilters) => {
    const response = await getStatusBreakdown(filters);
    return response.data;
  }
);

// ============================================================================
// SLICE
// ============================================================================

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    clearAnalyticsErrors: (state) => {
      state.error = initialState.error;
    },
  },
  extraReducers: (builder) => {
    // Call Summary
    builder
      .addCase(fetchCallSummary.pending, (state) => {
        state.loading.callSummary = true;
        state.error.callSummary = null;
      })
      .addCase(fetchCallSummary.fulfilled, (state, action) => {
        state.loading.callSummary = false;
        state.callSummary = action.payload;
      })
      .addCase(fetchCallSummary.rejected, (state, action) => {
        state.loading.callSummary = false;
        state.error.callSummary = action.error.message || 'Failed to fetch call summary';
      });

    // Call Analytics
    builder
      .addCase(fetchCallAnalytics.pending, (state) => {
        state.loading.callAnalytics = true;
        state.error.callAnalytics = null;
      })
      .addCase(fetchCallAnalytics.fulfilled, (state, action) => {
        state.loading.callAnalytics = false;
        state.callAnalytics = action.payload;
      })
      .addCase(fetchCallAnalytics.rejected, (state, action) => {
        state.loading.callAnalytics = false;
        state.error.callAnalytics = action.error.message || 'Failed to fetch call analytics';
      });

    // Referral Summary
    builder
      .addCase(fetchReferralSummary.pending, (state) => {
        state.loading.referralSummary = true;
        state.error.referralSummary = null;
      })
      .addCase(fetchReferralSummary.fulfilled, (state, action) => {
        state.loading.referralSummary = false;
        state.referralSummary = action.payload;
      })
      .addCase(fetchReferralSummary.rejected, (state, action) => {
        state.loading.referralSummary = false;
        state.error.referralSummary = action.error.message || 'Failed to fetch referral summary';
      });

    // Top Referrers
    builder
      .addCase(fetchTopReferrers.pending, (state) => {
        state.loading.topReferrers = true;
        state.error.topReferrers = null;
      })
      .addCase(fetchTopReferrers.fulfilled, (state, action) => {
        state.loading.topReferrers = false;
        state.topReferrers = action.payload;
      })
      .addCase(fetchTopReferrers.rejected, (state, action) => {
        state.loading.topReferrers = false;
        state.error.topReferrers = action.error.message || 'Failed to fetch top referrers';
      });

    // Conversion Stats
    builder
      .addCase(fetchConversionStats.pending, (state) => {
        state.loading.conversionStats = true;
        state.error.conversionStats = null;
      })
      .addCase(fetchConversionStats.fulfilled, (state, action) => {
        state.loading.conversionStats = false;
        state.conversionStats = action.payload;
      })
      .addCase(fetchConversionStats.rejected, (state, action) => {
        state.loading.conversionStats = false;
        state.error.conversionStats = action.error.message || 'Failed to fetch conversion stats';
      });

    // Campaign Performance
    builder
      .addCase(fetchCampaignPerformance.pending, (state) => {
        state.loading.campaignPerformance = true;
        state.error.campaignPerformance = null;
      })
      .addCase(fetchCampaignPerformance.fulfilled, (state, action) => {
        state.loading.campaignPerformance = false;
        state.campaignPerformance = action.payload;
      })
      .addCase(fetchCampaignPerformance.rejected, (state, action) => {
        state.loading.campaignPerformance = false;
        state.error.campaignPerformance =
          action.error.message || 'Failed to fetch campaign performance';
      });

    // Status Breakdown
    builder
      .addCase(fetchStatusBreakdown.pending, (state) => {
        state.loading.statusBreakdown = true;
        state.error.statusBreakdown = null;
      })
      .addCase(fetchStatusBreakdown.fulfilled, (state, action) => {
        state.loading.statusBreakdown = false;
        state.statusBreakdown = action.payload;
      })
      .addCase(fetchStatusBreakdown.rejected, (state, action) => {
        state.loading.statusBreakdown = false;
        state.error.statusBreakdown = action.error.message || 'Failed to fetch status breakdown';
      });
  },
});

export const { clearAnalyticsErrors } = analyticsSlice.actions;
export default analyticsSlice.reducer;
