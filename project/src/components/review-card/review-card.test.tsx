import { render, screen } from '@testing-library/react';
import ReviewCard from './review-card';

describe('review-card tests', () => {
  it('should render correctly', () => {
    render(<ReviewCard postedDate={'123'} reviewAuthor={{id: 1, name: 'author name'}} reviewRating={10} reviewText={'review text'} />);

    expect(screen.getByText('review text')).toBeInTheDocument();
    expect(screen.getByText('author name')).toBeInTheDocument();
  });
});
