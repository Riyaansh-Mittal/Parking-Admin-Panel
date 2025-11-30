import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Relationship } from '@api/services/relationships.service';

export interface RelationshipsState {
  relationships: Relationship[];
  currentRelationship: Relationship | null;
  loading: boolean;
  error: string | null;
}

const initialState: RelationshipsState = {
  relationships: [],
  currentRelationship: null,
  loading: false,
  error: null,
};

const relationshipsSlice = createSlice({
  name: 'relationships',
  initialState,
  reducers: {
    setRelationships: (state, action: PayloadAction<Relationship[]>) => {
      state.relationships = action.payload;
    },
    setCurrentRelationship: (
      state,
      action: PayloadAction<Relationship | null>
    ) => {
      state.currentRelationship = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setRelationships,
  setCurrentRelationship,
  setLoading,
  setError,
} = relationshipsSlice.actions;

export default relationshipsSlice.reducer;
