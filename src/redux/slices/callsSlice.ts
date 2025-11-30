import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as callsService from '@api/services/calls.service';
import { getErrorMessage } from '@utils/errorHandler';
import type { Call, CallFilters } from '@api/services/calls.service';
import type { PaginatedApiResponse } from '@api/types';

export interface CallsState {
  calls: Call[];
  currentCall: Call | null;
  stats: unknown | null;
  pagination: {
    count: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
  };
  filters: CallFilters;
  loading: boolean;
  error: string | null;
}

const initialState: CallsState = {
  calls: [],
  currentCall: null,
  stats: null,
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
 * Fetch calls async thunk
 */
export const fetchCalls = createAsyncThunk(
  'calls/fetchCalls',
  async (filters: CallFilters | undefined, { rejectWithValue }) => {
    try {
      const response = await callsService.getCalls(filters);
      return response;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

/**
 * Fetch call detail async thunk
 */
export const fetchCallDetail = createAsyncThunk(
  'calls/fetchCallDetail',
  async (callId: string, { rejectWithValue }) => {
    try {
      const response = await callsService.getCallDetail(callId);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

/**
 * Fetch call stats async thunk
 */
export const fetchCallStats = createAsyncThunk(
  'calls/fetchStats',
  async (
    params: { start_date?: string; end_date?: string } | undefined,
    { rejectWithValue }
  ) => {
    try {
      const response = await callsService.getCallStats(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const callsSlice = createSlice({
  name: 'calls',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<CallFilters>) => {
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
    // Fetch Calls
    builder
      .addCase(fetchCalls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCalls.fulfilled,
        (state, action: PayloadAction<PaginatedApiResponse<Call>>) => {
          state.loading = false;
          state.calls = action.payload.data;
          state.pagination = {
            count: action.payload.pagination.count,
            currentPage: action.payload.pagination.current_page,
            totalPages: action.payload.pagination.total_pages,
            pageSize: action.payload.pagination.page_size,
          };
        }
      )
      .addCase(fetchCalls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Call Detail
    builder
      .addCase(fetchCallDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCallDetail.fulfilled,
        (state, action: PayloadAction<Call>) => {
          state.loading = false;
          state.currentCall = action.payload;
        }
      )
      .addCase(fetchCallDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch Call Stats
    builder
      .addCase(fetchCallStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCallStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchCallStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, clearFilters, clearError } = callsSlice.actions;
export default callsSlice.reducer;
