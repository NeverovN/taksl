import { put, takeLatest } from '@redux-saga/core/effects';
import { LOGOUT_USER } from '../user.actions';

export function* logoutUserSaga() {
  yield put(LOGOUT_USER.COMPLETE());
}

export function* listenLogoutUser() {
  yield takeLatest(LOGOUT_USER.TRIGGER, logoutUserSaga);
}
