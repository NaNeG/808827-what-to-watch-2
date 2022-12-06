import { store } from '../store';
import AuthStatus from './auth-status.enum';
import { FilmType } from './film.type';
import { ReviewType } from './review.type';

export type AppState = {
  films: FilmType[],
  dataIsLoading: boolean,
  error: string | null,
  promo: FilmType | null,
  currentGenre: string,
  filteredFilms: FilmType[],
  shownCount: number,
}

export type FilmState = {
  film: FilmType | null,
  comments: ReviewType[],
  similar: FilmType[],
}

export type UserState = {
  authorizationStatus: AuthStatus,
  avatar: string | null
}

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
