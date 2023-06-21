import { spawn } from '@redux-saga/core/effects';
import { listenLogin } from './login.saga';
import { listenRegister } from './register.saga';
import { listenLogout } from './logout.saga';

export function* authSaga() {
  yield spawn(listenLogin);
  yield spawn(listenRegister);
  yield spawn(listenLogout);
}
