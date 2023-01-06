import { FilmState } from "../../types/app-state.type";
import { films } from "../../mocks/films";
import { filmReducer } from "./film-reducer";
import { fetchCommentsByID, fetchFilmByID, fetchSimilarByID } from "../action";
import reviews from "../../mocks/reviews";

const mockFilm = films[0];
const mockFilms = films;
const mockReviews = reviews;

describe('film-reducer', () => {
  let state: FilmState;

  beforeEach(() => {
    state = {
      film: null,
      comments: [],
      similar: [],
      isFilmLoading: false,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(filmReducer.reducer(void 0, { type: 'UNKNOWN_ACTION' }))
      .toEqual({
        film: null,
        comments: [],
        similar: [],
        isFilmLoading: false,
      });
  });

  describe('fetchFilmByID test', () => {
    it('should load film on fulfilled', () => {
      expect(filmReducer.reducer(state, { type: fetchFilmByID.fulfilled.type, payload: mockFilm }).film)
        .toEqual(mockFilm);
    });
  });

  describe('fetchSimilarByID test', () => {
    it('should load similar films on fulfilled', () => {
      expect(filmReducer.reducer(state, { type: fetchSimilarByID.fulfilled.type, payload: mockFilms }).similar)
        .toEqual(mockFilms);
    });
  });

  describe('fetchCommentsByID test', () => {
    it('should load reviews on fulfilled', () => {
      expect(filmReducer.reducer(state, { type: fetchCommentsByID.fulfilled.type, payload: mockReviews }))
        .toMatchObject({
          comments: mockReviews,
        });
    });
  });
});