import { call, put, takeLatest } from '@redux-saga/core/effects';
import { ADD_NOTE, FETCH_USER_NOTES } from '../user.actions';
import { userApi } from 'src/api/user/user.api';
import { Response } from 'src/common/types/api.types';
import { UserNote } from 'src/api/user/user.types';

export function* addNoteSaga({ payload }: ReturnType<typeof ADD_NOTE.TRIGGER>) {
  const note = (yield call(userApi.addUserNote, payload.text)) as Response<
    UserNote,
    Error
  >;

  if (note.error) {
    return;
  }

  yield put(FETCH_USER_NOTES.TRIGGER());
}

export function* listenAddNote() {
  yield takeLatest(ADD_NOTE.TRIGGER, addNoteSaga);
}
