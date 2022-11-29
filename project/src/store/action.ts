import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, AppState, State } from '../types/app-state.type';
import { FilmType } from '../types/film.type';
import { AxiosInstance } from 'axios';
import { APIRoute, TIMEOUT_SHOW_ERROR } from '../const';
import { AuthData } from '../types/auth-data.type';
import { dropToken, saveToken } from '../services/token';
import { UserData } from '../types/user-data.type';
import AuthStatus from '../types/auth-status.enum';
import { Comment } from '../types/comment.type';
import { ReviewType } from '../types/review.type';
import { UserComment } from '../types/user-comment.type';
import {store} from './index'

export const changeGenre = createAction<{ currentGenre: string }>(
  'changeGenre'
);
export const fillFilms = createAction<FilmType[]>('fillFilms');
export const showMoreFilms = createAction('showMoreFilms');
export const resetShownFilms = createAction('resetShownFilms');
export const setDataIsLoading = createAction<boolean>('setDataIsLoading');
export const setAuthStatus = createAction<AuthStatus>('setAuthStatus');
export const setError = createAction<string | null>('setError');
export const setAvatar = createAction<string | null>('setAvatar');
export const loadFilm = createAction<FilmType>('loadFilm');
export const loadComments = createAction<Comment[]>('loadComments');
export const loadSimilar = createAction<FilmType[]>('loadSimilar');
export const loadPromo = createAction<FilmType>('loadPromo');

export const clearError = createAsyncThunk<
  void,
  undefined,
  { state: State; dipatch: AppDispatch; extra: AxiosInstance }
>('clearError', async (_arg, {dispatch}) => {
  setTimeout(() => {
    dispatch(setError(null));
  }, TIMEOUT_SHOW_ERROR);
});

export const fetchFilms = createAsyncThunk<
  FilmType[],
  undefined,
  { state: State; extra: AxiosInstance }
>('fetchFilms', async (_arg, { extra: api }) => {
  const { data } = await api.get<FilmType[]>(APIRoute.Films);
  return data;
});

export const checkAuth = createAsyncThunk<
  UserData,
  undefined,
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>('checkAuth', async (_arg, { dispatch, extra: api }) => {
  const { data } = await api.get(APIRoute.Login);
  return data;
});

export const login = createAsyncThunk<
  UserData,
  AuthData,
  { state: State; extra: AxiosInstance }
>('login', async ({ email, password }, { extra: api }) => {
  const { data } = await api.post<UserData>(APIRoute.Login, {
    email,
    password,
  });
  return data;
});

export const logout = createAsyncThunk<
  void,
  undefined,
  { state: State; extra: AxiosInstance }
>('logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
});



export const fetchFilmByID = createAsyncThunk<
  FilmType,
  string,
  {
    state: State;
    extra: AxiosInstance;
  }
>('fetchFilmById', async (filmId: string, { extra: api }) => {
  const { data } = await api.get<FilmType>(`${APIRoute.Films}/${filmId}`);
  return data;
});

export const fetchCommentsByID = createAsyncThunk<
  ReviewType[],
  string,
  {
    state: State;
    extra: AxiosInstance;
  }
>('fetchCommentsById', async (filmId: string, { extra: api }) => {
  const { data } = await api.get<ReviewType[]>(
    `${APIRoute.Comments}/${filmId}`
  );
  return data;
});

export const fetchSimilarByID = createAsyncThunk<
  FilmType[],
  string,
  {
    state: State;
    extra: AxiosInstance;
  }
>('fetchSimilarById', async (filmId: string, { extra: api }) => {
  const { data } = await api.get<FilmType[]>(
    `${APIRoute.Films}/${filmId}${APIRoute.Similar}`
  );
  return data;
});

export const postComment = createAsyncThunk<
  void,
  UserComment,
  {
    state: State;
    extra: AxiosInstance;
  }
>(
  'data/postCommentById',
  async ({ comment, rating, filmId }, { extra: api }) => {
    await api.post<UserComment>(`${APIRoute.Comments}/${filmId}`, {
      comment,
      rating,
    });
  }
);

export const fetchPromoFilm = createAsyncThunk<
  FilmType,
  undefined,
  {
    state: State;
    extra: AxiosInstance;
  }
>('fetchPromoFilm', async (_arg, { extra: api }) => {
  const { data } = await api.get<FilmType>(APIRoute.Promo);
  return data;
});
