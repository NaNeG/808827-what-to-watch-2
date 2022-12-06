import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_GENRE } from '../const';
import getFilmsByGenre from '../helpers/get-films-by-genre';
import { AppState } from '../types/app-state.type';
import {
  changeGenre, fetchFilms,
  fetchPromoFilm, resetShownFilms, setError,
  showMoreFilms
} from './action';

const initialState: AppState = {
  films: [],
  filteredFilms: [],
  currentGenre: DEFAULT_GENRE,
  shownCount: 0,
  dataIsLoading: false,
  error: null,
  promo: null,
};

export const mainReducer = createSlice({
  name: 'mainReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(changeGenre, (state, action) => {
        state.currentGenre = action.payload.currentGenre;
        state.filteredFilms = getFilmsByGenre(state.films, state.currentGenre);
      })
      .addCase(showMoreFilms, (state) => {
        state.shownCount =
          state.shownCount + 8 < state.filteredFilms.length
            ? state.shownCount + 8
            : state.filteredFilms.length;
      })
      .addCase(resetShownFilms, (state) => {
        state.shownCount =
          state.filteredFilms.length > 8 ? 8 : state.filteredFilms.length;
      })
      .addCase(setError, (state, action) => {
        state.error = action.payload;
      })
      .addCase(fetchFilms.pending, (state) => {
        state.dataIsLoading = true;
      })
      .addCase(fetchFilms.fulfilled, (state, action) => {
        state.films = action.payload;
        state.shownCount = state.films.length > 8 ? 8 : state.films.length;
        state.filteredFilms = state.films;
        state.dataIsLoading = false;
      })
      .addCase(fetchPromoFilm.fulfilled, (state, action) => {
        state.promo = action.payload;
      });
  },
});
