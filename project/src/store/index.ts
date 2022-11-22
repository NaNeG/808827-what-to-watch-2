import { configureStore } from '@reduxjs/toolkit';
import { createApi } from '../services/api';
import { reducer } from './reducer';

const api = createApi();

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
