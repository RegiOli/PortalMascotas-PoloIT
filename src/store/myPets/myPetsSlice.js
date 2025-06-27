import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pets: [],
  isLoading: false,
  error: null,
};

export const myPetsSlice = createSlice({
  name: 'myPets',
  initialState,
  reducers: {
    onStartLoading: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    onLoadMyPets: (state, { payload }) => {
      state.pets = payload;
      state.isLoading = false;
    },
    onErrorMyPets: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    onUpdatePet: (state, { payload }) => {
      state.pets = state.pets.map((p) =>
        p.id === payload.id ? { ...p, ...payload } : p
      );
    },
    onDeletePet: (state, { payload }) => {
      state.pets = state.pets.filter((p) => p.id !== payload);
    },
  },
});

export const {
  onStartLoading,
  onLoadMyPets,
  onErrorMyPets,
  onUpdatePet,
  onDeletePet,
} = myPetsSlice.actions;

export default myPetsSlice.reducer;
