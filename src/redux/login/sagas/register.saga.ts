import { call, put, takeLatest } from '@redux-saga/core/effects';
import { LOGIN, REGISTER } from '../auth.actions';
import { authApi } from 'src/api/auth.api';
import { Response } from 'src/common/types/api.types';

export function* registerSaga({
  payload,
}: ReturnType<typeof REGISTER.TRIGGER>) {
  const response = (yield call(authApi.register, payload)) as Response<
    void,
    Error
  >;

  if (response.error) {
    yield put(REGISTER.FAIL({ error: response.error }));
    return;
  }

  yield put(REGISTER.COMPLETE());

  yield put(LOGIN.TRIGGER({ ...payload }));
}

export function* listenRegister() {
  yield takeLatest(REGISTER.TRIGGER, registerSaga);
}
