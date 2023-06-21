import { combineReducers } from '@reduxjs/toolkit';
import { userReducer } from '../user/user.reducer';
import { authReducer } from '../login/auth.reducer';

export const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
});
