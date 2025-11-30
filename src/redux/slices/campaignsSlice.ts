import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as campaignsService from '@api/services/campaigns.service';
import { getErrorMessage } from '@utils/errorHandler';
import type {
  Campaign,
  CampaignFilters,
  CreateCampaignRequest,
} from '@api/services/campaigns.service';
import type { PaginatedApiResponse } from '@api/types';

export interface CampaignsState {
  campaigns: Campaign[];
  currentCampaign: Campaign | null;
  pagination: {
    count: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
  };
  filters: CampaignFilters;
  loading: boolean;
  error: string | null;
}

const initialState: CampaignsState = {
  campaigns: [],
  currentCampaign: null,
  pagination: {
    count: 0,
    currentPage: 1,
    totalPages: 1,
    pageSize: 20,
  },
  filters: {
    page: 1,
    page_size: 20,
  },
  loading: false,
  error: null,
};

/**
 * Fetch campaigns async thunk
 */
export const fetchCampaigns = createAsyncThunk(
  'campaigns/fetchCampaigns',
  async (filters: CampaignFilters | undefined, { rejectWithValue }) => {
    try {
      const response = await campaignsService.getCampaigns(filters);
      return response;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

/**
 * Fetch campaign detail async thunk
 */
export const fetchCampaignDetail = createAsyncThunk(
  'campaigns/fetchCampaignDetail',
  async (campaignId: string, { rejectWithValue }) => {
    try {
      const response = await campaignsService.getCampaignDetail(campaignId);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

/**
 * Create campaign async thunk
 */
export const createCampaign = createAsyncThunk(
  'campaigns/createCampaign',
  async (data: CreateCampaignRequest, { rejectWithValue }) => {
    try {
      const response = await campaignsService.createCampaign(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

/**
 * Generate campaign codes async thunk
 */
export const generateCodes = createAsyncThunk(
  'campaigns/generateCodes',
  async (
    { campaignId, count }: { campaignId: string; count: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await campaignsService.generateCampaignCodes(
        campaignId,
        count
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const campaignsSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<CampaignFilters>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = { page: 1, page_size: 20 };
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Campaigns
    builder
      .addCase(fetchCampaigns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCampaigns.fulfilled,
        (state, action: PayloadAction<PaginatedApiResponse<Campaign>>) => {
          state.loading = false;
          state.campaigns = action.payload.data;
          state.pagination = {
            count: action.payload.pagination.count,
            currentPage: action.payload.pagination.current_page,
            totalPages: action.payload.pagination.total_pages,
            pageSize: action.payload.pagination.page_size,
          };
        }
      )
      .addCase(fetchCampaigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Campaign Detail
    builder
      .addCase(fetchCampaignDetail.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchCampaignDetail.fulfilled,
        (state, action: PayloadAction<Campaign>) => {
          state.loading = false;
          state.currentCampaign = action.payload;
        }
      )
      .addCase(fetchCampaignDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create Campaign
    builder
      .addCase(createCampaign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createCampaign.fulfilled,
        (state, action: PayloadAction<Campaign>) => {
          state.loading = false;
          state.campaigns.unshift(action.payload);
        }
      )
      .addCase(createCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Generate Codes
    builder
      .addCase(generateCodes.pending, (state) => {
        state.loading = true;
      })
      .addCase(generateCodes.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(generateCodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, clearFilters, clearError } = campaignsSlice.actions;
export default campaignsSlice.reducer;
