import { call, put, takeLatest } from '@redux-saga/core/effects';
import { LOGIN } from '../auth.actions';
import { authApi } from 'src/api/auth.api';
import { AuthResponse } from '../auth.types';
import { Response } from 'src/common/types/api.types';
import { FETCH_USER } from 'src/redux/user/user.actions';

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

  yield put(LOGIN.COMPLETE(response.data));

  yield put(FETCH_USER.TRIGGER({ id: response.data.userId }));
}

export function* listenLogin() {
  yield takeLatest(LOGIN.TRIGGER, loginSaga);
}
