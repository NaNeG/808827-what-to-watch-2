import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { DEFAULT_GENRE } from '../../const';
import { films } from '../../mocks/films';
import { createApi } from '../../services/api';
import { State } from '../../types/app-state.type';
import AuthStatus from '../../types/auth-status.enum';
import ErrorMessage from '../error-message/error-message';
import App from './app';

jest.mock('../../services/process-error-handle.ts');
const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);
const mockFilm = films[0];

describe('routing when logged in', () => {
  const store = mockStore({
    userReducer: {
      authorizationStatus: AuthStatus.Authorized,
      avatar: null,
    },
    filmReducer: {
      film: mockFilm,
      comments: [],
      similar: [],
      isFilmLoading: false,
    },
    mainReducer: {
      films: [mockFilm],
      filteredFilms: [],
      currentGenre: DEFAULT_GENRE,
      shownCount: 0,
      dataIsLoading: false,
      error: null,
      promo: mockFilm,
      favoriteFilms: [],
      favoriteCount: 0,
    },
  });

  const routes = ['/'];

  const fakeApp = (
    <Provider store={store}>
      <MemoryRouter initialEntries={routes}>
        <ErrorMessage />
        <App />
      </MemoryRouter>
    </Provider>
  );

  it('should render main page when navigated to "/"', () => {
    render(fakeApp);

    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
  });

  it('should render login page when navigated to "/login"', () => {
    routes.push('/login');
    render(fakeApp);

    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
  });

  it('should render film page when navigated to "/films/{id}"', () => {
    routes.push('/films/1');
    render(fakeApp);

    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
  });

  it('should render player when navigated to "/player/{id}"', () => {
    routes.push('/player/1');
    render(fakeApp);

    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
    expect(screen.getByText(/Transpotting/i)).toBeInTheDocument();
  });

  it('should render reviews editor when navigated to "/films/{id}/review"', () => {
    routes.push('/films/1/review');
    render(fakeApp);

    expect(screen.getByText(/Add review/i)).toBeInTheDocument();
  });

  it('should render favorites list when navigated to "/mylist"', () => {
    routes.push('/mylist');
    render(fakeApp);

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
  });

  it('should render not found when navigated to non-existent route', () => {
    routes.push('/asdasd');
    render(fakeApp);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });
});

describe('routing when not logged in', () => {
  const store = mockStore({
    userReducer: {
      authorizationStatus: AuthStatus.NoAuth,
      avatar: null,
    },
    filmReducer: {
      film: mockFilm,
      comments: [],
      similar: [],
      isFilmLoading: false,
    },
    mainReducer: {
      films: [mockFilm],
      filteredFilms: [],
      currentGenre: DEFAULT_GENRE,
      shownCount: 0,
      dataIsLoading: false,
      error: null,
      promo: mockFilm,
      favoriteFilms: [],
      favoriteCount: 0,
    },
  });

  const routes = ['/'];

  const fakeApp = (
    <Provider store={store}>
      <MemoryRouter initialEntries={routes}>
        <ErrorMessage />
        <App />
      </MemoryRouter>
    </Provider>
  );

  it('should render main page when navigated to "/"', () => {
    render(fakeApp);

    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/All genres/i)).toBeInTheDocument();
  });

  it('should render login page when navigated to "/login"', () => {
    routes.push('/login');
    render(fakeApp);

    expect(screen.getByLabelText(/Email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should render film page when navigated to "/films/{id}"', () => {
    routes.push('/films/1');
    render(fakeApp);

    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(/Play/i)).toBeInTheDocument();
    expect(screen.getByText(/Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/Details/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/More like this/i)).toBeInTheDocument();
  });

  it('should render player when navigated to "/player/{id}"', () => {
    routes.push('/player/1');
    render(fakeApp);

    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
    expect(screen.getByText(/Transpotting/i)).toBeInTheDocument();
  });

  it('should render not found when navigated to non-existent route', () => {
    routes.push('/asdasd');
    render(fakeApp);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });
});
