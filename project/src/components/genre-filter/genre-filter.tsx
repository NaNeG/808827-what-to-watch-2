import React, { MouseEvent } from 'react';
import { ReducerType } from '../../const';
import { getGenres } from '../../helpers/get-genres';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { changeGenre, resetShownFilms } from '../../store/action';

export default function GenreFilter() {
  const currentGenre = useAppSelector((state) => state[ReducerType.Main].currentGenre);
  const films = useAppSelector((state) => state[ReducerType.Main].films);
  const genres = getGenres(films);
  const dispatch = useAppDispatch();

  const genreSwitchHandler = (
    event: MouseEvent<HTMLAnchorElement>,
    genre: string
  ) => {
    event.preventDefault();
    dispatch(changeGenre({ currentGenre: genre }));
    dispatch(resetShownFilms());
  };

  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li
          key={genre}
          className={`catalog__genres-item ${
            currentGenre === genre && 'catalog__genres-item--active'
          }`}
        >
          <a
            href="/"
            className="catalog__genres-link"
            onClick={(event) => genreSwitchHandler(event, genre)}
          >
            {genre}
          </a>
          {/* <button className="catalog__genres-link">
            {genre}
          </button> */}
        </li>
      ))}
    </ul>
  );
}
