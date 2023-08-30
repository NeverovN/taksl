import { createAction } from '@reduxjs/toolkit';
import { LoginRequestBody, AuthData, RegisterRequestBody } from './auth.types';

export const LOGIN = {
  TRIGGER: createAction<LoginRequestBody>('[Login] Triggered'),
  START: createAction('[Login] Started'),
  COMPLETE: createAction<AuthData>('[Login] Complete'),
  FAIL: createAction<{ error: Error }>('[Login] Failed'),
};

export const REGISTER = {
  TRIGGER: createAction<RegisterRequestBody>('[Register] Triggered'),
  START: createAction('[Register] Started'),
  COMPLETE: createAction('[Register] Complete'),
  FAIL: createAction<{ error: Error }>('[Register] Failed'),
};

export const LOGOUT = {
  TRIGGER: createAction('[Logout] Triggered'),
  COMPLETE: createAction('[Logout] Complete'),
};
