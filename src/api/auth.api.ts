/* eslint-disable @typescript-eslint/no-unused-vars */

import { baseApi } from './base.api';
import { PromiseResponse } from 'src/common/types/api.types';
import { delay } from 'src/common/utils/delay.util';
import {
  AuthResponse,
  LoginRequestBody,
  RegisterRequestBody,
} from 'src/redux/login/auth.types';

export class AuthAPI {
  login = async (
    body: LoginRequestBody,
  ): PromiseResponse<AuthResponse, Error> =>
    await baseApi.post('/auth/sign-in', body);

  register = async (
    body: RegisterRequestBody,
  ): PromiseResponse<AuthResponse, Error> =>
    baseApi.post('/auth/sign-up', body);
}

export const authApi = new AuthAPI();
