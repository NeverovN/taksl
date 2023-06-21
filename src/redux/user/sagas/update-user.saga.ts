import { call, put, takeLatest } from '@redux-saga/core/effects';
import { UPDATE_USER } from '../user.actions';
import { userApi } from 'src/api/user/user.api';
import { Response } from 'src/common/types/api.types';
import { UserData } from '../user.types';

export function* updateUserSaga({
  payload,
}: ReturnType<typeof UPDATE_USER.TRIGGER>) {
  yield put(UPDATE_USER.START());

  const response = (yield call(
    userApi.updateUser,
    payload.id,
    payload.body,
  )) as Response<UserData, Error>;

  if (response.error) {
    yield put(UPDATE_USER.FAIL({ error: response.error }));
    return;
  }

  yield put(UPDATE_USER.COMPLETE(response.data));
}

export function* listenUpdateUser() {
  yield takeLatest(UPDATE_USER.TRIGGER, updateUserSaga);
}
