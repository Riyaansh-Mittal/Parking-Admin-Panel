import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { adminsService } from '@/api/services/admins.service';
import type {
  AdminUser,
  AdminListItem,
  AdminStats,
  AdminFilters,
  RegisterAdminPayload,
  UpdateAdminPayload,
  UpdateAdminStatusPayload,
} from '@/features/admins/types';
import type { PaginationMeta } from '@/types/pagination.types';

export interface AdminsState {
  admins: AdminListItem[];
  currentAdmin: AdminUser | null;
  stats: AdminStats | null;
  pagination: PaginationMeta | null;
  filters: AdminFilters;
  loading: boolean;
  error: string | null;
}

const initialState: AdminsState = {
  admins: [],
  currentAdmin: null,
  stats: null,
  pagination: null,
  filters: {},
  loading: false,
  error: null,
};

// Helper function to handle API errors
const handleApiError = (error: unknown): string => {
  if (error && typeof error === 'object' && 'response' in error) {
    const apiError = error as { response?: { data?: { error?: string } } };
    return apiError.response?.data?.error || 'An error occurred';
  }
  return 'An error occurred';
};

// Thunks
export const fetchAdmins = createAsyncThunk(
  'admins/fetchAdmins',
  async (
    params: { page?: number; page_size?: number; filters?: AdminFilters },
    { rejectWithValue }
  ) => {
    try {
      const response = await adminsService.listAdmins(params);
      return response;
    } catch (error: unknown) {
      return rejectWithValue(handleApiError(error) || 'Failed to fetch admins');
    }
  }
);

export const fetchAdminDetail = createAsyncThunk(
  'admins/fetchAdminDetail',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await adminsService.getAdminDetail(userId);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        handleApiError(error) || 'Failed to fetch admin detail'
      );
    }
  }
);

export const fetchAdminStats = createAsyncThunk(
  'admins/fetchAdminStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await adminsService.getAdminStats();
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        handleApiError(error) || 'Failed to fetch admin stats'
      );
    }
  }
);

export const registerAdmin = createAsyncThunk(
  'admins/registerAdmin',
  async (data: RegisterAdminPayload, { rejectWithValue }) => {
    try {
      const response = await adminsService.registerAdmin(data);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        handleApiError(error) || 'Failed to register admin'
      );
    }
  }
);

export const updateAdmin = createAsyncThunk(
  'admins/updateAdmin',
  async (
    { userId, data }: { userId: string; data: UpdateAdminPayload },
    { rejectWithValue }
  ) => {
    try {
      const response = await adminsService.updateAdmin(userId, data);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(handleApiError(error) || 'Failed to update admin');
    }
  }
);

export const updateAdminStatus = createAsyncThunk(
  'admins/updateAdminStatus',
  async (
    { userId, data }: { userId: string; data: UpdateAdminStatusPayload },
    { rejectWithValue }
  ) => {
    try {
      const response = await adminsService.updateAdminStatus(userId, data);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(
        handleApiError(error) || 'Failed to update admin status'
      );
    }
  }
);

const adminsSlice = createSlice({
  name: 'admins',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<AdminFilters>) => {
      state.filters = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    clearCurrentAdmin: (state) => {
      state.currentAdmin = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch admins
    builder
      .addCase(fetchAdmins.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = action.payload.data || []; // ✅ Use 'data' not 'results'

        // Transform pagination from API format
        if (action.payload.pagination) {
          state.pagination = {
            count: action.payload.pagination.count,
            next: action.payload.pagination.next,
            previous: action.payload.pagination.previous,
            current_page: action.payload.pagination.current_page,
            total_pages: action.payload.pagination.total_pages,
            page_size: action.payload.pagination.page_size,
          };
        }
      })

      .addCase(fetchAdmins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch admin detail
    builder
      .addCase(fetchAdminDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAdmin = action.payload;
      })
      .addCase(fetchAdminDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch admin stats
    builder
      .addCase(fetchAdminStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchAdminStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Register admin
    builder
      .addCase(registerAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAdmin.fulfilled, (state) => {
        state.loading = false;
        // Admin added, will be fetched in list
      })
      .addCase(registerAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update admin
    builder
      .addCase(updateAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAdmin = action.payload;
        // Update in list if present
        const index = state.admins.findIndex(
          (a) => a.user_id === action.payload.user_id
        );
        if (index !== -1) {
          state.admins[index] = {
            ...state.admins[index],
            first_name: action.payload.first_name,
            last_name: action.payload.last_name,
            user_type: action.payload.user_type,
          };
        }
      })
      .addCase(updateAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update admin status
    builder
      .addCase(updateAdminStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdminStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.currentAdmin = action.payload;
        // Update in list if present
        const index = state.admins.findIndex(
          (a) => a.user_id === action.payload.user_id
        );
        if (index !== -1) {
          state.admins[index].is_active = action.payload.is_active;
        }
      })
      .addCase(updateAdminStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, clearFilters, clearCurrentAdmin, clearError } =
  adminsSlice.actions;

export default adminsSlice.reducer;
