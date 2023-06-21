import { call, put, takeLatest } from '@redux-saga/core/effects';
import { REGISTER } from '../auth.actions';
import { authApi } from 'src/api/auth.api';
import { Response } from 'src/common/types/api.types';
import { AuthResponse } from '../auth.types';
import { FETCH_USER } from 'src/redux/user/user.actions';

export function* registerSaga({
  payload,
}: ReturnType<typeof REGISTER.TRIGGER>) {
  const response = (yield call(authApi.register, payload)) as Response<
    AuthResponse,
    Error
  >;

  if (response.error) {
    yield put(REGISTER.FAIL({ error: response.error }));
    return;
  }

  yield put(REGISTER.COMPLETE(response.data));

  yield put(FETCH_USER.TRIGGER({ id: response.data.userId }));
}

export function* listenRegister() {
  yield takeLatest(REGISTER.TRIGGER, registerSaga);
}
