import { spawn } from '@redux-saga/core/effects';
import { listenCreateProject } from './create-project.saga';

export function* projectRootSaga() {
  yield spawn(listenCreateProject);
}
