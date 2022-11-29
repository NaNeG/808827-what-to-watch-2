import { createSlice } from '@reduxjs/toolkit';
import { FilmState } from '../types/app-state.type';
import { fetchCommentsByID, fetchFilmByID, fetchSimilarByID } from './action';

const initialState: FilmState = {
  film: null,
  comments: [],
  similar: []
};

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
