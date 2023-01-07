import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { films } from '../../mocks/films';
import reviews from '../../mocks/reviews';
import { createApi } from '../../services/api';
import { State } from '../../types/app-state.type';
import AuthStatus from '../../types/auth-status.enum';
import Film from './film';

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


describe('film tests', () => {
  it('should render correctly if noauth', () => {
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
          <Film />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.queryByText(/My List/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Add Review/i)).not.toBeInTheDocument();
  });

  it('should render correctly if auth', () => {
    const store = mockStore({
      userReducer: {
        authorizationStatus: AuthStatus.Authorized,
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
          <Film />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/My List/i)).toBeInTheDocument();
    expect(screen.getByText(/Add Review/i)).toBeInTheDocument();
  });
});
