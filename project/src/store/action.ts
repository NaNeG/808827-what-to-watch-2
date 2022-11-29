import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, AppState } from '../types/app-state.type';
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
    const {data} = await api.get(APIRoute.Login);
    dispatch(setAuthStatus(AuthStatus.Authorized));
    dispatch(setAvatar(data.avatarUrl));
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
  dispatch(setAvatar(data.avatarUrl));
  dispatch(setAuthStatus(AuthStatus.Authorized));
});

export const logout = createAsyncThunk<
  void,
  undefined,
  { dispatch: AppDispatch; state: AppState; extra: AxiosInstance }
>('login', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
  dispatch(setAvatar(null));
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

export const fetchFilmByID = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: AppState;
    extra: AxiosInstance;
  }
>('fetchFilmById', async (filmId: string, { dispatch, extra: api }) => {
  const { data } = await api.get<FilmType>(`${APIRoute.Films}/${filmId}`);
  dispatch(loadFilm(data));
});

export const fetchReviewsByID = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: AppState;
    extra: AxiosInstance;
  }
>('fetchCommentsById', async (filmId: string, { dispatch, extra: api }) => {
  const { data } = await api.get<ReviewType[]>(
    `${APIRoute.Comments}/${filmId}`
  );
  dispatch(loadComments(data));
});

export const fetchSimilarByID = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: AppState;
    extra: AxiosInstance;
  }
>('fetchSimilarById', async (filmId: string, { dispatch, extra: api }) => {
  const { data } = await api.get<FilmType[]>(
    `${APIRoute.Films}/${filmId}${APIRoute.Similar}`
  );
  dispatch(loadSimilar(data));
});

export const postComment = createAsyncThunk<
  void,
  UserComment,
  {
    dispatch: AppDispatch;
    state: AppState;
    extra: AxiosInstance;
  }
>(
  'data/postCommentById',
  async ({ comment, rating, filmId }, { dispatch, extra: api }) => {
    dispatch(setDataIsLoading(true));
    await api.post<UserComment>(`${APIRoute.Comments}/${filmId}`, {
      comment,
      rating,
    });
    console.log('posted')
    dispatch(setDataIsLoading(false));
  }
);
