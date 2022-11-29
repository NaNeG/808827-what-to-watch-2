import { FilmType } from '../../types/film.type';
import FilmCard from '../film-card/film-card';

type SimilarFilmsProps = {
  films: FilmType[];
  currentFilm: FilmType;
};

export default function SimilarFilms(props: SimilarFilmsProps) {
  return (
    <div className="catalog__films-list">
      {props.films
        .filter((film) => film.id !== props.currentFilm.id)
        .slice(0, 4)
        .map((film) => (
          <FilmCard
            key={film.id}
            id={film.id}
            posterSrc={film.posterImage}
            posterAlt={film.name}
            name={film.name}
            videoLink={film.videoLink}
          />
        ))}
    </div>
  );
}
