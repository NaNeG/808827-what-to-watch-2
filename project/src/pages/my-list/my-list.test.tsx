import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import thunk from 'redux-thunk';
import { films } from '../../mocks/films';
import { createApi } from '../../services/api';
import { State } from '../../types/app-state.type';
import AuthStatus from '../../types/auth-status.enum';
import MyList from './my-list';

jest.mock('../../services/process-error-handle.ts');
const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);
const mockFilms = films;
const mockFilm = films[0];

describe('my-list tests', () => {
  it('should render correctly if noauth', () => {
    const store = mockStore({
      userReducer: {
        authorizationStatus: AuthStatus.NoAuth,
        avatar: null,
      },
      filmReducer: {
        film: mockFilm,
        similar: mockFilms,
      },
      mainReducer: {
        films: mockFilms,
        filteredFilms: mockFilms,
        promo: mockFilm,
        favoriteFilms: mockFilms,
        favoriteCount: mockFilms.length,
      }
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route
              path={'/'}
              element={<h1>Main page rendered</h1>}
            />
            <Route
              path='*'
              element={<MyList />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Main page rendered/i)).toBeInTheDocument();
  });

  it('should render correctly if auth', () => {
    const store = mockStore({
      userReducer: {
        authorizationStatus: AuthStatus.Authorized,
        avatar: null,
      },
      filmReducer: {
        film: mockFilm,
        similar: mockFilms,
      },
      mainReducer: {
        films: mockFilms,
        filteredFilms: mockFilms,
        promo: mockFilm,
        favoriteFilms: mockFilms,
        favoriteCount: mockFilms.length,
      }
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MyList />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
  });
});
