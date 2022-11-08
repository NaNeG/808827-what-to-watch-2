import { Fragment, useState } from 'react';
import { useAppSelector } from '../../hooks';
import FilmCard from '../film-card/film-card';
import ShowMoreButton from '../show-more-button/show-more-button';

export default function FilmList() {
  const [highlightedFilm, setHighlightedFilm] = useState(NaN);
  const filteredFilms = useAppSelector((state) => state.filteredFilms);
  const shownCount = useAppSelector((state) => state.shownCount);

  const mouseHoverHandler = (id: number) => {
    setHighlightedFilm(id);
  };

  return (
    <Fragment>
      <div className="catalog__films-list">
        {filteredFilms.slice(0, shownCount).map((film) => (
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
      <div className="catalog__more">
        {shownCount < filteredFilms.length && <ShowMoreButton />}
      </div>
    </Fragment>
  );
}
