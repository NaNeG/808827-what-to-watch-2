import { store } from '../store';
import AuthStatus from './auth-status.enum';
import { FilmType } from './film.type';
import { ReviewType } from './review.type';

export type AppState = {
  films: FilmType[],
  filteredFilms: FilmType[],
  currentGenre: string,
  shownCount: number,
  dataIsLoading: boolean,
  authorizationStatus: AuthStatus,
  error: string | null,
  avatar: string | null,
  film: FilmType | null,
  comments: ReviewType[],
  similar: FilmType[],
}

export type AppDispatch = typeof store.dispatch;
