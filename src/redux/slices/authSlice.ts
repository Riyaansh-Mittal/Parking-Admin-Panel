import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as authService from '@api/services/auth.service';
import { storage } from '@utils/storageHelper';
import { STORAGE_KEYS } from '@utils/constants';
import { getErrorMessage } from '@utils/errorHandler';
import type { LoginRequest, LoginResponse } from '@api/services/auth.service';
import type { RootState } from '../store';

export interface AuthState {
  isAuthenticated: boolean;
  user: {
    admin_id: string;
    email: string;
    first_name: string;
    last_name: string;
    full_name: string;
    user_type: 'admin' | 'superuser';
    is_superuser: boolean;
  } | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: !!storage.get(STORAGE_KEYS.ACCESS_TOKEN),
  user: storage.get(STORAGE_KEYS.USER_INFO),
  accessToken: storage.get(STORAGE_KEYS.ACCESS_TOKEN),
  refreshToken: storage.get(STORAGE_KEYS.REFRESH_TOKEN),
  loading: false,
  error: null,
};

/**
 * Login async thunk
 */
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

/**
 * Logout async thunk
 */
export const logout = createAsyncThunk(
  'auth/logout',
  async (logoutAllDevices: boolean = false, { rejectWithValue }) => {
    try {
      await authService.logout(logoutAllDevices);
      return true;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

/**
 * Verify email async thunk
 */
export const verifyEmail = createAsyncThunk(
  'auth/verifyEmail',
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await authService.verifyEmail(token);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

/**
 * Set password async thunk
 */
export const setPassword = createAsyncThunk(
  'auth/setPassword',
  async (
    { token, password }: { token: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await authService.setPassword(token, password);
      return response.data;
    } catch (error) {
      return rejectWithValue(getErrorMessage(error));
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTokens: (
      state,
      action: PayloadAction<{ accessToken: string; refreshToken: string }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      storage.set(STORAGE_KEYS.ACCESS_TOKEN, action.payload.accessToken);
      storage.set(STORAGE_KEYS.REFRESH_TOKEN, action.payload.refreshToken);
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
      storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
      storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
      storage.remove(STORAGE_KEYS.USER_INFO);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = {
          admin_id: action.payload.admin_id,
          email: action.payload.email,
          first_name: action.payload.first_name,
          last_name: action.payload.last_name,
          full_name: action.payload.full_name,
          user_type: action.payload.user_type,
          is_superuser: action.payload.is_superuser,
        };
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;

        // Persist to storage
        storage.set(STORAGE_KEYS.ACCESS_TOKEN, action.payload.access_token);
        storage.set(STORAGE_KEYS.REFRESH_TOKEN, action.payload.refresh_token);
        storage.set(STORAGE_KEYS.USER_INFO, state.user);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Logout
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
        storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
        storage.remove(STORAGE_KEYS.USER_INFO);
      })
      .addCase(logout.rejected, (state) => {
        state.loading = false;
        // Clear auth even if logout fails
        state.isAuthenticated = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        storage.remove(STORAGE_KEYS.ACCESS_TOKEN);
        storage.remove(STORAGE_KEYS.REFRESH_TOKEN);
        storage.remove(STORAGE_KEYS.USER_INFO);
      });

    // Verify Email
    builder
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Set Password
    builder
      .addCase(setPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(setPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(setPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Add these to your existing authSlice
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsSuperuser = (state: RootState) => state.auth.user?.is_superuser ?? false;

export const { setTokens, clearAuth, clearError } = authSlice.actions;
export default authSlice.reducer;
