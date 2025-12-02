import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import campaignsService from '@/api/services/campaigns.service';
import type {
  Campaign,
  CampaignDetail,
  CampaignFilters,
  CreateCampaignPayload,
  UpdateCampaignPayload,
  DeactivateCampaignPayload,
  CampaignPerformance,
} from '@/features/campaigns/types';
import type { PaginationMeta } from '@/types/pagination.types';

interface CampaignsState {
  campaigns: Campaign[];
  currentCampaign: CampaignDetail | null;
  performance: CampaignPerformance[];
  loading: boolean;
  performanceLoading: boolean;
  error: string | null;
  performanceError: string | null;
  pagination: PaginationMeta | null;
}

const initialState: CampaignsState = {
  campaigns: [],
  currentCampaign: null,
  performance: [],
  loading: false,
  performanceLoading: false,
  error: null,
  performanceError: null,
  pagination: null,
};

// Thunks
export const fetchCampaigns = createAsyncThunk(
  'campaigns/fetchCampaigns',
  async (filters?: CampaignFilters) => {
    const response = await campaignsService.getCampaigns(filters);
    return response;
  }
);

export const fetchCampaignDetail = createAsyncThunk(
  'campaigns/fetchCampaignDetail',
  async (campaignId: string) => {
    const response = await campaignsService.getCampaignDetail(campaignId);
    return response.data;
  }
);

export const createCampaign = createAsyncThunk(
  'campaigns/createCampaign',
  async (payload: CreateCampaignPayload) => {
    const response = await campaignsService.createCampaign(payload);
    return response.data;
  }
);

export const updateCampaign = createAsyncThunk(
  'campaigns/updateCampaign',
  async ({ campaignId, payload }: { campaignId: string; payload: UpdateCampaignPayload }) => {
    const response = await campaignsService.updateCampaign(campaignId, payload);
    return response.data;
  }
);

export const deactivateCampaign = createAsyncThunk(
  'campaigns/deactivateCampaign',
  async ({ campaignId, payload }: { campaignId: string; payload?: DeactivateCampaignPayload }) => {
    const response = await campaignsService.deactivateCampaign(campaignId, payload);
    return response.data;
  }
);

export const fetchCampaignPerformance = createAsyncThunk(
  'campaigns/fetchPerformance',
  async (params?: { campaign_id?: string; start_date?: string; end_date?: string }) => {
    const response = await campaignsService.getCampaignPerformance(params);
    return response.data;
  }
);

const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    clearCurrentCampaign: (state) => {
      state.currentCampaign = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Campaigns
      .addCase(fetchCampaigns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchCampaigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch campaigns';
      })

      // Fetch Campaign Detail
      .addCase(fetchCampaignDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampaignDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCampaign = action.payload;
      })
      .addCase(fetchCampaignDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch campaign';
      })

      // Create Campaign
      .addCase(createCampaign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns.unshift(action.payload as Campaign);
      })
      .addCase(createCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create campaign';
      })

      // Update Campaign
      .addCase(updateCampaign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCampaign.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.campaigns.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.campaigns[index] = action.payload as Campaign;
        }
        if (state.currentCampaign?.id === action.payload.id) {
          state.currentCampaign = action.payload;
        }
      })
      .addCase(updateCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update campaign';
      })

      // Deactivate Campaign
      .addCase(deactivateCampaign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deactivateCampaign.fulfilled, (state, action) => {
        state.loading = false;
        const campaignId = action.payload.campaign_id;
        const index = state.campaigns.findIndex((c) => c.id === campaignId);
        if (index !== -1) {
          state.campaigns[index].is_active = false;
        }
        if (state.currentCampaign?.id === campaignId) {
          state.currentCampaign.is_active = false;
        }
      })
      .addCase(deactivateCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to deactivate campaign';
      })

      // Fetch Performance
      .addCase(fetchCampaignPerformance.pending, (state) => {
        state.performanceLoading = true;
        state.performanceError = null;
      })
      .addCase(fetchCampaignPerformance.fulfilled, (state, action) => {
        state.performanceLoading = false;
        state.performance = action.payload;
      })
      .addCase(fetchCampaignPerformance.rejected, (state, action) => {
        state.performanceLoading = false;
        state.performanceError = action.error.message || 'Failed to fetch performance';
      });
  },
});

export const { clearCurrentCampaign, clearError } = campaignsSlice.actions;
export default campaignsSlice.reducer;
