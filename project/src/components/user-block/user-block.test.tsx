import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import thunk from 'redux-thunk';
import { films } from '../../mocks/films';
import reviews from '../../mocks/reviews';
import { createApi } from '../../services/api';
import { State } from '../../types/app-state.type';
import AuthStatus from '../../types/auth-status.enum';
import UserBlock from './user-block';

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
const mockReviews = reviews;

describe('user-block tests', () => {
  it('should render correctly if no auth', () => {
    const store = mockStore({
      userReducer: {
        authorizationStatus: AuthStatus.NoAuth,
        avatar: null,
      },
      filmReducer: {
        film: mockFilm,
        comments: mockReviews,
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
              path={'/login'}
              element={<h1>Login page rendered</h1>}
            />
            <Route
              path='*'
              element={<UserBlock />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  it('should redirect correctly if no auth', () => {
    const store = mockStore({
      userReducer: {
        authorizationStatus: AuthStatus.NoAuth,
        avatar: null,
      },
      filmReducer: {
        film: mockFilm,
        comments: mockReviews,
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
              path={'/login'}
              element={<h1>Login page rendered</h1>}
            />
            <Route
              path='*'
              element={<UserBlock />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const loginLink = screen.getByTestId('login-link');
    fireEvent.click(loginLink);
    expect(screen.getByText(/Login page rendered/i)).toBeInTheDocument();
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
          <Routes>
            <Route
              path={'/mylist'}
              element={<h1>My list page rendered</h1>}
            />
            <Route
              path='*'
              element={<UserBlock />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('should redirect correctly if auth', () => {
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
          <Routes>
            <Route
              path={'/mylist'}
              element={<h1>My list page rendered</h1>}
            />
            <Route
              path='*'
              element={<UserBlock />}
            />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    const avatar = screen.getByTestId('avatar');
    fireEvent.click(avatar);
    expect(screen.getByText(/My list page rendered/i)).toBeInTheDocument();
  });
});
