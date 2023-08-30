import { call, put, takeLatest } from '@redux-saga/core/effects';
import {
  FETCH_USER,
  FETCH_USER_NOTES,
  FETCH_USER_PROJECTS,
} from '../user.actions';
import { userApi } from 'src/api/user/user.api';
import { Response } from 'src/common/types/api.types';
import { UserData } from '../user.types';
import { projectsApi } from 'src/api/projects/projects.api';
import { UserProject } from 'src/api/projects/projects.types';

export function* fetchUserSaga() {
  yield put(FETCH_USER.START());
  yield put(FETCH_USER_PROJECTS.START());
  yield put(FETCH_USER_NOTES.TRIGGER());

  const user = (yield call(userApi.getCurrentUser)) as Response<
    UserData,
    Error
  >;

  if (user.error) {
    yield put(FETCH_USER.FAIL({ error: user.error }));
    return;
  }

  yield put(FETCH_USER.COMPLETE(user.data));

  const projects = (yield call(projectsApi.getProjectsForUser)) as Response<
    UserProject[],
    Error
  >;

  if (projects.error) {
    yield put(FETCH_USER_PROJECTS.FAIL({ error: projects.error }));
    return;
  }

  yield put(FETCH_USER_PROJECTS.COMPLETE(projects.data));
}

export function* listenFetchUser() {
  yield takeLatest(FETCH_USER.TRIGGER, fetchUserSaga);
}
