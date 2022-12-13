import { createSlice } from '@reduxjs/toolkit';
import { ReducerType } from '../const';
import { FilmState } from '../types/app-state.type';
import {
  changeFilmFavoriteStatus,
  fetchCommentsByID,
  fetchFilmByID,
  fetchSimilarByID,
} from './action';

const initialState: FilmState = {
  film: null,
  comments: [],
  similar: [],
  isFilmLoading: false,
};

export const filmReducer = createSlice({
  name: ReducerType.Film,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilmByID.pending, (state) => {
        state.isFilmLoading = true;
      })
      .addCase(fetchFilmByID.fulfilled, (state, action) => {
        state.film = action.payload;
        state.isFilmLoading = false;
      })
      .addCase(fetchCommentsByID.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(fetchSimilarByID.fulfilled, (state, action) => {
        state.similar = action.payload;
      })
      .addCase(changeFilmFavoriteStatus.fulfilled, (state, action) => {
        state.film = action.payload;
      });
  },
});
