import { render, screen } from '@testing-library/react';
import { films } from '../../mocks/films';
import Overview from './overview';

const mockFilm = films[0];

describe('overview tests', () => {
  it('should render correctly', () => {
    render(
      <Overview
        description={mockFilm.description}
        director={mockFilm.director}
        rating={mockFilm.rating}
        scoresCount={mockFilm.scoresCount}
        starring={mockFilm.starring}
      />
    );

    expect(screen.getByText(mockFilm.description)).toBeInTheDocument();
    expect(screen.getByText(`Director: ${mockFilm.director}`)).toBeInTheDocument();
  });
});
