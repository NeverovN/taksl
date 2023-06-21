import { spawn } from '@redux-saga/core/effects';
import { userRootSaga } from '../user/sagas/root-user.saga';
import { authSaga } from '../login/sagas/auth.saga';

export function* rootSaga() {
  yield spawn(authSaga);
  yield spawn(userRootSaga);
}
