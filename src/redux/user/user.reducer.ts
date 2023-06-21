import { createReducer } from '@reduxjs/toolkit';
import {
  FETCH_USER,
  FETCH_USER_PROJECTS,
  LOGOUT_USER,
  UPDATE_USER,
} from './user.actions';
import { UserState } from './user.types';

const initialState: UserState = {
  loading: true,
  error: null,
  // @ts-ignore
  data: {
    projects: [],
  },
};

export const userReducer = createReducer(initialState, builder =>
  builder
    .addCase(FETCH_USER.START, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(FETCH_USER.COMPLETE, (state, { payload }) => {
      state.loading = false;
      state.data = { ...state.data, ...payload };
    })
    .addCase(FETCH_USER.FAIL, (state, { payload }) => {
      state.loading = false;
      state.error = payload.error;
    })
    .addCase(FETCH_USER_PROJECTS.START, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(FETCH_USER_PROJECTS.COMPLETE, (state, { payload }) => {
      state.loading = false;
      state.data = { ...state.data, projects: payload };
    })
    .addCase(FETCH_USER_PROJECTS.FAIL, (state, { payload }) => {
      state.loading = false;
      state.error = payload.error;
    })
    .addCase(UPDATE_USER.START, state => {
      state.loading = true;
      state.error = null;
    })
    .addCase(UPDATE_USER.COMPLETE, (state, { payload }) => {
      state.loading = false;
      state.data = { ...state.data, ...payload };
    })
    .addCase(UPDATE_USER.FAIL, (state, { payload }) => {
      state.loading = false;
      state.error = payload.error;
    })
    .addCase(LOGOUT_USER.COMPLETE, state => {
      state.data = { ...initialState.data };
      state.error = initialState.error;
      state.loading = initialState.loading;
    }),
);
