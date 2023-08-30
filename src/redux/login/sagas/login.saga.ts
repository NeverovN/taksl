import { call, put, takeLatest } from '@redux-saga/core/effects';
import { LOGIN } from '../auth.actions';
import { authApi } from 'src/api/auth.api';
import { AuthResponse } from '../auth.types';
import { Response } from 'src/common/types/api.types';
import { FETCH_USER } from 'src/redux/user/user.actions';
import { baseApi } from 'src/api/base.api';

export function* loginSaga({ payload }: ReturnType<typeof LOGIN.TRIGGER>) {
  yield put(LOGIN.START());

  const response = (yield call(authApi.login, payload)) as Response<
    AuthResponse,
    Error
  >;

  if (response.error) {
    yield put(LOGIN.FAIL({ error: response.error }));
    return;
  }

  baseApi.setAuthorization(response.data.token);

  yield put(LOGIN.COMPLETE({ token: response.data.token }));

  yield put(FETCH_USER.TRIGGER());
}

export function* listenLogin() {
  yield takeLatest(LOGIN.TRIGGER, loginSaga);
}
