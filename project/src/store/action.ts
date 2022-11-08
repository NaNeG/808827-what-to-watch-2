import { createAction } from '@reduxjs/toolkit';
import { FilmType } from '../types/film.type';

export const changeGenre = createAction<{currentGenre: string}>('changeGenre');
export const fillFilms = createAction<FilmType[]>('fillFilms');
export const showMoreFilms = createAction('showMoreFilms');
export const resetShownFilms = createAction('resetShownFilms');
