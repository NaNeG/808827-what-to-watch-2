import React from 'react';
import { useAppDispatch } from '../../hooks';
import { showMoreFilms } from '../../store/action';

export default function ShowMoreButton() {
  const dispatch = useAppDispatch();
  const showMoreHandler = () => {
    dispatch(showMoreFilms());
  };
  return (
    <button className="catalog__button" type="button" onClick={showMoreHandler}>
      Show more
    </button>
  );
}
