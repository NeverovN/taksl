import { Selector, createSelector } from 'reselect';
import { rootSelector } from '../root/root.selectors';
import { RootState } from '../root/root.types';

export const tokenSelector: Selector<RootState, string | null> = createSelector(
  rootSelector,
  state => state.auth.data.token,
);
