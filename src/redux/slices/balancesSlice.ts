import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { PaginationMeta } from '@/types/pagination.types';
import type {
  Balance,
  BalanceDetail,
  ResetLog,
  BulkUpdateResponse,
  BalanceFilters,
  ResetLogFilters,
  UpdateBalanceRequest,
  BulkUpdateBalanceRequest,
} from '@/features/balances/types';
import * as balancesService from '@/api/services/balances.service';

export interface BalancesState {
  balances: Balance[];
  currentBalance: BalanceDetail | null;
  resetLogs: ResetLog[];
  pagination: PaginationMeta | null;
  loading: boolean;
  detailLoading: boolean;
  logsLoading: boolean;
  updating: boolean;
  error: string | null;
}

const initialState: BalancesState = {
  balances: [],
  currentBalance: null,
  resetLogs: [],
  pagination: null,
  loading: false,
  detailLoading: false,
  logsLoading: false,
  updating: false,
  error: null,
};

/**
 * Async Thunks
 */
export const fetchBalances = createAsyncThunk(
  'balances/fetchBalances',
  async (filters?: BalanceFilters) => {
    const data = await balancesService.getBalances(filters);
    return data;
  }
);

export const fetchBalanceDetail = createAsyncThunk(
  'balances/fetchBalanceDetail',
  async (userId: string) => {
    const data = await balancesService.getBalanceDetail(userId);
    return data;
  }
);

export const updateBalance = createAsyncThunk(
  'balances/updateBalance',
  async ({ userId, data }: { userId: string; data: UpdateBalanceRequest }) => {
    const updated = await balancesService.updateBalance(userId, data);
    return updated;
  }
);

export const bulkUpdateBalances = createAsyncThunk(
  'balances/bulkUpdateBalances',
  async (data: BulkUpdateBalanceRequest) => {
    const result = await balancesService.bulkUpdateBalances(data);
    return result;
  }
);

export const fetchResetLogs = createAsyncThunk(
  'balances/fetchResetLogs',
  async ({
    filters,
    page,
    pageSize,
  }: {
    filters?: ResetLogFilters;
    page?: number;
    pageSize?: number;
  }) => {
    const response = await balancesService.getResetLogs(
      filters,
      page,
      pageSize
    );
    return response;
  }
);

/**
 * Slice
 */
const balancesSlice = createSlice({
  name: 'balances',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentBalance: (state) => {
      state.currentBalance = null;
    },
    clearResetLogs: (state) => {
      state.resetLogs = [];
      state.pagination = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Balances (direct array)
      .addCase(fetchBalances.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchBalances.fulfilled,
        (state, action: PayloadAction<Balance[]>) => {
          state.loading = false;
          state.balances = action.payload;
        }
      )
      .addCase(fetchBalances.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch balances';
      })

      // Fetch Balance Detail
      .addCase(fetchBalanceDetail.pending, (state) => {
        state.detailLoading = true;
        state.error = null;
      })
      .addCase(
        fetchBalanceDetail.fulfilled,
        (state, action: PayloadAction<BalanceDetail>) => {
          state.detailLoading = false;
          state.currentBalance = action.payload;
        }
      )
      .addCase(fetchBalanceDetail.rejected, (state, action) => {
        state.detailLoading = false;
        state.error = action.error.message || 'Failed to fetch balance detail';
      })

      // Update Balance
      .addCase(updateBalance.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(
        updateBalance.fulfilled,
        (state, action: PayloadAction<Balance>) => {
          state.updating = false;
          // Update in list if exists
          const index = state.balances.findIndex(
            (b) => b.user_id === action.payload.user_id
          );
          if (index !== -1) {
            state.balances[index] = action.payload;
          }
          // Update current balance if it's the same user
          if (
            state.currentBalance?.balance.user_id === action.payload.user_id
          ) {
            state.currentBalance.balance = action.payload;
          }
        }
      )
      .addCase(updateBalance.rejected, (state, action) => {
        state.updating = false;
        state.error = action.error.message || 'Failed to update balance';
      })

      // Bulk Update
      .addCase(bulkUpdateBalances.pending, (state) => {
        state.updating = true;
        state.error = null;
      })
      .addCase(
        bulkUpdateBalances.fulfilled,
        (state, action: PayloadAction<BulkUpdateResponse>) => {
          state.updating = false;
          // Show error if there were failures
          if (action.payload.failed_count > 0) {
            state.error = `${action.payload.failed_count} of ${action.payload.updated_count + action.payload.failed_count} updates failed`;
          } else {
            state.error = null;
          }
        }
      )

      .addCase(bulkUpdateBalances.rejected, (state, action) => {
        state.updating = false;
        state.error = action.error.message || 'Failed to bulk update balances';
      })

      // Fetch Reset Logs
      .addCase(fetchResetLogs.pending, (state) => {
        state.logsLoading = true;
        state.error = null;
      })
      .addCase(fetchResetLogs.fulfilled, (state, action) => {
        state.logsLoading = false;
        state.resetLogs = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchResetLogs.rejected, (state, action) => {
        state.logsLoading = false;
        state.error = action.error.message || 'Failed to fetch reset logs';
      });
  },
});

export const { clearError, clearCurrentBalance, clearResetLogs } =
  balancesSlice.actions;

export default balancesSlice.reducer;
