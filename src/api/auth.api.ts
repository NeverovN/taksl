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
  ): PromiseResponse<AuthResponse, Error> => {
    console.log(body);

    const resp = await baseApi.post('auth/sign-in', body);
    console.log(resp);

    return resp;

    // await delay(500);
    // return {
    //   status: 200,
    //   ok: true,
    //   data: {
    //     userId: '0',
    //     token: 'Some-Token',
    //   },
    // };
  };

  register = async (
    body: RegisterRequestBody,
  ): PromiseResponse<AuthResponse, Error> => {
    // baseApi.post('/register', body);
    await delay(500);

    return {
      status: 200,
      ok: true,
      data: {
        userId: '0',
        token: 'Some-Token',
      },
    };
  };
}

export const authApi = new AuthAPI();
