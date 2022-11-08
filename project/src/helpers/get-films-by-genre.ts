import { FilmType } from "../types/film.type";

export default function getFilmsByGenre(films: FilmType[], genre: string) {
  if (genre === 'All genres') {
    return films;
  } else {
    return films.filter(film => film.genre === genre);
  }
}