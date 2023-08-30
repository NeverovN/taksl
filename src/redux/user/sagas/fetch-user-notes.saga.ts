import { call, put, takeLatest } from '@redux-saga/core/effects';
import { FETCH_USER_NOTES } from '../user.actions';
import { userApi } from 'src/api/user/user.api';
import { Response } from 'src/common/types/api.types';
import { UserNote } from 'src/api/user/user.types';

export function* fetchUserNotesSaga() {
  yield put(FETCH_USER_NOTES.START());

  const notes = (yield call(userApi.getUserNotes)) as Response<
    UserNote[],
    Error
  >;

  if (notes.error) {
    yield put(FETCH_USER_NOTES.FAIL({ error: notes.error }));
    return;
  }

  yield put(FETCH_USER_NOTES.COMPLETE(notes.data));
}

export function* listenFetchUserNotes() {
  yield takeLatest(FETCH_USER_NOTES.TRIGGER, fetchUserNotesSaga);
}
