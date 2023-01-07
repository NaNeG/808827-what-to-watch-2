import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createApi } from '../../services/api';
import { State } from '../../types/app-state.type';
import ErrorMessage from './error-message';

jest.mock('../../services/process-error-handle.ts');
const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

describe('error-message tests', () => {
  const store = mockStore({
    mainReducer: {
      error: 'some error',
    },
  });
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <ErrorMessage />
      </Provider>
    );

    expect(screen.getByText(/some error/i)).toBeInTheDocument();
  });
});
