import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Balance } from '@api/services/balances.service';

export interface BalancesState {
  balances: Balance[];
  currentBalance: Balance | null;
  loading: boolean;
  error: string | null;
}

const initialState: BalancesState = {
  balances: [],
  currentBalance: null,
  loading: false,
  error: null,
};

const balancesSlice = createSlice({
  name: 'balances',
  initialState,
  reducers: {
    setBalances: (state, action: PayloadAction<Balance[]>) => {
      state.balances = action.payload;
    },
    setCurrentBalance: (state, action: PayloadAction<Balance | null>) => {
      state.currentBalance = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setBalances, setCurrentBalance, setLoading, setError } =
  balancesSlice.actions;

export default balancesSlice.reducer;
