import { spawn } from '@redux-saga/core/effects';
import { listenFetchUser } from './fetch-user.saga';
import { listenUpdateUser } from './update-user.saga';
import { listenLogoutUser } from './logout-user.saga';
import { listenFetchUserNotes } from './fetch-user-notes.saga';
import { listenAddNote } from './add-note.saga';

export function* userRootSaga() {
  yield spawn(listenFetchUser);
  yield spawn(listenUpdateUser);
  yield spawn(listenLogoutUser);
  yield spawn(listenFetchUserNotes);
  yield spawn(listenAddNote);
}
