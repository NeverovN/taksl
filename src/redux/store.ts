import createSagaMiddleware from '@redux-saga/core';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './root/root.reducer';
import { rootSaga } from './root/root.saga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

export const buildStore = () => {
  sagaMiddleware.run(rootSaga);
  return store;
};
