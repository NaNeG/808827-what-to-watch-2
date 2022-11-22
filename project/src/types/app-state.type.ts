import { store } from '../store';
import AuthStatus from './auth-status.enum';
import { FilmType } from './film.type';

export type AppState = {
  films: FilmType[],
  filteredFilms: FilmType[],
  currentGenre: string,
  shownCount: number,
  dataIsLoading: boolean,
  authorizationStatus: AuthStatus,
  error: string | null,
}

export type AppDispatch = typeof store.dispatch;
