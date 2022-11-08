import { useState } from 'react';
import getFilmsByGenre from '../../helpers/get-films-by-genre';
import { useAppSelector } from '../../hooks';
import { FilmType } from '../../types/film.type';
import FilmCard from '../film-card/film-card';

type SimilarFilmsProps = {
  currentFilm: FilmType;
};

export default function SimilarFilms(props: SimilarFilmsProps) {
  const [highlightedFilm, setHighlightedFilm] = useState(NaN);
  const films = useAppSelector((state) => state.films);

  const mouseHoverHandler = (id: number) => {
    setHighlightedFilm(id);
  };

  return (
    <div className="catalog__films-list">
      {getFilmsByGenre(films, props.currentFilm.genre)
        .filter((film) => film.name !== props.currentFilm.name)
        .slice(0, 4)
        .map((film) => (
          <FilmCard
            key={film.id}
            id={film.id}
            posterSrc={film.posterImage}
            posterAlt={film.name}
            name={film.name}
            isHighlighted={highlightedFilm === film.id}
            videoLink={film.videoLink}
            onFilmCardHover={mouseHoverHandler}
          />
        ))}
    </div>
  );
}
