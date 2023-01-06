import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action } from '@reduxjs/toolkit';
import MockAdapter from 'axios-mock-adapter';
import thunk, { ThunkDispatch } from 'redux-thunk';
import { films } from '../mocks/films';
import reviews from '../mocks/reviews';
import { createApi } from '../services/api';
import { State } from '../types/app-state.type';
import { AuthData } from '../types/auth-data.type';
import { UserComment } from '../types/user-comment.type';
import { changeFilmFavoriteStatus, checkAuth, fetchCommentsByID, fetchFavoriteFilms, fetchFilmByID, fetchFilms, fetchPromoFilm, fetchSimilarByID, login, logout, postComment } from './action';

jest.mock('../services/process-error-handle.ts');

describe('async actions', () => {
  const api = createApi();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockFilm = films[0];
  const mockFilms = films;
  const mockReviews = reviews;

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);


  it('authorization status is Auth when server returned 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet('/login')
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuth());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      checkAuth.pending.type,
      checkAuth.fulfilled.type
    ]);
  });

  it('should dispatch login when POST /login', async () => {
    const fakeUser: AuthData = { email: 'mail@mail.com', password: 'qwerty123' };

    mockAPI
      .onPost('/login')
      .reply(200, { token: 'secret' });


    const store = mockStore();

    await store.dispatch(login(fakeUser));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      login.pending.type,
      login.fulfilled.type
    ]);
  });

  it('should dispatch logout on DELETE /logout', async () => {
    mockAPI
      .onDelete('/logout')
      .reply(204);

    const store = mockStore();

    await store.dispatch(logout());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      logout.pending.type,
      logout.fulfilled.type
    ]);
  });

  it('should dispatch films when GET /films', async () => {
    mockAPI
      .onGet('/films')
      .reply(200, mockFilms);

    const store = mockStore();

    await store.dispatch(fetchFilms());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchFilms.pending.type,
      fetchFilms.fulfilled.type
    ]);
  });

  it('should dispatch promo film when GET /promo', async () => {
    mockAPI
      .onGet('/promo')
      .reply(200, mockFilm);

    const store = mockStore();

    await store.dispatch(fetchPromoFilm());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchPromoFilm.pending.type,
      fetchPromoFilm.fulfilled.type
    ]);
  });

  it('should fetch film film when GET /films/{id}', async () => {
    mockAPI
      .onGet('/films/1')
      .reply(200, mockFilm);

    const store = mockStore();

    await store.dispatch(fetchFilmByID('1'));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchFilmByID.pending.type,
      fetchFilmByID.fulfilled.type
    ]);
  });

  it('should fetch similar films film when GET /films/{id}/similar', async () => {
    mockAPI
      .onGet('/films/1/similar')
      .reply(200, mockFilms);

    const store = mockStore();

    await store.dispatch(fetchSimilarByID('1'));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchSimilarByID.pending.type,
      fetchSimilarByID.fulfilled.type
    ]);
  });

  it('should fetch similar films film when GET /comments/{id}', async () => {
    mockAPI
      .onGet('/comments/1')
      .reply(200, mockReviews);

    const store = mockStore();

    await store.dispatch(fetchCommentsByID('1'));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchCommentsByID.pending.type,
      fetchCommentsByID.fulfilled.type
    ]);
  });

  it('POST /comments/{id}', async () => {
    const postData: UserComment = {
      filmId: '1',
      comment: 'comment',
      rating: 8,
    };

    mockAPI
      .onPost(`/comments/${postData.filmId}`, {
        comment: postData.comment,
        rating: postData.rating
      })
      .reply(200);

    const store = mockStore();

    await store.dispatch(postComment(postData));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      postComment.pending.type,
      postComment.fulfilled.type
    ]);
  });

  it('should fetch favorite films film when GET /favorite', async () => {
    mockAPI
      .onGet('/favorite')
      .reply(200, mockFilms);

    const store = mockStore();

    await store.dispatch(fetchFavoriteFilms());

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      fetchFavoriteFilms.pending.type,
      fetchFavoriteFilms.fulfilled.type
    ]);
  });

  it('POST /favorite/{filmId}/{status}', async () => {
    const postData = {
      filmId: 1,
      status: 1
    };

    mockAPI
      .onPost('/favorite/1/1')
      .reply(200);

    const store = mockStore();

    await store.dispatch(changeFilmFavoriteStatus(postData));

    const actions = store.getActions().map(({ type }) => type);

    expect(actions).toEqual([
      changeFilmFavoriteStatus.pending.type,
      changeFilmFavoriteStatus.fulfilled.type
    ]);
  });
});
