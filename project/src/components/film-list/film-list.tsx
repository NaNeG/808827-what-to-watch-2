import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import getFilmsByGenre from '../../helpers/get-films-by-genre';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { FilmType } from '../../types/film.type';
import FilmCard from '../film-card/film-card';

type FilmListProps = {
  films: FilmType[];
};

export default function FilmList(props: FilmListProps) {
  const [highlightedFilm, setHighlightedFilm] = useState(NaN);
  const currentGenre = useAppSelector((state) => state.currentGenre);

  const mouseHoverHandler = (id: number) => {
    setHighlightedFilm(id);
  };

  return (
    <Fragment>
      {getFilmsByGenre(props.films, currentGenre).map((film) => (
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
    </Fragment>
  );
}
