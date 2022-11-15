import { store } from '../store';
import { FilmType } from './film.type';

export type AppState = {
  films: FilmType[],
  filteredFilms: FilmType[],
  currentGenre: string,
  shownCount: number,
  dataIsLoading: boolean,
}

export type AppDispatch = typeof store.dispatch;
