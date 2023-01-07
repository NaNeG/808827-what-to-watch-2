import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import reviews from '../../mocks/reviews';
import ReviewsList from './reviews-list';

const mockReviews = reviews;

describe('reviews-list tests', () => {
  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <ReviewsList reviews={mockReviews} />
      </MemoryRouter>
    );

    const reviewCards = screen.getAllByTestId('review-card');

    expect(reviewCards.length).toBe(mockReviews.length);
  });
});
