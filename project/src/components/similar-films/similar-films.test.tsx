import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { films } from '../../mocks/films';
import SimilarFilms from './similar-films';

const mockFilms = films;
const mockFilm = films[0];

describe('similar-films tests', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <SimilarFilms currentFilm={mockFilm} films={mockFilms} />
      </MemoryRouter>
    );

    const filmCards = screen.getAllByTestId('film-card');

    expect(filmCards.length).toBeLessThanOrEqual(4);
  });
});
