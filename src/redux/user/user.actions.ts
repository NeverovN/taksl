import { createAction } from '@reduxjs/toolkit';
import { UpdateUser, UserData } from './user.types';
import { FetchUserRequestParams } from 'src/api/user/user.types';
import { ProjectResponse } from 'src/api/projects/projects.types';

export const FETCH_USER = {
  TRIGGER: createAction<FetchUserRequestParams>('[Fetch User] Triggered'),
  START: createAction('[Fetch User] Started'),
  COMPLETE: createAction<UserData>('[Fetch User] Complete'),
  FAIL: createAction<{ error: Error }>('[Fetch User] Failed'),
};

export const FETCH_USER_PROJECTS = {
  TRIGGER: createAction<FetchUserRequestParams>(
    '[Fetch User Projects] Triggered',
  ),
  START: createAction('[Fetch User Projects] Started'),
  COMPLETE: createAction<ProjectResponse[]>('[Fetch User Projects] Complete'),
  FAIL: createAction<{ error: Error }>('[Fetch User Projects] Failed'),
};

export const UPDATE_USER = {
  TRIGGER: createAction<UpdateUser>('[Set Contacts] Triggered'),
  START: createAction('[Set Contacts] Started'),
  COMPLETE: createAction<UserData>('[Set Contacts] Complete'),
  FAIL: createAction<{ error: Error }>('[Set Contacts] Failed'),
};

export const LOGOUT_USER = {
  TRIGGER: createAction('[Logout User] Triggered'),
  COMPLETE: createAction('[Logout User] Complete'),
};
