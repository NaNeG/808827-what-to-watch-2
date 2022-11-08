import { createAction } from '@reduxjs/toolkit';
import { FilmType } from '../types/film.type';

export const changeGenre = createAction<{currentGenre: string}>('changeGenre');
export const filterFilms = createAction('filterFilms');
export const fillFilms = createAction<FilmType[]>('fillFilms');
