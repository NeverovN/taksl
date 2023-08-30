import { call, put, takeLatest } from '@redux-saga/core/effects';
import { CREATE_PROJECT } from '../project.actions';
import { Response } from 'src/common/types/api.types';
import { projectsApi } from 'src/api/projects/projects.api';
import { ProjectResponse } from 'src/api/projects/projects.types';

export function* createProjectSaga({
  payload,
}: ReturnType<typeof CREATE_PROJECT.TRIGGER>) {
  yield put(CREATE_PROJECT.START());

  const project = (yield call(projectsApi.createProject)) as Response<
    ProjectResponse,
    Error
  >;

  if (project.error) {
    yield put(CREATE_PROJECT.FAIL({ error: project.error }));
    return;
  }

  payload.callback(project.data.id);

  yield put(CREATE_PROJECT.COMPLETE());
}

export function* listenCreateProject() {
  yield takeLatest(CREATE_PROJECT.TRIGGER, createProjectSaga);
}
