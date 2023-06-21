import { createReducer } from '@reduxjs/toolkit';
import { LOGIN, LOGOUT, REGISTER } from './auth.actions';
import { AuthState } from './auth.types';

const initialState: AuthState = {
  loading: true,
  error: null,
  data: {
    token: null,
  },
};

export const authReducer = createReducer(initialState, builder =>
  builder
    .addCase(LOGIN.START, state => {
      state.loading = true;
      state.data.token = null;
      state.error = null;
    })
    .addCase(LOGIN.COMPLETE, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.data = { ...payload };
    })
    .addCase(LOGIN.FAIL, (state, { payload }) => {
      state.loading = false;
      state.data.token = null;
      state.error = payload.error;
    })
    .addCase(REGISTER.START, state => {
      state.loading = true;
      state.data.token = null;
      state.error = null;
    })
    .addCase(REGISTER.COMPLETE, (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.data = { ...payload };
    })
    .addCase(REGISTER.FAIL, (state, { payload }) => {
      state.loading = false;
      state.data.token = null;
      state.error = payload.error;
    })
    .addCase(LOGOUT.COMPLETE, state => {
      state.loading = initialState.loading;
      state.error = initialState.error;
      state.data = { ...initialState.data };
    }),
);
