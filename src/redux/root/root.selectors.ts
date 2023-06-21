import { Selector, createSelector } from 'reselect';
import { rootReducer } from './root.reducer';
import { RootState } from './root.types';

export const rootSelector: Selector<
  RootState,
  ReturnType<typeof rootReducer>
> = createSelector(
  (state: RootState) => state,
  state => state,
);
