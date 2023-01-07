import { configureMockStore } from '@jedmao/redux-mock-store';
import { Action, ThunkDispatch } from '@reduxjs/toolkit';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import { films } from '../../mocks/films';
import { createApi } from '../../services/api';
import { State } from '../../types/app-state.type';
import FilmList from './film-list';

jest.mock('../../services/process-error-handle.ts');
const api = createApi();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<
  State,
  Action,
  ThunkDispatch<State, typeof api, Action>
>(middlewares);

const mockFilms = films;

describe('film-list tests', () => {
  it('should render correctly', () => {
    const store = mockStore({
      mainReducer: {
        filteredFilms: mockFilms,
        shownCount: mockFilms.length,
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FilmList />
        </MemoryRouter>
      </Provider>
    );

    const filmCards = screen.getAllByTestId('film-card');

    expect(filmCards.length).toBe(mockFilms.length);
  });

  it('show more button should render when shownCount < filteredFilms.count', () => {
    const store = mockStore({
      mainReducer: {
        filteredFilms: mockFilms,
        shownCount: 1,
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FilmList />
        </MemoryRouter>
      </Provider>
    );

    const showMoreButton = screen.getByTestId('show-more-button');

    expect(showMoreButton).toBeInTheDocument();
  });

  it('show more button should not render when shownCount === filteredFilms.count', () => {
    const store = mockStore({
      mainReducer: {
        filteredFilms: mockFilms,
        shownCount: mockFilms.length,
      },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <FilmList />
        </MemoryRouter>
      </Provider>
    );

    const showMoreButton = screen.queryByTestId('show-more-button');

    expect(showMoreButton).not.toBeInTheDocument();
  });
});
