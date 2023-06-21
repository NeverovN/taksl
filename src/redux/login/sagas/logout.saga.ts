import { put, takeLatest } from '@redux-saga/core/effects';
import { LOGOUT } from '../auth.actions';
import { LOGOUT_USER } from 'src/redux/user/user.actions';

export function* logoutSaga() {
  yield put(LOGOUT_USER.TRIGGER());
  yield put(LOGOUT.COMPLETE());
}

export function* listenLogout() {
  yield takeLatest(LOGOUT.TRIGGER, logoutSaga);
}
