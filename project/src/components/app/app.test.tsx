import { render } from '@testing-library/react';
import App from './app';
import { films } from '../../mocks/films';
import reviews from '../../mocks/reviews';
import { Provider } from 'react-redux';
import { store } from '../../store';

test('Renders app-component', () => {
  render(
    <Provider store={store}>
      <App mockFilms={films} reviews={reviews} />
    </Provider>
  );
});
