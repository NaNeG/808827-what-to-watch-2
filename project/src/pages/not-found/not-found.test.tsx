import { render, screen } from '@testing-library/react';
import { NotFound } from './not-found';

describe('not-found tests', () => {
  it('should render correctly', () => {

    render(
      <NotFound />
    );

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
  });
});
