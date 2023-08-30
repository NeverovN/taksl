import { createAction } from '@reduxjs/toolkit';

export const CREATE_PROJECT = {
  TRIGGER: createAction<{ callback: (projectId: string) => void }>(
    '[Create Project] Triggered',
  ),
  START: createAction('[Create Project] Started'),
  COMPLETE: createAction('[Create Project] Complete'),
  FAIL: createAction<{ error: Error }>('[Create Project] Failed'),
};
