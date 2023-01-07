import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { films } from '../../mocks/films';
import { createApi } from '../../services/api';
import { State } from '../../types/app-state.type';
import AuthStatus from '../../types/auth-status.enum';
import VideoPlayer from './video-player';

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

const store = mockStore({
  userReducer: {
    authorizationStatus: AuthStatus.NoAuth,
    avatar: null,
  },
  mainReducer: {
    favoriteFilms: mockFilms,
  },
  filmReducer: {
    film: mockFilm,
    isFilmLoading: false,
  }
});

describe('video-player tests', () => {
  beforeAll(() => {
    window.HTMLVideoElement.prototype.play = jest.fn();
    window.HTMLVideoElement.prototype.load = jest.fn();
    window.HTMLVideoElement.prototype.pause = jest.fn();
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <VideoPlayer />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Transpotting/i)).toBeInTheDocument();
    expect(screen.getByText(/Exit/i)).toBeInTheDocument();
  });


  it('should play and stop when button clicked', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <VideoPlayer />
        </MemoryRouter>
      </Provider>
    );
    const playButton = screen.getByTestId('player-play');
    fireEvent.click(playButton);
    expect(window.HTMLVideoElement.prototype.play).toBeCalled();
    fireEvent.click(playButton);
    expect(window.HTMLVideoElement.prototype.pause).toBeCalled();
  });
});
