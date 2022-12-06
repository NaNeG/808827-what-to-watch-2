import { Fragment } from 'react';
import { ReducerType } from '../../const';
import { useAppSelector } from '../../hooks';
import FilmCard from '../film-card/film-card';
import ShowMoreButton from '../show-more-button/show-more-button';

export default function FilmList() {
  const filteredFilms = useAppSelector((state) => state[ReducerType.Main].filteredFilms);
  const shownCount = useAppSelector((state) => state[ReducerType.Main].shownCount);

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
            videoLink={film.videoLink}
          />
        ))}
      </div>
      <div className="catalog__more">
        {shownCount < filteredFilms.length && <ShowMoreButton />}
      </div>
    </Fragment>
  );
}
