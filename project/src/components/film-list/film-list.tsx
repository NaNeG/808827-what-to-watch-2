import { Fragment, useState } from 'react';
import { FilmType } from '../../types/film.type';
import FilmCard from '../film-card/film-card';

type FilmListProps = {
  films: FilmType[];
};

export default function FilmList(props: FilmListProps) {
  const [highlightedFilm, setHighlightedFilm] = useState(NaN);

  const mouseHoverHandler = (id: number) => {
    setHighlightedFilm(id);
  };

  return (
    <Fragment>
      {props.films.map((film) => (
        <FilmCard
          key={film.id}
          id={film.id}
          posterSrc={film.posterImage}
          posterAlt={film.name}
          name={film.name}
          isHighlighted={highlightedFilm === film.id}
          onFilmCardHover={mouseHoverHandler}
        >
        </FilmCard>
      ))}
    </Fragment>
  );
}
