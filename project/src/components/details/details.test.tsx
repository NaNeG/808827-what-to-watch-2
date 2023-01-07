import { render, screen } from '@testing-library/react';
import { films } from '../../mocks/films';
import Details from './details';

const mockFilm = films[0];

describe('details tests', () => {
  it('should render correctly', () => {
    render(
      <Details
        genre={mockFilm.genre}
        director={mockFilm.director}
        starring={mockFilm.starring}
        released={mockFilm.released}
        runTime={mockFilm.runTime}
      />
    );

    expect(screen.getByText(mockFilm.genre)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.director)).toBeInTheDocument();
  });
});
