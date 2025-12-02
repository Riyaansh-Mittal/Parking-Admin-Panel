import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { codesService } from '@/api/services/codes.service';
import type {
  ReferralCode,
  CodeFilters,
  CreateStandaloneCodePayload,
  BulkDeactivatePayload,
  BulkExtendValidityPayload,
  BulkIncreaseUsagePayload,
  CodeStats,
  UpdateCodePayload,
} from '@/features/codes/types';
import type { PaginationMeta } from '@/types/pagination.types';

export interface CodesState {
  codes: ReferralCode[];
  currentCode: ReferralCode | null;
  stats: CodeStats | null;
  loading: boolean;
  error: string | null;
  pagination: PaginationMeta | null;
}

const initialState: CodesState = {
  codes: [],
  currentCode: null,
  stats: null,
  loading: false,
  error: null,
  pagination: null,
};

// Async thunks
export const fetchCodes = createAsyncThunk(
  'codes/fetchCodes',
  async (params: {
    filters?: CodeFilters;
    page?: number;
    page_size?: number;
    ordering?: string;
  }) => {
    const response = await codesService.getCodes(params.filters);
    return {
      data: response.data, // ✅ Adapt each code
      pagination: response.pagination,
    };
  }
);

export const fetchCodeDetail = createAsyncThunk(
  'codes/fetchCodeDetail',
  async (codeId: string) => {
    const response = await codesService.getCodeDetail(codeId);
    return response.data; // ✅ Adapt
  }
);

export const updateCode = createAsyncThunk(
  'codes/updateCode',
  async ({ codeId, payload }: { codeId: string; payload: UpdateCodePayload }) => {
    const response = await codesService.updateCode(codeId, payload);
    return response.data;
  }
);

export const createStandaloneCode = createAsyncThunk(
  'codes/createStandaloneCode',
  async (payload: CreateStandaloneCodePayload) => {
    const response = await codesService.createStandaloneCode(payload);
    return response.data;
  }
);

export const deactivateCode = createAsyncThunk(
  'codes/deactivateCode',
  async ({ codeId, reason }: { codeId: string; reason?: string }) => {
    const response = await codesService.deactivateCode(codeId, reason);
    return response.data;
  }
);

export const bulkDeactivateCodes = createAsyncThunk(
  'codes/bulkDeactivate',
  async (payload: BulkDeactivatePayload) => {
    const response = await codesService.bulkDeactivateCodes(payload);
    return { ...response.data, code_ids: payload.code_ids };
  }
);

export const bulkExtendValidity = createAsyncThunk(
  'codes/bulkExtendValidity',
  async (payload: BulkExtendValidityPayload) => {
    const response = await codesService.bulkExtendValidity(payload);
    return { ...response.data, code_ids: payload.code_ids };
  }
);

export const bulkIncreaseUsage = createAsyncThunk(
  'codes/bulkIncreaseUsage',
  async (payload: BulkIncreaseUsagePayload) => {
    const response = await codesService.bulkIncreaseUsage(payload);
    return { ...response.data, code_ids: payload.code_ids };
  }
);

export const fetchCodeStats = createAsyncThunk(
  'codes/fetchCodeStats',
  async () => {
    const response = await codesService.getCodeStats();
    return response.data;
  }
);

const codesSlice = createSlice({
  name: 'codes',
  initialState,
  reducers: {
    setCodes: (state, action: PayloadAction<ReferralCode[]>) => {
      state.codes = action.payload;
    },
    setCurrentCode: (state, action: PayloadAction<ReferralCode | null>) => {
      state.currentCode = action.payload;
    },
    clearCurrentCode: (state) => {
      state.currentCode = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Codes
      .addCase(fetchCodes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCodes.fulfilled, (state, action) => {
        state.loading = false;
        state.codes = action.payload.data;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchCodes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch codes';
      })

      // Fetch Code Detail
      .addCase(fetchCodeDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCodeDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCode = action.payload;
      })
      .addCase(fetchCodeDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch code';
      })

      // Update Code
      .addCase(updateCode.fulfilled, (state, action) => {
        const index = state.codes.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) {
          state.codes[index] = action.payload;
        }
        if (state.currentCode?.id === action.payload.id) {
          state.currentCode = action.payload;
        }
      })

      // Deactivate Code
      .addCase(deactivateCode.fulfilled, (state, action) => {
        const codeId = action.payload.code_id;
        const index = state.codes.findIndex((c) => c.id === codeId);
        if (index !== -1) {
          state.codes[index].status = 'inactive';
        }
        if (state.currentCode?.id === codeId) {
          state.currentCode.status = 'inactive';
        }
      })

      // Bulk Deactivate
      .addCase(bulkDeactivateCodes.fulfilled, (state, action) => {
        const codeIds = action.payload.code_ids;
        state.codes = state.codes.map((code) =>
          codeIds.includes(code.id)
            ? { ...code, status: 'inactive' as const }
            : code
        );
      })

      // Fetch Stats
      .addCase(fetchCodeStats.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCodeStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchCodeStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch stats';
      });
  },
});

export const {
  setCodes,
  setCurrentCode,
  clearCurrentCode,
  setLoading,
  setError,
  clearError,
} = codesSlice.actions;

export default codesSlice.reducer;
