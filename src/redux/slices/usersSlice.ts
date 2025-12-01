import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { usersService } from '@/api/services/users.service';
import type {
  User,
  UserListItem,
  UserStats,
  UserFilters,
  UpdateUserPayload,
  UpdateUserStatusPayload,
  ExportTask,
  PaginationMeta,
} from '@/features/users/types';

// ✅ Export the state interface
export interface UsersState {
  users: UserListItem[];
  currentUser: User | null;
  stats: UserStats | null;
  pagination: PaginationMeta | null;
  filters: UserFilters;
  loading: boolean;
  error: string | null;
  exportTask: ExportTask | null;
  exportLoading: boolean;
}

const initialState: UsersState = {
  users: [],
  currentUser: null,
  stats: null,
  pagination: null,
  filters: {},
  loading: false,
  error: null,
  exportTask: null,
  exportLoading: false,
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
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (
    params: { page?: number; page_size?: number; filters?: UserFilters },
    { rejectWithValue }
  ) => {
    try {
      const response = await usersService.listUsers(params);
      return response;
    } catch (error: unknown) {
      return rejectWithValue(handleApiError(error) || 'Failed to fetch users');
    }
  }
);

export const fetchUserDetail = createAsyncThunk(
  'users/fetchUserDetail',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await usersService.getUserDetail(userId);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(handleApiError(error) || 'Failed to fetch user detail');
    }
  }
);

export const fetchUserStats = createAsyncThunk(
  'users/fetchUserStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await usersService.getUserStats();
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(handleApiError(error) || 'Failed to fetch user stats');
    }
  }
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async ({ userId, data }: { userId: string; data: UpdateUserPayload }, { rejectWithValue }) => {
    try {
      const response = await usersService.updateUser(userId, data);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(handleApiError(error) || 'Failed to update user');
    }
  }
);

export const updateUserStatus = createAsyncThunk(
  'users/updateUserStatus',
  async (
    { userId, data }: { userId: string; data: UpdateUserStatusPayload },
    { rejectWithValue }
  ) => {
    try {
      const response = await usersService.updateUserStatus(userId, data);
      return response.data;
    } catch (error: unknown) {
      return rejectWithValue(handleApiError(error) || 'Failed to update user status');
    }
  }
);

export const startExport = createAsyncThunk(
  'users/startExport',
  async (filters: UserFilters, { rejectWithValue }) => {
    try {
      const payload = {
        export_type: 'regular' as const,
        format: 'csv' as const,
        filters,
      };
      const task = await usersService.startExport(payload);
      return task;
    } catch (error: unknown) {
      return rejectWithValue(handleApiError(error) || 'Failed to start export');
    }
  }
);

export const checkExportStatus = createAsyncThunk(
  'users/checkExportStatus',
  async (taskId: string, { rejectWithValue }) => {
    try {
      const task = await usersService.checkExportStatus(taskId);
      return task;
    } catch (error: unknown) {
      return rejectWithValue(handleApiError(error) || 'Failed to check export status');
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<UserFilters>) => {
      state.filters = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearExportTask: (state) => {
      state.exportTask = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch users
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        
        // Handle the correct API response structure
        const response = action.payload;
        state.users = response.data || [];
        state.pagination = response.pagination || null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch user detail
    builder
      .addCase(fetchUserDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(fetchUserDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch user stats
    builder
      .addCase(fetchUserStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchUserStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update user
    builder
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        // Update in list if present
        const index = state.users.findIndex((u) => u.user_id === action.payload.user_id);
        if (index !== -1) {
          state.users[index] = {
            ...state.users[index],
            full_name: action.payload.full_name,
            email: action.payload.email,
          };
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update user status
    builder
      .addCase(updateUserStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        // Update in list if present
        const index = state.users.findIndex((u) => u.user_id === action.payload.user_id);
        if (index !== -1) {
          state.users[index].is_active = action.payload.is_active;
        }
      })
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Start export
    builder
      .addCase(startExport.pending, (state) => {
        state.exportLoading = true;
        state.error = null;
      })
      .addCase(startExport.fulfilled, (state, action) => {
        state.exportLoading = false;
        state.exportTask = action.payload;
      })
      .addCase(startExport.rejected, (state, action) => {
        state.exportLoading = false;
        state.error = action.payload as string;
      });

    // Check export status
    builder.addCase(checkExportStatus.fulfilled, (state, action) => {
      state.exportTask = action.payload;
    });
  },
});

export const { setFilters, clearFilters, clearCurrentUser, clearError, clearExportTask } =
  usersSlice.actions;

export default usersSlice.reducer;
