import { createReducer } from '@reduxjs/toolkit';
import { DEFAULT_GENRE } from '../const';
import getFilmsByGenre from '../helpers/get-films-by-genre';
import { AppState } from '../types/app-state.type';
import { changeGenre, fillFilms, resetShownFilms, showMoreFilms } from './action';

const initialState: AppState = {
  films: [],
  filteredFilms: [],
  currentGenre: DEFAULT_GENRE,
  shownCount: 0,
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
    });
});

export { reducer };
