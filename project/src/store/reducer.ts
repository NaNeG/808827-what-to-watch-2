import { createReducer } from "@reduxjs/toolkit"
import { DEFAULT_GENRE } from "../const";
import getFilmsByGenre from "../helpers/get-films-by-genre";
import { films } from "../mocks/films";
import { AppState } from "../types/app-state.type";
import { changeGenre, fillFilms, filterFilms } from "./action";

const initialState: AppState = {
  films: [],
  filteredFilms: [],
  currentGenre: DEFAULT_GENRE,
}

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeGenre, (state, action) => {
    state.currentGenre = action.payload.currentGenre;
    console.log(state.currentGenre);
  })
  .addCase(fillFilms, (state, action) => {
    state.films = action.payload;
  })
  .addCase(filterFilms, (state) => {
    state.filteredFilms = getFilmsByGenre(state.films, state.currentGenre);
  })
})

export {reducer};