// src/store/pets/petSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pets: [],
  isLoading: false,
  error: null,
  totalPages: 1,
  currentPage: 1,
};

export const petSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    onStartLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    onLoadPets: (state, { payload }) => {
      state.isLoading = false;
      state.pets = payload.data;
      state.totalPages = payload.total_pages;
      state.currentPage = payload.page;
    },
    onErrorPets: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const { onStartLoading, onLoadPets, onErrorPets } = petSlice.actions;
export default petSlice.reducer;
