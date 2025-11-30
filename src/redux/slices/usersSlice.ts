import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as usersService from '@api/services/users.service';
import { getErrorMessage } from '@utils/errorHandler';
import type { User } from '@types';
import type { PaginatedApiResponse } from '@api/types';
import type { UserFilters, UserStats } from '@api/services/users.service';

export interface UsersState {
  users: User[];
  currentUser: User | null;
  stats: UserStats | null;
  pagination: {
    count: number;
    currentPage: number;
    totalPages: number;
    pageSize: number;
  };
  filters: UserFilters;
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  currentUser: null,
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
 * Fetch users async thunk
 */
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (filters: UserFilters | undefined, { rejectWithValue }) => {
    try {
      const response = await usersService.getUsers(filters);
      return response;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

/**
 * Fetch user detail async thunk
 */
export const fetchUserDetail = createAsyncThunk(
  'users/fetchUserDetail',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await usersService.getUserDetail(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

/**
 * Update user status async thunk
 */
export const updateUserStatus = createAsyncThunk(
  'users/updateStatus',
  async (
    {
      userId,
      isActive,
      reason,
    }: { userId: string; isActive: boolean; reason?: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await usersService.updateUserStatus(
        userId,
        isActive,
        reason
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

/**
 * Fetch user stats async thunk
 */
export const fetchUserStats = createAsyncThunk(
  'users/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await usersService.getUserStats();
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<UserFilters>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        page: 1,
        page_size: 20,
      };
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Users
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<PaginatedApiResponse<User>>) => {
          state.loading = false;
          state.users = action.payload.data;
          state.pagination = {
            count: action.payload.pagination.count,
            currentPage: action.payload.pagination.current_page,
            totalPages: action.payload.pagination.total_pages,
            pageSize: action.payload.pagination.page_size,
          };
        }
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch User Detail
    builder
      .addCase(fetchUserDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserDetail.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          state.currentUser = action.payload;
        }
      )
      .addCase(fetchUserDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update User Status
    builder
      .addCase(updateUserStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateUserStatus.fulfilled,
        (state, action: PayloadAction<User>) => {
          state.loading = false;
          // Update user in list
          const index = state.users.findIndex(
            (u) => u.user_id === action.payload.user_id
          );
          if (index !== -1) {
            state.users[index] = action.payload;
          }
          // Update current user if viewing detail
          if (state.currentUser?.user_id === action.payload.user_id) {
            state.currentUser = action.payload;
          }
        }
      )
      .addCase(updateUserStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Fetch User Stats
    builder
      .addCase(fetchUserStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchUserStats.fulfilled,
        (state, action: PayloadAction<UserStats>) => {
          state.loading = false;
          state.stats = action.payload;
        }
      )
      .addCase(fetchUserStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, clearFilters, clearError, clearCurrentUser } =
  usersSlice.actions;

export default usersSlice.reducer;
