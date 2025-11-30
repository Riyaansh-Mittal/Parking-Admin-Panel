import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { storage } from '@utils/storageHelper';
import { STORAGE_KEYS } from '@utils/constants';

export interface UIState {
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark';
  currentPage: string;
  breadcrumbs: Array<{ label: string; path: string }>;
}

const initialState: UIState = {
  sidebarCollapsed: storage.get<boolean>(STORAGE_KEYS.SIDEBAR_STATE) || false,
  theme: storage.get<'light' | 'dark'>(STORAGE_KEYS.THEME) || 'light',
  currentPage: 'Dashboard',
  breadcrumbs: [{ label: 'Home', path: '/' }],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
      storage.set(STORAGE_KEYS.SIDEBAR_STATE, state.sidebarCollapsed);
    },
    setSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.sidebarCollapsed = action.payload;
      storage.set(STORAGE_KEYS.SIDEBAR_STATE, action.payload);
    },
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
      storage.set(STORAGE_KEYS.THEME, action.payload);
    },
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload;
    },
    setBreadcrumbs: (
      state,
      action: PayloadAction<Array<{ label: string; path: string }>>
    ) => {
      state.breadcrumbs = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarCollapsed,
  setTheme,
  setCurrentPage,
  setBreadcrumbs,
} = uiSlice.actions;

export default uiSlice.reducer;
