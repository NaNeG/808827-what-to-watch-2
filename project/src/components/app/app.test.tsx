import {render} from '@testing-library/react';
import App from './app';
import { films } from '../../mocks/films';

test('Renders app-component', () => {
  render(<App mockFilms={films}/>);
});
