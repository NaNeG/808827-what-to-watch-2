import {render} from '@testing-library/react';
import App from './app';
import { films } from '../../mocks/films';
import reviews from '../../mocks/reviews';

test('Renders app-component', () => {
  render(<App mockFilms={films} reviews={reviews}/>);
});
