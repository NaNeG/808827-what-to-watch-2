import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, AppState } from '../types/app-state.type';
import { FilmType } from '../types/film.type';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';

export const changeGenre = createAction<{ currentGenre: string }>(
  'changeGenre'
);
export const fillFilms = createAction<FilmType[]>('fillFilms');
export const showMoreFilms = createAction('showMoreFilms');
export const resetShownFilms = createAction('resetShownFilms');
export const setDataIsLoading = createAction<boolean>('setDataIsLoading');

export const fetchFilms = createAsyncThunk<
  void,
  undefined,
  { dispatch: AppDispatch; state: AppState; extra: AxiosInstance }
  >('fetchFilms', async (_arg, { dispatch, extra: api }) => {
  dispatch(setDataIsLoading(true));
  const { data } = await api.get<FilmType[]>(APIRoute.Films);
  dispatch(fillFilms(data));
  dispatch(setDataIsLoading(false));
});