import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_GENRE } from '../const';
import getFilmsByGenre from '../helpers/get-films-by-genre';
import { AppState } from '../types/app-state.type';
import AuthStatus from '../types/auth-status.enum';
import { changeGenre, fillFilms, setAuthStatus, resetShownFilms, setDataIsLoading, showMoreFilms, setError } from './action';

const initialState: AppState = {
  films: [],
  filteredFilms: [],
  currentGenre: DEFAULT_GENRE,
  shownCount: 0,
  dataIsLoading: false,
  authorizationStatus: AuthStatus.NoAuth,
  error: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeGenre, (state, action) => {
      state.currentGenre = action.payload.currentGenre;
      state.filteredFilms = getFilmsByGenre(state.films, state.currentGenre);
    })
    .addCase(fillFilms, (state, action) => {
      state.films = action.payload;
      state.shownCount = state.films.length > 8 ? 8 : state.films.length;
      state.filteredFilms = state.films;
    })
    .addCase(showMoreFilms, (state) => {
      state.shownCount = state.shownCount + 8 < state.filteredFilms.length ? state.shownCount + 8 : state.filteredFilms.length;
    })
    .addCase(resetShownFilms, (state) => {
      state.shownCount = state.filteredFilms.length > 8 ? 8 : state.filteredFilms.length;
    })
    .addCase(setDataIsLoading, (state, action) => {
      state.dataIsLoading = action.payload;
    })
    .addCase(setAuthStatus, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export { reducer };
