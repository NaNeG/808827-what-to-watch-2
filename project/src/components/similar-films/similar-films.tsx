import { FilmType } from '../../types/film.type';
import FilmList from '../film-list/film-list';

type SimilarFilmsProps = {
  currentFilm: FilmType;
  films: FilmType[];
};

export default function SimilarFilms(props: SimilarFilmsProps) {
  const filteredFilms = props.films.filter((film) => film.genre === props.currentFilm.genre);

  return <FilmList films={filteredFilms} />;
}
