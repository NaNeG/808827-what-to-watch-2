import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { films } from '../../mocks/films';
import FilmCard from './film-card';

const mockFilm = films[0];

describe('film-card tests', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <FilmCard
          id={mockFilm.id}
          name={mockFilm.name}
          posterSrc={mockFilm.posterImage}
          videoLink={mockFilm.videoLink}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
  });

  it('should redirect correctly', () => {
    render(
      <MemoryRouter>
        <Routes>
          <Route path={`/films/${mockFilm.id}`} element={<h1>Film page rendered</h1>} />
          <Route
            path="*"
            element={
              <FilmCard
                id={mockFilm.id}
                name={mockFilm.name}
                posterSrc={mockFilm.posterImage}
                videoLink={mockFilm.videoLink}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const filmButton = screen.getByTestId('film-link');
    fireEvent.click(filmButton);

    expect(screen.getByText(/Film page rendered/i)).toBeInTheDocument();
  });
});
