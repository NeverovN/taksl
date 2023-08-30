import { Selector, createSelector } from 'reselect';
import { rootSelector } from '../root/root.selectors';
import { RootState } from '../root/root.types';
import { userReducer } from './user.reducer';
import { UserNote } from 'src/api/user/user.types';

export const rootUserSelector: Selector<
  RootState,
  ReturnType<typeof userReducer>
> = createSelector(rootSelector, state => state.user);

export const userNotesSelector: Selector<RootState, UserNote[]> =
  createSelector(rootSelector, state => state.user.data.notes);
