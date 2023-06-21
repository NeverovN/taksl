import { spawn } from '@redux-saga/core/effects';
import { listenFetchUser } from './fetch-user.saga';
import { listenUpdateUser } from './update-user.saga';
import { listenLogoutUser } from './logout-user.saga';

export function* userRootSaga() {
  yield spawn(listenFetchUser);
  yield spawn(listenUpdateUser);
  yield spawn(listenLogoutUser);
}
