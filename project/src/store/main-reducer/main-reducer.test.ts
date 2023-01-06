import { AppState } from "../../types/app-state.type";
import { DEFAULT_GENRE } from "../../const";
import { films } from "../../mocks/films";
import { changeGenre, fetchFavoriteFilms, fetchFilms, fetchPromoFilm } from "../action";
import { mainReducer } from "./main-reducer";

const mockFilm = films[0];
const mockFilms = films;

describe('main-reducer', () => {
  let state: AppState;

  beforeEach(() => {
    state = {
      films: [],
      filteredFilms: [],
      currentGenre: DEFAULT_GENRE,
      shownCount: 0,
      dataIsLoading: false,
      error: null,
      promo: null,
      favoriteFilms: [],
      favoriteCount: 0,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(mainReducer.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  describe('fetchFilms test', () => {
    it('load all films on setInitFilmsInfo', () => {
      expect(mainReducer.reducer(state, { type: fetchFilms.fulfilled.type, payload: mockFilms }).films)
        .toEqual(mockFilms);
    });
  });

  describe('fetchPromoFilm test', () => {
    it('load promo film on setPromoFilmInfo', () => {
      expect(mainReducer.reducer(state, { type: fetchPromoFilm.fulfilled.type, payload: mockFilm }).promo)
        .toEqual(mockFilm);
    });
  });

  describe('fetchFavoriteFilms test', () => {
    it('load promo film on setPromoFilmInfo', () => {
      expect(mainReducer.reducer(state, { type: fetchFavoriteFilms.fulfilled.type, payload: mockFilms }).favoriteFilms)
        .toEqual(mockFilms);
    });
  });
});