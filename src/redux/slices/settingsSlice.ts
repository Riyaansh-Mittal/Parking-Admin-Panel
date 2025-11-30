import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PlatformSetting } from '@api/services/settings.service';

export interface SettingsState {
  settings: PlatformSetting[];
  currentSetting: PlatformSetting | null;
  loading: boolean;
  error: string | null;
}

const initialState: SettingsState = {
  settings: [],
  currentSetting: null,
  loading: false,
  error: null,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings: (state, action: PayloadAction<PlatformSetting[]>) => {
      state.settings = action.payload;
    },
    setCurrentSetting: (state, action: PayloadAction<PlatformSetting | null>) => {
      state.currentSetting = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setSettings, setCurrentSetting, setLoading, setError } =
  settingsSlice.actions;

export default settingsSlice.reducer;
