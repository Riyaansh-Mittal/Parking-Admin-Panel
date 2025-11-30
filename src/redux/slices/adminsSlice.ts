import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Admin } from '@types';

export interface AdminsState {
  admins: Admin[];
  currentAdmin: Admin | null;
  loading: boolean;
  error: string | null;
}

const initialState: AdminsState = {
  admins: [],
  currentAdmin: null,
  loading: false,
  error: null,
};

const adminsSlice = createSlice({
  name: 'admins',
  initialState,
  reducers: {
    setAdmins: (state, action: PayloadAction<Admin[]>) => {
      state.admins = action.payload;
    },
    setCurrentAdmin: (state, action: PayloadAction<Admin | null>) => {
      state.currentAdmin = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setAdmins, setCurrentAdmin, setLoading, setError } =
  adminsSlice.actions;

export default adminsSlice.reducer;
