import { call, put, takeLatest } from '@redux-saga/core/effects';
import { FETCH_USER, FETCH_USER_PROJECTS } from '../user.actions';
import { userApi } from 'src/api/user/user.api';
import { Response } from 'src/common/types/api.types';
import { UserData } from '../user.types';
import { projectsApi } from 'src/api/projects/projects.api';
import { ProjectResponse } from 'src/api/projects/projects.types';

export function* fetchUserSaga({
  payload,
}: ReturnType<typeof FETCH_USER.TRIGGER>) {
  yield put(FETCH_USER.START());
  yield put(FETCH_USER_PROJECTS.START());

  const user = (yield call(userApi.getUserById, payload.id)) as Response<
    UserData,
    Error
  >;

  const projects = (yield call(
    projectsApi.getProjectsByUserId,
    payload.id,
  )) as Response<ProjectResponse[], Error>;

  if (user.error) {
    yield put(FETCH_USER.FAIL({ error: user.error }));
    return;
  }

  yield put(FETCH_USER.COMPLETE(user.data));

  if (projects.error) {
    yield put(FETCH_USER_PROJECTS.FAIL({ error: projects.error }));
    return;
  }

  yield put(FETCH_USER_PROJECTS.COMPLETE(projects.data));
}

export function* listenFetchUser() {
  yield takeLatest(FETCH_USER.TRIGGER, fetchUserSaga);
}
