import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import ReviewForm from './review-form';

const mockStore = configureMockStore();

describe('review-form tests', () => {
  const store = mockStore();
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ReviewForm/>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Post/i)).toBeInTheDocument();
  });
});
