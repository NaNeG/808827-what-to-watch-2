import { createSlice } from '@reduxjs/toolkit';
import getFilmsByGenre from '../helpers/get-films-by-genre';
import { FilmState } from '../types/app-state.type';
import { changeGenre, fetchCommentsByID, fetchFilmByID, fetchSimilarByID, loadSimilar, postComment, resetShownFilms, showMoreFilms } from './action';

const initialState: FilmState = {
  film: null,
  comments: [],
  similar: []
}

export const filmReducer = createSlice({
  name: 'filmReducer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchFilmByID.fulfilled, (state, action) => {
      state.film = action.payload;
    })
    .addCase(fetchCommentsByID.fulfilled, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(fetchSimilarByID.fulfilled, (state, action) => {
      state.similar = action.payload;
    });
  },
});
