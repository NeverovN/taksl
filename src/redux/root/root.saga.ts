import { spawn } from '@redux-saga/core/effects';
import { userRootSaga } from '../user/sagas/root-user.saga';
import { authSaga } from '../login/sagas/auth.saga';
import { projectRootSaga } from '../project/sagas/root-project.saga';

export function* rootSaga() {
  yield spawn(authSaga);
  yield spawn(userRootSaga);
  yield spawn(projectRootSaga);
}
