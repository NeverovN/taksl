import { Selector, createSelector } from 'reselect';
import { rootSelector } from '../root/root.selectors';
import { RootState } from '../root/root.types';
import { userReducer } from './user.reducer';

export const rootUserSelector: Selector<
  RootState,
  ReturnType<typeof userReducer>
> = createSelector(rootSelector, state => state.user);
