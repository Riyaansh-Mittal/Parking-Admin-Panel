import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ReferralCode } from '@api/services/codes.service';

export interface CodesState {
  codes: ReferralCode[];
  currentCode: ReferralCode | null;
  loading: boolean;
  error: string | null;
}

const initialState: CodesState = {
  codes: [],
  currentCode: null,
  loading: false,
  error: null,
};

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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setCodes, setCurrentCode, setLoading, setError } =
  codesSlice.actions;

export default codesSlice.reducer;
