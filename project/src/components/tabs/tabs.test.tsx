import { fireEvent, render, screen } from '@testing-library/react';
import { films } from '../../mocks/films';
import reviews from '../../mocks/reviews';
import Tabs from './tabs';

const mockFilm = films[0];
const mockReviews = reviews;

describe('tabs tests', () => {
  it('should render overview correctly', () => {
    render(<Tabs film={mockFilm} reviews={reviews} />);

    expect(screen.getByText(mockFilm.rating)).toBeInTheDocument();
  });

  it('should render details correctly', () => {
    render(<Tabs film={mockFilm} reviews={reviews} />);

    const detailsButton = screen.getByTestId('details');
    fireEvent.click(detailsButton);

    expect(screen.getByText(mockFilm.released)).toBeInTheDocument();
  });

  it('should render reviews correctly', () => {
    render(<Tabs film={mockFilm} reviews={reviews} />);

    const reviewsButton = screen.getByTestId('reviews');
    fireEvent.click(reviewsButton);

    expect(screen.getByText(mockReviews[0].comment)).toBeInTheDocument();
  });
});
