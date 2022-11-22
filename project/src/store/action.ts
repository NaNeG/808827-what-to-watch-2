import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, AppState } from '../types/app-state.type';
import { FilmType } from '../types/film.type';
import { AxiosInstance } from 'axios';
import { APIRoute, TIMEOUT_SHOW_ERROR } from '../const';
import { AuthData } from '../types/auth-data.type';
import { dropToken, saveToken } from '../services/token';
import { UserData } from '../types/user-data.type';
import AuthStatus from '../types/auth-status.enum';

export const changeGenre = createAction<{ currentGenre: string }>(
  'changeGenre'
);
export const fillFilms = createAction<FilmType[]>('fillFilms');
export const showMoreFilms = createAction('showMoreFilms');
export const resetShownFilms = createAction('resetShownFilms');
export const setDataIsLoading = createAction<boolean>('setDataIsLoading');
export const setAuthStatus = createAction<AuthStatus>('setAuthStatus');
export const setError = createAction<string | null>('setError');

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

export const checkAuth = createAsyncThunk<
  void,
  undefined,
  { dispatch: AppDispatch; state: AppState; extra: AxiosInstance }
>('checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    await api.get(APIRoute.Login);
    dispatch(setAuthStatus(AuthStatus.Authorized));
  } catch {
    dispatch(setAuthStatus(AuthStatus.NoAuth));
  }
});

export const login = createAsyncThunk<
  void,
  AuthData,
  { dispatch: AppDispatch; state: AppState; extra: AxiosInstance }
>('login', async ({ email, password }, { dispatch, extra: api }) => {
  const { data } = await api.post<UserData>(APIRoute.Login, {
    email,
    password,
  });
  saveToken(data.token);
  dispatch(setAuthStatus(AuthStatus.Authorized));
});

export const logout = createAsyncThunk<
  void,
  undefined,
  { dispatch: AppDispatch; state: AppState; extra: AxiosInstance }
>('login', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
  dispatch(setAuthStatus(AuthStatus.NoAuth));
});

export const clearError = createAsyncThunk<
  void,
  undefined,
  { dispatch: AppDispatch; state: AppState; extra: AxiosInstance }
>('clearError', async (_arg, { dispatch }) => {
  setTimeout(() => {
    dispatch(setError(null));
  }, TIMEOUT_SHOW_ERROR);
});
