import { DEFAULT_GENRE } from "../const";
import { FilmType } from "../types/film.type";

export const getGenres = (films: FilmType[]) => (
  [...new Set([DEFAULT_GENRE, ...films.map((film) => film.genre)])]
);