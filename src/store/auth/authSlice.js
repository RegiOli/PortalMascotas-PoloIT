// src/store/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'not-authenticated', // 'authenticated', 'checking'
  user: null,                  // null cuando no hay usuario
  errorMessage: undefined
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = 'checking';
      state.user = null;          // limpia user mientras verifica
      state.errorMessage = undefined;
    },
    onLogin: (state, { payload }) => {
      state.status = 'authenticated';
      state.user = payload;       // payload contiene info del usuario (ej: { uid, nombre, rol, token })
      state.errorMessage = undefined;
    },
    onLogout: (state, { payload }) => {
      state.status = 'not-authenticated';
      state.user = null;          // limpia usuario al cerrar sesión
      state.errorMessage = payload; // puede ser mensaje de error opcional
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined;
    }
  }
});

export const {
  onChecking,
  onLogin,
  onLogout,
  clearErrorMessage
} = authSlice.actions;

export default authSlice.reducer;
