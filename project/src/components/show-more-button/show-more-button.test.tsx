import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import ShowMoreButton from './show-more-button';

const mockStore = configureMockStore();

describe('show-more-button tests', () => {
  const store = mockStore();
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <ShowMoreButton />
      </Provider>
    );

    expect(screen.getByText(/Show more/i)).toBeInTheDocument();
  });
});
